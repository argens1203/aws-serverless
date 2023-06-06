import axios from "axios";
import {MetaContainer} from "../../shared/repositories/constants";

const baseURL = "https://0dor6esquj.execute-api.ap-east-1.amazonaws.com/dev";
const instance = axios.create({
    baseURL,
});
instance.interceptors.response.use(res => res.data, err => Promise.reject(err));

export class NodeApi {
    static async create() {
        return await instance.post(`/nodes`).then(res => res.data);
    }

    static async edit(id, updates) {
        return await instance.patch(`/nodes/${id}`, updates).then(res => res.data);
    }

    static async createAndEdit(body){
        return await NodeApi.create().then(node => NodeApi.edit(node[MetaContainer].id, body));
    }

    static async remove(id) {
        return await instance.delete(`/nodes/${id}`).then (res => res.data);
    }

    static async get(id) {
        return await instance.get(`/nodes/${id}`).then(res => res.data);
    }

    static async getByTitle(title) {
        return await instance.get(`/nodes/title/${title}`).then(res => res.data);
    }

    static async scan(params) {
        // Fixme: query (Gateway level) should not call all (Nodes level)
        return await instance.get(`nodes/all`, {params}).then(res => res.data);
    }

    static async createWithTitle(title) {
        return await NodeApi.create().then(node => NodeApi.edit(node[MetaContainer].id, {title}));
    }
}
