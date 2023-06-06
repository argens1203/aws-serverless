import {LinkTable} from "../../repositories/link-table";
import {Success} from "../../../shared/responses";

export async function getBackLink(params) {
    const {to} = params;
    const links = await LinkTable.getBacklink(to);
    return Success(links);
}