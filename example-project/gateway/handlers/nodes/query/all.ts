import {NodeApi} from "../../../api/node.api";
import {Success} from "../../../../shared/responses";

export async function getAll(params) {
  const allNodes = await NodeApi.scan(params);
  return Success(allNodes);
}