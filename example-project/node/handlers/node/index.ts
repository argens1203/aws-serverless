import {RestfulRouter} from "../../../shared/low-level/restful-router";
import {createNode} from "./post";
import {removeNode} from "./delete";
import {getNode} from "./get";
import {updateNode} from "./patch";

export async function handler(event) {
    const post = createNode;
    const patch = updateNode;
    const get = getNode;
    const del = removeNode;
    return new RestfulRouter({post, patch, get, del}).handle(event);
}