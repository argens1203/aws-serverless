export class FreeFormError extends Error {
  constructor(name, message, detail) {
    super();
    this.name = name;
    this.message = message;
    this.statusCode = 402;
    this.detail = detail;
  }
}