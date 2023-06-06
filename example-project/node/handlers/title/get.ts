import {NodeTable} from "../../respositories/node-table";
import {Success} from "../../../shared/responses";

export async function getByTitle(params) {
    const {title} = params;
    const node = await NodeTable.getByTitle(title);
    return Success(node);
}