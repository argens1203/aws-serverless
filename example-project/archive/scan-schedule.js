import {NodeTable} from "../node/respositories/node-table";
import {Repository} from "../shared/repositories/repository";
import * as fs from 'fs';
import * as readline from 'readline';

const tableName = process.env.NODE_TABLE_NAME;

function stripDelimiters(line: string, delimiter: string){
    const arr = line.split('');
    let count = 0;
    let head = arr.shift();
    while (head === delimiter){
        count += 1;
        head = arr.shift();
    }
    return [count, [head, ...arr].join('')];
}

function stripTabs(line: string){
    return stripDelimiters(line, '\t');
}

function undash(line: string){
    return stripDelimiters(line, '-');
}

function unspace(line: string){
    return stripDelimiters(line, ' ');
}

function handleLine(line: string){
    const [tabCount, striped] = stripTabs(line);
    const [dashCount, undashed] = undash(striped as string);
    const [spaceCount, unspaced] = unspace(undashed as string);
    return {tabCount, dashCount, spaceCount, line: unspaced};
}

async function scanFile(fullPath: string){
    const filename = fullPath.split('/').pop();
    const [title, ext] = filename.split('.');
    if (ext?.toLowerCase() != 'md'){
        return;
    }
    console.log(title);
    const filestream = fs.createReadStream(fullPath);
    const lines = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    });

    let prevLineData = null;

    for await (const loopLine of lines){
        const lineData = handleLine(loopLine);
        // Tabbed is same node data
        // Dashed from undash is bw link
        // 2 Tab upgrades 1 Tab into node
        const {tabCount, dashCount, spaceCount, line} = lineData;
        if (line === '') {
            prevLineData = null;
            continue;
        };
        if (tabCount === 0){
            prevLineData
        }
        
        if (tabCount === 0){
            continue;
        }
    }
}

async function clearNodeTable(){
    console.log('Clearing Node...');
    const repository = new Repository(tableName);
    const nodes = await NodeTable.scan();
    for (const node of nodes){
        console.log(node);
        const __id = node.meta.id;
        // eslint-disable-next-line
        // @ts-ignore
        await repository.delete({__id});
    }
}

export async function handler(){
    await clearNodeTable();

    const file = '/home/pyro/project/swap-backend/dummy-data/_Schedule.md';
    await scanFile(file);
}