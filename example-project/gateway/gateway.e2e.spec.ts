import axios from 'axios';

const baseUrl = 'https://1aoukicpu0.execute-api.ap-east-1.amazonaws.com/dev';

describe('gateway', () => {
    describe('node', () => {
        const title = 'title';
        let node;

        async function clearAll(title: string) {
            const res = await axios.get(`${baseUrl}/nodes/title/${title}`);
            const node = res.data.data;
            if (node?.meta?.id) {
                await axios.delete(`${baseUrl}/nodes/${node.meta.id}`);
            }
        }

        beforeAll(async () => {
            await clearAll(title);
            const res = await axios.post(`${baseUrl}/nodes`);
            node = res.data.data;
        });
        it('get by id', async () => {
            const res = await axios.get(`${baseUrl}/nodes/${node.meta.id}`);
            expect(res.data.data).toEqual(node);
        });
        it('add title', async () => {
            const res = await axios.patch(`${baseUrl}/nodes/${node.meta.id}`, {title});
            node.title = title;
            expect(res.data.data.title).toEqual(title);
        });
        it('get by id', async () => {
            const res = await axios.get(`${baseUrl}/nodes/${node.meta.id}`);
            expect(res.data.data.title).toEqual(title);
        });
        it('get by title', async () => {
            const res = await axios.get(`${baseUrl}/nodes/title/${title}`);
            expect(res.data.data.id).toEqual(node.id);
        })
        it('get all', async () => {
            const res = await axios.get(`${baseUrl}/nodes`);
            expect(res.status).toBe(200);
        })
        it('delete by id', async () => {
            await axios.delete(`${baseUrl}/nodes/${node.meta.id}`);
            const res = await axios.get(`${baseUrl}/nodes/${node.meta.id}`);
            expect(res.data.data.meta.is_enabled).toBe(false);
        });
        afterAll(async () => {
            await clearAll(title);
        });
    });
    describe('relationships', () => {
        let from, to, link;
        beforeAll(async () => {
            from = await axios.post(`${baseUrl}/nodes`).then(res => res.data.data.meta.id);
            to = await axios.post(`${baseUrl}/nodes`).then(res => res.data.data.meta.id);
            let data;
            do {
                try {
                    const res = await axios.delete(`${baseUrl}/relationships/belongs/from/${from}/to/${to}`);
                    data = res?.data?.data;
                } catch {
                    console.log("");
                }
            } while (data);
        });
        it('create', async () => {
            const res = await axios.post(`${baseUrl}/relationships/belongs/from/${from}/to/${to}`);
            expect(res.status).toBe(200);
            link = res.data.data;
        });
        it('get', async () => {
            const res = await axios.get(`${baseUrl}/relationships/belongs/from/${from}/to/${to}`);
            expect(res.data.data).toContainEqual(link);
        });
        it('get with from', async () => {
            const res = await axios.get(`${baseUrl}/relationships/belongs/from/${from}`);
            expect(res.data.data).toContainEqual(link);
        });
        it('get with to', async () => {
            const res = await axios.get(`${baseUrl}/relationships/belongs/to/${to}`);
            expect(res.data.data).toContainEqual(link);
        });
        it('delete', async () => {
            const deleteRes = await axios.delete(`${baseUrl}/relationships/belongs/from/${from}/to/${to}`);
            expect(deleteRes.status).toBe(200);
            const getRes = await axios.get(`${baseUrl}/relationships/belongs/from/${from}/to/${to}`);
            expect(getRes.data.data.length).toBe(0);
        });
    });
    describe('preset', () => {
        it('create', async () => {
            const res = await axios.post(`${baseUrl}/presets`);
            expect(res.status).toBe(200);
        });
        it('get', async () => {
            const res = await axios.get(`${baseUrl}/presets`);
            expect(res.status).toBe(200);
        })
    })
})