import { Validator as JsonSchemaValidator } from 'jsonschema';
import BadRequest from "../error/bad-request";

class BaseValidator {
  constructor(schema) {
    this.schema = schema;
  }

  validate(a) {
    const res = new JsonSchemaValidator().validate(a, this.schema);
    const errors = res.errors.map(ve => `${ve.instance} ${ve.message}`);
    if (errors.length > 0) {
      throw new BadRequest({ errors });
    }
  }
}

export default BaseValidator;