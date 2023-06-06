export default class BadRequest extends Error {
  constructor(detail, param, message){
    super();
    this.message = message || 'bad_request';
    this.name = 'BadRequestError';
    this.statusCode = 400;
    if (param){
      this.param = param;
    }
    if (detail){
      this.detail = detail;
    }
  }
}