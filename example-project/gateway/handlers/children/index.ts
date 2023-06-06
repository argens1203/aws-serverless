import {RestfulRouter} from "../../../shared/low-level/restful-router";
import {getChildren} from './get';
import { createChildren } from "./post";

export async function handler(events){
    const get = getChildren;
    const post = createChildren;

    return await new RestfulRouter({get, post}).handle(events);
}