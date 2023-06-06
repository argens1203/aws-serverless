import AWS from 'aws-sdk';

const awsSsm = new AWS.SSM({
  apiVersion: "2014-11-06",
});

export class Ssm {
  static async getP(Name) {
    const res = await awsSsm.getParameter({
      Name
    }).promise();
    return res.Parameter;
  }

  static async getParameter(Name) {
    const res = await this.getP(Name);
    return res.Value;
  }

  static async putParameter(Name, Value, Description, Overwrite = true, Type = "String") {
    return awsSsm.putParameter({
      Name,
      Value,
      Description,
      Overwrite,
      Type
    }).promise();
  }
}