import {DynamoDb} from '../helper/dynamo-db';
import {OutputProxy} from "./proxy";
import {UpdateProxy} from "./proxy/update.proxy";
import {MetaUpdateProxy} from "./proxy/meta-update.proxy";
import {CreatedTs, UpdatedTs, IndexKey, DisableTs, EnableKey, MetaContainer} from './constants';
import {stripMetaIndicator} from "./utils/meta";

export class Repository extends DynamoDb {
    constructor(tableName) {
        const param = {
            enableKey: EnableKey,
            createdTs: CreatedTs,
            updatedTs: UpdatedTs,
            disableTs: DisableTs
        }
        super (tableName, param);
    }

    async disable(id){
        const key = this.getKey(id);
        const item = await super.disable(key);
        // const item = await super.disable(id);
        return new OutputProxy(item).print();
    }

    async queryReverseOnce(...args){
        const item = await super.queryReverseOnce(...args);
        return new OutputProxy(item).print();
    }

    async query(...args){
        const items = await super.query(...args);
        return items.map(item => new OutputProxy(item).print());
    }

    async scan(){
        const items = await super.scan();
        return items.map (item => new OutputProxy(item).print());
    }

    async paginatedScan(limit, cursor){
        const { items, cursor: newCursor } = await super.paginatedScan(limit, cursor);
        return { cursor: newCursor, items: (items || []).map(item => new OutputProxy(item).print()), };
    }

    async paginatedQuery(...args){
        const [items, cursor] = await super.paginatedQuery(...args);
        return {
            cursor,
            items: items.map (item => new OutputProxy(item).print()),
        };
    }

    async get(id){
        const key = this.getKey(id);
        const item = await super.get(key);
        return new OutputProxy(item).print();
    }

    async put(id, update = {}, meta = {}){
        const initialItem = {
            ...this.getKey(id),
            ...new UpdateProxy(update).print(),
            ...new MetaUpdateProxy(meta).print(),
        }
        const item = await super.put(initialItem);
        return new OutputProxy(item).print();
    }

    async updateT(id, update = {}, meta = {}){
        const filtered = {
            ...new UpdateProxy(update).print(),
            ...new MetaUpdateProxy(meta).print(),
        };
        const key = this.getKey(id);
        const item = await super.update(key, filtered);
        return new OutputProxy(item).print();
    }

    getKey(id){
        return {[IndexKey]: id};
    }

    static entryIsEnabled(dbEntry){
        return !!dbEntry[EnableKey];
    }

    static itemIsEnabled(item){
        return !!item?.[MetaContainer]?.[stripMetaIndicator(EnableKey)];
    }
}
