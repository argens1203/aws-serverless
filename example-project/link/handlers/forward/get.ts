import {LinkTable} from "../../repositories/link-table";
import {Success} from "../../../shared/responses";

export async function getForwardLink(params) {
    const {from} = params;
    const links = await LinkTable.getForwardLink(from);
    return Success(links);
}