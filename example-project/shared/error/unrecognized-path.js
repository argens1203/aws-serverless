export default class UnrecognizedPath extends Error {
  constructor(message) {
    super();
    this.message = message || 'unrecognized_path_error';
    this.name = 'UnrecognizedPathError';
    this.statusCode = 404;
  }
}

export const unrecognizedPathThrower = async () => {
  throw new UnrecognizedPath;
};