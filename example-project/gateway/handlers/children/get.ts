import { Success } from "../../../shared/responses";
import { NodeApi } from "../../api/node.api";
import { LinkApi } from "api/link.api";

export async function getChildren (params){
    const {id} = params;

    const links = await LinkApi.getBackLink(id);
    const children = await Promise.all(links.map(link => {
        const {from} = link;
        return NodeApi.get(from);
    }));
    return Success({nodes: children, links});
}