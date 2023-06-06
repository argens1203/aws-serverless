import {getNode} from "./get.handler";
import {updateNode} from "./patch.handler";
import {removeNode} from "./delete.handler";
import {createNode} from "./post.handler";
import {RestfulRouter} from "../../../shared/low-level/restful-router";

export async function handler(event) {
    const get = getNode;
    const post = createNode;
    const patch = updateNode;
    const del = removeNode;
    return await new RestfulRouter({get, post, patch, del}).handle(event);
}
