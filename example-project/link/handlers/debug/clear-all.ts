import {DynamoDb} from "../../../shared/helper/dynamo-db";

const tableName = process.env.LINK_TABLE_NAME;

export async function handler() {
    const links = await new DynamoDb(tableName, {}).scan();
    await Promise.all(links.map (link => new DynamoDb(tableName, {}).delete({__id: link.__id})));
}