import {DynamoDb} from "../../../shared/helper/dynamo-db";

const tableName = process.env.NODE_TABLE_NAME;

export async function handler() {
    const nodes = await new DynamoDb(tableName, {}).scan();
    await Promise.all(nodes.map (node => new DynamoDb(tableName, {}).delete({__id: node.__id})));
}