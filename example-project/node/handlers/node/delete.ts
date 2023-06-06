import {NodeTable} from "../../respositories/node-table";
import {Success} from '../../../shared/responses';

export async function removeNode(params) {
    const {id} = params;
    await NodeTable.disable(id);
    return Success();
}