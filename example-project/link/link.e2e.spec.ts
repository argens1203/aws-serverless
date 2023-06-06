import axios from 'axios';

const baseUrl = "https://48jfmocdr2.execute-api.ap-east-1.amazonaws.com/dev/links";

async function clearAll(from: string) {
    const res = await axios.get(`${baseUrl}/from/${from}`);
    const proms = res.data.data.map(link => {
        return axios.delete(`${baseUrl}/${link.meta.id}`);
    });
    await Promise.all(proms);
}

describe('link', () => {
    const from = 'from';
    const to = 'to';
    let link;

    beforeAll(async () => {
        await clearAll(from);
        const res = await axios.post(`${baseUrl}/from/${from}/to/${to}`);
        link = res.data.data;
    });
    it('get by from', async () => {
        const res = await axios.get(`${baseUrl}/from/${from}`);
        expect(res.data.data[0]).toEqual(link);
    });
    it('get by to', async () => {
        const res = await axios.get(`${baseUrl}/to/${to}`);
        expect(res.data.data[0]).toEqual(link);
    });
    it('get by id', async () => {
        const res = await axios.get(`${baseUrl}/${link.meta.id}`);
        expect(res.data.data).toEqual(link);
    });
    afterAll(async () => {
        await clearAll(from);
    });
})