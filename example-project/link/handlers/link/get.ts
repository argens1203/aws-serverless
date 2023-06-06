import {LinkTable} from "../../repositories/link-table";
import {Success} from "../../../shared/responses";

export async function getLink(params){
    const {id} = params;
    const link = await LinkTable.get(id);
    return Success(link);
}