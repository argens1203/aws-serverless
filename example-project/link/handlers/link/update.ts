import {LinkTable} from "../../repositories/link-table";
import {Success} from "../../../shared/responses";

export async function updateLink(params) {
    const {id, ...updates} = params;
    const newLink = await LinkTable.update(id, updates);
    return Success(newLink);
}
