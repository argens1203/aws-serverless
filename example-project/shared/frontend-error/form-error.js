export default class FormError extends Error {
  constructor(message, param, data, statusCode){
    super();
    this.message = message || 'unsuccessful';
    this.name = 'FormError';
    if (statusCode){
      this.statusCode = statusCode;
    }
    if (param){
      this.param = param;
    }
    if (data){
      this.data = data;
    }
  }
}