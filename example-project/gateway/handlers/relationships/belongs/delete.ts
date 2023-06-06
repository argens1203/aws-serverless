import {LinkApi} from "../../../api/link.api";
import BadRequest from '../../../../shared/error/bad-request';
import NoResourceError from '../../../../shared/error/no-resource';
import {Success} from '../../../../shared/responses';
import {MetaContainer} from "../../../../shared/repositories/constants";

export async function del (params){
    const {from, to} = params;
    if (!from || !to){
        throw new BadRequest("Both 'from' and 'to' are required when deleting relationships");
    }
    const links = await LinkApi.getByVertices(from, to);
    if (!links.length){
        // throw new NoResourceError();
        return Success();
    }
    for (const link of links){
        await LinkApi.remove(link?.[MetaContainer]?.id);
    }
    return Success();
}