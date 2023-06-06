import {Success} from "../../../shared/responses";
import {NodeApi} from "../../api/node.api";

export async function createNode() {
    const node = await NodeApi.create();
    return Success(node);
}
