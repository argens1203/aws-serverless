import { HttpMethods } from "./http-methods";
import UnrecognizedPath, { unrecognizedPathThrower as err } from "../error/unrecognized-path";
import { Failure } from "../responses";

export class RestfulRouter {
  constructor(handlers) {
    this.get = handlers.get || err;
    this.del = handlers.del || err;
    this.post = handlers.post || err;
    this.patch = handlers.patch || err;
    this.put = handlers.put || err;
    this.superParam = {};
  }

  async handle(event) {
    try {
      console.log("Request", event);
      const { httpMethod, pathParameters, queryStringParameters, multiValueQueryStringParameters, body } = event;

      const func = this.getFunc(httpMethod);
      let params = this.getParam(httpMethod, queryStringParameters, body);
      params = this.appendPathParam(params, pathParameters);
      params = this.appendMultiParam(params, multiValueQueryStringParameters);
      params = this.appendSuperParam(params);

      return await func(params);
    } catch (e) {
      console.error(e);
      return Failure(e);
    }
  }

  getFunc(httpMethod) {
    switch (httpMethod) {
      case HttpMethods.PATCH:
        return this.patch;
      case HttpMethods.GET:
        return this.get;
      case HttpMethods.DELETE:
        return this.del;
      case HttpMethods.POST:
        return this.post;
      case HttpMethods.PUT:
        return this.put;
    }
    throw new UnrecognizedPath;
  }

  getParam(httpMethod, qs, body) {
    switch (httpMethod) {
      case HttpMethods.GET:
        return qs || {};
      case HttpMethods.DELETE:
      case HttpMethods.POST:
      case HttpMethods.PATCH:
      case HttpMethods.PUT:
        return JSON.parse(body) || {};
    }
    throw new UnrecognizedPath;
  }

  setSuperParam(superParam) {
    this.superParam = superParam;
    return this;
  }

  appendSuperParam(params) {
    return { ...params, ...this.superParam };
  }

  appendPathParam(params, rawPathParams) {
    const pathParams = rawPathParams || {};
    return { ...params, ...pathParams };
  }

  appendMultiParam(params, multiValue) {
    const multiParam = multiValue ? { multiValue } : {};
    return { ...params, ...multiParam };
  }
}