import BadRequest from '../../../../shared/error/bad-request';
import {LinkApi} from "../../../api/link.api";
import {Success} from '../../../../shared/responses';

export async function post (params){
    const {from, to } = params;
    if (!from || !to){
        throw new BadRequest("Both 'from' and 'to' are required when creating relationships");
    }
    if (from === to){
        throw new BadRequest('Cannot link node to itself');
    }
    const link = await LinkApi.create(from, to);
    return Success(link);
}