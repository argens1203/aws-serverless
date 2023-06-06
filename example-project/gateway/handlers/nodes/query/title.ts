import {Success} from "../../../../shared/responses";
import {NodeApi} from "../../../api/node.api";

export async function getByTitle(params) {
    const {title} = params;
    const nodes = await NodeApi.getByTitle(title);
    return Success(nodes);
}