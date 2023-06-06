import {LinkTable} from "../../repositories/link-table";
import {Success} from "../../../shared/responses";

export async function removeLink(params){
    const {id} = params;
    await LinkTable.deleteLink(id);
    return Success();
}