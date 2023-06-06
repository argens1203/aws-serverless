import {LinkApi} from "../../../api/link.api";
import BadRequest from '../../../../shared/error/bad-request';
import {Success} from '../../../../shared/responses';

export async function get (params){
    const {from, to} = params;
    if (from && to){
        const links = await LinkApi.getByVertices(from, to);
        return Success(links);
    }
    if (from){
        const links = await LinkApi.getForwardLink(from);
        return Success(links);
    }
    if (to){
        const links = await LinkApi.getBackLink(to);
        return Success(links);
    }
    throw new BadRequest();
}