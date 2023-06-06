import { Success } from "../../../shared/responses";
import { NodeApi } from "../../api/node.api";
import { LinkApi } from "api/link.api";
import { MetaContainer } from "../../../shared/repositories/constants";

export async function createChildren (params){
    const {id: parentId, ...rest} = params;

    const node = await NodeApi.createAndEdit(rest);

    const from = node[MetaContainer].id;
    const to = parentId;
    const body = {type: 'IS_CHILDREN'};
    const link = await LinkApi.createAndEdit({from, to, body});

    return Success({nodes: [node], links: [link]});
}