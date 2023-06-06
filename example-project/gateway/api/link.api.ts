import axios from "axios";
import { MetaContainer } from "../../shared/repositories/constants";

const baseURL = "https://48jfmocdr2.execute-api.ap-east-1.amazonaws.com/dev";
const instance = axios.create({
    baseURL,
});
instance.interceptors.response.use(res => res.data, err => Promise.reject(err));

type CreateAndEditInput = {
    from: string;
    to: string;
    body: Record<string, any>;
};

export class LinkApi {
    static async getForwardLink(from) {
        return await instance.get(`/links/from/${from}`).then(res => res.data);
    }

    static async getBackLink(to) {
        return await instance.get(`/links/to/${to}`).then(res => res.data);
    }

    static async get(id) {
        return await instance.get(`/links/${id}`).then(res => res.data);
    }

    static async remove(id) {
        if (!id) {
            return;
        }
        return await instance.delete(`/links/${id}`);
    }

    static async create(from, to) {
        return await instance.post(`/links/from/${from}/to/${to}`).then(res => res.data);
    }

    static async getByVertices(from, to) {
        const links = await this.getForwardLink(from);
        return links.filter(link => link.to === to);
    }

    static async edit(id, updates) {
        return await instance.patch(`/links/${id}`, updates).then(res => res.data);
    }

    static async createAndEdit(input: CreateAndEditInput){
        const {from, to, body} = input;
        return await LinkApi.create(from, to).then(link => LinkApi.edit(link[MetaContainer].id, body));
    }
}
