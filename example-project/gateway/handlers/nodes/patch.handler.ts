import {Success} from "../../../shared/responses";
import {RuleEngine} from "../../rule-engine";
import {NodeApi} from "../../api/node.api";

export async function updateNode(params) {
    const {id, ...update} = params;
    const newNode = await NodeApi.edit(id, update);
    return Success(newNode);
}