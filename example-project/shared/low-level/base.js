import axios from "axios";
import { Success } from "../responses";

export class BaseApi {
  constructor(baseURL) {
    this.baseUrl = baseURL;
    this.forwardService = axios.create({ baseURL });

    this.onFulfilled = this.onFulfilled.bind(this);
    this.onError = this.onError.bind(this);
    this.forwardService.interceptors.response.use(this.onFulfilled, this.onError);

    this.getService = axios.create({ baseURL });
    this.getService.interceptors.response.use(res => res.data.data);

    this.api = axios.create({ baseURL });
    this.api.interceptors.response.use(res => res.data, err => err.response.data);

    this.service = axios.create({ baseURL });
  }

  onFulfilled(res) {
    console.log("onFulfilled", res);
    const { message, data } = res.data;
    return Success(data, message);
  }

  onError(err) {
    console.log("24", err);
    console.log("onError", err);

    const statusCode = err.response.status;
    const body = JSON.stringify(err.response.data);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Cache-Control": "no-cache",
      "Content-type": "Application/json"
    };
    return { statusCode, body, headers };
  }
}