import {NodeApi} from "../../api/node.api";
import {LinkApi} from "../../api/link.api";
import {Success} from "../../../shared/responses";
import {removeDup} from "../../helpers";
import {MetaContainer} from "../../../shared/repositories/constants";

export async function removeNode(params) {
    const {id} = params;
    await NodeApi.remove(id);

    const linkIds = [];
    linkIds.push(await LinkApi.getBackLink(id).then(l => l?.[MetaContainer]?.id));
    linkIds.push(await LinkApi.getForwardLink(id).then(l => l?.[MetaContainer]?.id));
    const promises = removeDup(linkIds).map(id => LinkApi.remove(id));
    await Promise.all(promises);

    return Success();
}
