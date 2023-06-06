export default class ApiError extends Error {
  constructor(message, data) {
    super();
    this.message = message || 'api_error';
    this.name = 'ApiError';
    this.statusCode = 400;
    this.data = data;
  }
}