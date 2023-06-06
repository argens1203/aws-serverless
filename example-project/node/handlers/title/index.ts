import {getByTitle} from "./get";
import {RestfulRouter} from "../../../shared/low-level/restful-router";

export async function handler(event){
    const get = getByTitle;
    return await new RestfulRouter({get}).handle(event);
}