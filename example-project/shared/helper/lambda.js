import AWS from "aws-sdk";
import { FreeFormError } from "../error/free-form-error";

const lambda = new AWS.Lambda({ apiVersion: '2015-03-31' });

export class Lambda {
  constructor(FunctionName) {
    this.FunctionName = FunctionName;
  }

  async invoke(payload) {
    const res = await lambda.invoke({
      FunctionName: this.FunctionName,
      Payload: JSON.stringify(payload)
    }).promise();
    console.log('res');
    console.log(res);

    const { FunctionError, Payload } = res;
    const returnPayload = JSON.parse(Payload);

    if (FunctionError) {
      const { errorType, errorMessage, ...rest } = returnPayload;
      throw new FreeFormError(errorType, errorMessage, rest);
    }
    return returnPayload;
  }
}