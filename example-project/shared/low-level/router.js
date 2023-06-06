import BadRequest from "../error/bad-request";
import { HttpMethods } from "./http-methods";
import { Failure } from "../responses";

export class Router {
  constructor(routerFunc) {
    this.routerFunc = routerFunc;
    this.superParam = {};
  }

  async handle(event) {
    try {
      console.log("Request", event);
      const { httpMethod, pathParameters, queryStringParameters, body } = event;
      const { proxy, ...rest } = pathParameters || {};

      const func = this.routerFunc({ proxy, httpMethod });
      let param = this.getParam(httpMethod, queryStringParameters, body);
      console.log("raw param", param);

      param = this.appendSuperParam({ ...param, ...rest });
      console.log("adjusted param", param);

      return await func(param);
    } catch (e) {
      console.error(e);
      return Failure(e);
    }
  }

  getParam(httpMethod, queryStringParameters, body) {
    switch (httpMethod) {
      case HttpMethods.GET:
        return queryStringParameters || {};
      case HttpMethods.PATCH:
      case HttpMethods.POST:
      case HttpMethods.DELETE:
        return this.getParamFromBody(body) || {};
    }
  }

  getParamFromBody(body) {
    try {
      return JSON.parse(body);
    } catch (e) {
      console.error(e);
      throw new BadRequest;
    }
  }

  appendSuperParam(param) {
    return { ...param, ...this.superParam };
  }

  setSuperParam(superParam) {
    this.superParam = superParam;
    return this;
  }
}