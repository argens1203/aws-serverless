import {Success} from '../../../shared/responses';
import {NodeTable} from "../../respositories/node-table";

export async function getNode(params){
    const {id} = params;
    const node = await NodeTable.get(id);
    return Success(node);
}