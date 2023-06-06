import {NodeTable} from "../../respositories/node-table";
import {OutputProxy} from "../../../shared/repositories/proxy";
import {Success} from '../../../shared/responses/';

export async function handler(){
    let nodes = await NodeTable.scan();
    nodes = nodes.map(node => new OutputProxy(node).print());
    return Success(nodes);
}