import {generate as uuid} from "short-uuid";
import {Repository} from "../../shared/repositories/repository";

const tableName = process.env.NODE_TABLE_NAME;
const LIMIT = 100;

export class NodeTable {
    private static readonly table = new Repository(tableName);

    static async get(id) {
        return await NodeTable.table.get(id);
    }

    static async update(id, updates) {
        return await NodeTable.table.updateT(id, updates);
    }

    static async create() {
        // TODO: better way of doing this
        return await NodeTable.table.put(this.getId(), null, {dummy: 'DUMMY', importance: Math.random()});
    }

    static getId() {
        return `NODE-${uuid()}`;
    }

    static async disable(id) {
        return await NodeTable.table.disable(id);
    }

    static async getByTitle(title){
        return await NodeTable.table.queryReverseOnce("titleCreatedAtIndex", {title});
    }

    static async queryByImportance(limit = LIMIT, cursor?: string, ascending = false){
        // TODO: better way of doing this
        return await NodeTable.table.paginatedQuery("dummyImportanceIndex", {_dummy: 'DUMMY'}, limit, cursor, {ScanIndexForward: ascending});
    }

    static async queryByCreatedAt(limit = LIMIT, cursor?: string, ascending = false){
        // TODO: better way of doing this
        return await NodeTable.table.paginatedQuery("dummyCreatedAtIndex", {_dummy: 'DUMMY'}, limit, cursor, {ScanIndexForward: ascending});
    }

    static async scan(){
        return await NodeTable.table.scan();
    }

    static async paginatedScan(limit = LIMIT, cursor?: string){
        return await NodeTable.table.paginatedScan(limit, cursor);
    }
}
