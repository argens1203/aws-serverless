import AWS from "aws-sdk";

const service = process.env.IS_OFFLINE ? {
  s3ForcePathStyle: true,
  accessKeyId: 'S3RVER', // This specific key is required when working offline
  secretAccessKey: 'S3RVER',
  endpoint: new AWS.Endpoint('http://localhost:7879'),
} : { apiVersion: "2006-03-01" };

export const awsS3 = new AWS.S3(service);

export class S3 {
  constructor(bucketName) {
    this.bucketName = bucketName;
  }

  async scan() {
    const { Contents } = await awsS3.listObjectsV2({
      Bucket: this.bucketName
    }).promise();
    return Contents;
  }

  async removeMultiple(keys) {
    const Objects = keys.map(key => ({ Key: key }));
    if (Objects.length === 0) {
      return;
    }
    return awsS3.deleteObjects({
      Bucket: this.bucketName,
      Delete: {
        Objects
      }
    }).promise();
  }

  static getKey(content) {
    return content.Key;
  }
}