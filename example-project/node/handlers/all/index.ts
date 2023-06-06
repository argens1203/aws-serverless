import {getAll} from "./get";
import {RestfulRouter} from "../../../shared/low-level/restful-router";

export async function handler(event) {
  const get = getAll;
  return await new RestfulRouter({get}).handle(event);
}