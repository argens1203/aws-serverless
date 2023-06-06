import {NodeTable} from "../../respositories/node-table";
import {Success} from '../../../shared/responses';

export async function updateNode(params){
    const {id, ...update} = params;
    const updated = await NodeTable.update(id, update);
    return Success(updated);
}