import {getByTitle} from "./title";
import {getAll} from "./all";

export async function get (params){
    const {title} = params;
    if (title){
        return await getByTitle(params);
    }
    return await getAll(params);
}