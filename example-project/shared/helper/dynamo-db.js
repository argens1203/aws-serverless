import AWS from 'aws-sdk';
import { QueryHelper } from "./query-helper";
import { getUpdateExpression } from "./update-helper";
import { getCurrentTimeStamp } from "../low-level/iso-string";

let service = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

if (process.env.IS_OFFLINE) {
  service = new AWS.DynamoDB({
    apiVersion: '2012-08-10',
    region: 'localhost',
    endpoint: 'http://localhost:7878'
  });
}

const docClient = new AWS.DynamoDB.DocumentClient({
  service,
  convertEmptyValues: true
});

class DynamoDb {

  constructor(TableName, param) {
    this.TableName = TableName;
    this.enableKey = param.enableKey;
    this.createdTs = param.createdTs;
    this.updatedTs = param.updatedTs;
    this.disableTs = param.disableTs;
  }

  async get(Key) {
    return await this.getBase(Key, {});
  }

  async consistentGet(Key) {
    return await this.getBase(Key, { ConsistentRead: true });
  }

  async getBase(Key, param) {
    const { Item } = await docClient.get({
      TableName: this.TableName,
      Key,
      ...param
    }).promise();
    return Item;
  }

  async put(Item) {
    Item[this.createdTs] = getCurrentTimeStamp();
    Item[this.updatedTs] = getCurrentTimeStamp();
    if (Item[this.enableKey] === undefined) {
      Item[this.enableKey] = true;
    }
    await docClient.put({
      TableName: this.TableName,
      Item,
    }).promise();
    return Item;
  }

  async scan() {
    const { Items } = await docClient.scan({
      TableName: this.TableName,
    }).promise();
    return Items;
  }

  async paginatedScan(Limit, cursor) {
    let ExclusiveStartKey;
    if (cursor){
      ExclusiveStartKey = this.decodeCursor(cursor);
    }
    const param = {
      TableName: this.TableName,
      ExclusiveStartKey,
      Limit,
    };
    const result = await docClient.scan(param).promise();
    const { Items, LastEvaluatedKey } = result;
    return { items: Items, cursor: this.encodeKey(LastEvaluatedKey) };
  }

  async delete(Key) {
    return await docClient.delete({
      TableName: this.TableName,
      Key
    }).promise();
  }

  async disable(Key){
    console.log("disabling");
    console.log(Key);
    return await this.update(Key, {[this.enableKey]: false, [this.disableTs]: getCurrentTimeStamp()});
  }

  async addToAttribute(Key, AttributeChanges) {
    const AttributeUpdates = {};
    Object.entries(AttributeChanges)
      .forEach(([attributeName, valueChange]) => {
        AttributeUpdates[attributeName] = {
          Action: "ADD",
          Value: valueChange
        };
      });
    AttributeUpdates[this.updatedTs] = {
      Action: "PUT",
      Value: new Date().toISOString()
    };
    const param = {
      TableName: this.TableName,
      Key,
      AttributeUpdates,
      ReturnValues: "ALL_NEW",
    };
    console.log(param);
    return await docClient.update(param).promise();
  }

  async query(IndexName, HashKey, LargerThanKeys, SmallerThanKeys) {
    return await this.queryBase(IndexName, HashKey, LargerThanKeys, SmallerThanKeys);
  }

  async queryReverse(IndexName, HashKey, LargerThanKeys, SmallerThanKeys) {
    const options = {
      ScanIndexForward: false
    };
    return await this.queryBase(IndexName, HashKey, LargerThanKeys, SmallerThanKeys, options);
  }

  async queryReverseOnce(IndexName, HashKey, LargerThanKeys, SmallerThanKeys) {
    const options = {
      ScanIndexForward: false,
      Limit: 1
    };
    const items = await this.queryBase(IndexName, HashKey, LargerThanKeys, SmallerThanKeys, options);
    return items?.[0];
  }

  async queryBase(IndexName, HashKey, LargerThanKeys, SmallerThanKeys, options) {
    const param = new QueryHelper(this.TableName, IndexName)
      .addExactKeys(HashKey)
      .addLargerThanKeys(LargerThanKeys)
      .addSmallerThanKeys(SmallerThanKeys)
      .getParam();
    const { Items } = await docClient.query({ ...param, ...options }).promise();
    return Items;
  }

  async paginatedQuery(IndexName, HashKey, Limit, cursor, options) {
    let ExclusiveStartKey;
    if (cursor) {
      ExclusiveStartKey = this.decodeCursor(cursor);
    }
    return await this.paginatedQueryBase(IndexName, HashKey, null, null, {
      ExclusiveStartKey,
      Limit,
      ...options
    });
  }

  async paginatedQueryBase(IndexName, HashKey, LargerThanKeys, SmallerThanKeys, options) {
    const param = new QueryHelper(this.TableName, IndexName)
      .addExactKeys(HashKey)
      .addLargerThanKeys(LargerThanKeys)
      .addSmallerThanKeys(SmallerThanKeys)
      .getParam();
    const { Items, LastEvaluatedKey } = await docClient.query({ ...param, ...options }).promise();
    return [Items, this.encodeKey(LastEvaluatedKey)];
  }

  encodeKey(lastEvaluatedKey) {
    if (!lastEvaluatedKey){
      return undefined;
    }
    const jsonString = JSON.stringify(lastEvaluatedKey);
    return Buffer.from(jsonString).toString("base64");
  }

  decodeCursor(cursor) {
    const jsonString = Buffer.from(cursor, "base64").toString();
    return JSON.parse(jsonString);
  }

  async update(Key, updates) {
    const { expr, names, values } = getUpdateExpression({ ...updates, [this.updatedTs]: getCurrentTimeStamp() });
    const param = {
      TableName: this.TableName,
      UpdateExpression: expr,
      Key,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      ReturnValues: "ALL_NEW",
    };
    console.log(param);
    const { Attributes } = await docClient.update(param).promise();
    console.log(Attributes);
    return Attributes;
  }
}

export { DynamoDb, docClient };