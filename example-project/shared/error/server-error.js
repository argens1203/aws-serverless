export default class ServerError extends Error {
  // Message is intentionally left out since InternalServerError is not presented to the user
  constructor(data) {
    super();
    this.name = 'ServerError';
    this.statusCode = 500;
    this.data = data;
  }
}