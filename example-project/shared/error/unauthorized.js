export default class Unauthorized extends Error {
  constructor(message) {
    super();
    this.message = message || 'unauthorized';
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}