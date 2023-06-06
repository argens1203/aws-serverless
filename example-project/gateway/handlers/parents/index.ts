import {RestfulRouter} from "../../../shared/low-level/restful-router";
import {getParents} from './get';

export async function handler(events){
    const get = getParents;
    return await new RestfulRouter({get}).handle(events);
}