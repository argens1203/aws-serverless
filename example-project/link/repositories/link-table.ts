import {generate as uuid} from "short-uuid";
import {Repository} from "../../shared/repositories/repository";

const tableName = process.env.LINK_TABLE_NAME;

export class LinkTable {
    private static readonly table = new Repository(tableName);

    static async getBacklink(to) {
        const entries = await LinkTable.table.query("toRankIndex", {to});
        return entries.filter(Repository.itemIsEnabled);
    }

    static async getForwardLink(from) {
        const entries = await LinkTable.table.query("fromRankIndex", {from});
        return entries.filter(Repository.itemIsEnabled);
    }

    static async get(id) {
        const link = await LinkTable.table.get(id);
        if (Repository.itemIsEnabled(link)) {
            return link;
        }
        throw Error("link_not_found");
    }

    static async addLink(from, to) {
        const rank = Date.now();
        const id = this.getId();
        return await LinkTable.table.put(id, {from, to}, {rank});
    }

    static getId() {
        return `LINK-${uuid()}`;
    }

    static async updateLinkTarget(_from, _oldTo, _newTo) {
        // Atomic
    }

    static async update(id, updates) {
        return await LinkTable.table.updateT(id, updates);
    }

    static async deleteLink(id) {
        return await LinkTable.table.disable(id);
    }
}