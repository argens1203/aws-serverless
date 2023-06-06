import {get} from "./get";
import {RestfulRouter} from "../../../../shared/low-level/restful-router";

export async function handler(event) {
    return await new RestfulRouter({get}).handle(event);
}