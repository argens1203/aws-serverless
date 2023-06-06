import {NodeTable} from "../../respositories/node-table";
import {Success} from '../../../shared/responses';

export async function createNode(){
    const node = await NodeTable.create();
    return Success(node);
}