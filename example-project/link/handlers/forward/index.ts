import {getForwardLink} from "./get";
import {RestfulRouter} from "../../../shared/low-level/restful-router";

export async function handler(event) {
    const get = getForwardLink;
    return new RestfulRouter({get}).handle(event);
}