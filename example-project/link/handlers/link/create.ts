import {LinkTable} from "../../repositories/link-table";
import {Success} from "../../../shared/responses";

export async function createLink(params) {
    const {from, to} = params;
    const link = await LinkTable.addLink(from, to);
    return Success(link);
}