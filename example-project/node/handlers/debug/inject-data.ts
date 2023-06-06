import * as fs from 'fs';
import * as readline from 'readline';
import {NodeTable} from "../../respositories/node-table";
import {Repository} from "../../../shared/repositories/repository";
import {LinkTable} from '../../../link/repositories/link-table';

const tableName = process.env.NODE_TABLE_NAME;
const rootDir = '/home/pyro/project/swap-backend/dummy-data/';

function isDir(dirName: string, f: string){
    const file = `${dirName}${f}`; //TODO: use path make
    const isDir = fs.lstatSync(file).isDirectory();
    return isDir;
}

async function getLines(dirName: string, filename: string){
    const fullPath = `${dirName}/${filename}`;
    const filestream = fs.createReadStream(fullPath);
    const lines = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    });

    const arr = [];

    for await (const loopLine of lines){
        arr.push(loopLine);
    }
    return arr.join('\n');
}

async function insertLinesAsChildren(fullpath: string, parentId: string){
    const fstream = fs.createReadStream(fullpath);
    const lines = readline.createInterface({
        input: fstream,
        crlfDelay: Infinity,
    });

    for await (const data of lines){
        const n = await NodeTable.create();
        await Promise.all([
            NodeTable.update(n.meta.id, {data}),
            LinkTable.addLink(n.meta.id, parentId),
        ]);
    }
}

async function scanDir(dirName: string, parentId?: string){
    const files = fs.readdirSync(dirName);
    for (const f of files){
        if (f.indexOf('.') === 0 || f.indexOf('.json') !== -1){
            continue;
        }
        const node = await NodeTable.create();
        if (parentId){
            await LinkTable.addLink(node.meta.id, parentId);
        }
        const title = f.replace('.md', '');
        let data;
        if (isDir(dirName, f)){
            await scanDir(`${dirName}${f}/`, node.meta.id) //TODO: use path make
        } else {
            // data = await getLines(dirName, f);
            await insertLinesAsChildren(`${dirName}/${f}`, node.meta.id);
        }
        // await NodeTable.update(node.meta.id, {title, data});
        await NodeTable.update(node.meta.id, {title});
    }
}

export async function handler(){
    const repository = new Repository(tableName);

    const nodes = await NodeTable.scan();
    for (const node of nodes){
        const __id = node.meta.id;
        // eslint-disable-next-line
        // @ts-ignore
        await repository.delete({__id});
    }

    const relationships = await new Repository(process.env.LINK_TABLE_NAME).scan();
    for (const r of relationships){
        const __id = r.meta.id;
        // eslint-disable-next-line
        // @ts-ignore
        await new Repository(process.env.LINK_TABLE_NAME).delete({__id});
    }

    const root = await NodeTable.create();
    await NodeTable.update(root.meta.id, {title: 'ROOT'});
    await scanDir(rootDir, root.meta.id);
}