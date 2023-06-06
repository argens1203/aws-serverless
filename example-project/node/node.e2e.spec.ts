import axios from 'axios';

const b = "https://0dor6esquj.execute-api.ap-east-1.amazonaws.com/dev";
const baseUrl = `${b}/nodes`

async function clearAll(title: string) {
    const res = await axios.get<{data: any}>(`${baseUrl}/title/${title}`);
    const node = res.data.data;
    if (node?.meta?.id) {
        await axios.delete(`${baseUrl}/${node.meta.id}`);
    }
}

describe('node', () => {
    const title = 'title';
    let node;

    beforeAll(async () => {
        await clearAll(title);
        const res = await axios.post<{data: any}>(`${baseUrl}`);
        node = res.data.data;
    });
    it('get by id', async () => {
        const res = await axios.get<{data: any}>(`${baseUrl}/${node.meta.id}`);
        expect(res.data.data).toEqual(node);
    });
    it('add title', async () => {
        const res = await axios.patch<{data: any}>(`${baseUrl}/${node.meta.id}`, {title});
        node.title = title;
        expect(res.data.data.title).toEqual(title);
    });
    it('get by id', async () => {
        const res = await axios.get<{data: any}>(`${baseUrl}/${node.meta.id}`);
        expect(res.data.data.title).toEqual(title);
    });
    it('get all', async () => {
        const res = await axios.get<{data: any}>(`${baseUrl}/all`);
        expect(res.status).toEqual(200);
    });
    it('delete by id', async () => {
        await axios.delete(`${baseUrl}/${node.meta.id}`);
        const res = await axios.get<{data: any}>(`${baseUrl}/${node.meta.id}`);
        expect(res.data.data.meta.is_enabled).toBe(false);
    });
    it('get special', async () => {
        const res = await axios.get(`${b}/get-special`);
        expect(res.status).toBe(200);
    });
    afterAll(async () => {
        await clearAll(title);
    });
})