import {Success} from "../../../shared/responses";
import {NodeApi} from "../../api/node.api";

export async function getNode(params) {
    const {id} = params;
    const node = await NodeApi.get(id);
    return Success(node);
}
