import {RestfulRouter} from "../../../shared/low-level/restful-router";
import {updateLink} from "./update";
import {getLink} from "./get";
import {removeLink} from "./delete";
import {createLink} from "./create";

export async function handler(event) {
    const patch = updateLink;
    const get = getLink;
    const del = removeLink;
    const post = createLink
    return await new RestfulRouter({patch, get, del, post}).handle(event);
}