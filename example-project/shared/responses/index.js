import { translate } from "./i18n";

export function Success(data, message) {
  const statusCode = 200;
  const body = {
    success: true,
    message: message || '',
    data
  };
  return BaseResponse(statusCode, body);
}

export function Failure(err, data) {
  if (err?.response?.data && err?.response?.status) {
    return BaseResponse(err.response.status, err.response.data);
  }

  const message = translate(err.message) || err.message;
  const statusCode = err && err.statusCode ? err.statusCode : 402;
  const body = {
    success: false,
    message,  // Human readable object with all i18n considered.
    detail: err,   // For debug purposes, can be null
    data
  };
  return BaseResponse(statusCode, body);
}

export function BaseResponse(statusCode, body) {
  const returning = {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Cache-Control": "no-cache",
      "Content-type": "Application/json"
    },
  };
  console.log("returning", returning);
  return returning;
}

// 200 - OK	                Everything worked as expected.
// 400 - Bad Request	      The request was unacceptable, often due to missing a required parameter.
// 401 - Unauthenticated	  We don't know who you are. Most likely token expired.
// 402 - Request Failed	    The parameters were valid but the request failed.
// 403 - Forbidden	        The API key doesn't have permissions to perform the request.
// 404 - Not Found	        The requested resource doesn't exist.

// 4?? - Too Many Requests	Not Implemented
// 500 - Server Errors	    Unexpected Error