import AWS from "aws-sdk";

const service = process.env.IS_OFFLINE ?
  {
    endpoint: "http://127.0.0.1:5656",
    region: "localhost",
  } :
  {
    apiVersion: '2015-10-07',
  };

export const awsEventBridge = new AWS.EventBridge(service);

export class EventBridge {
  static async putEvents(events) {
    return awsEventBridge.putEvents({
      Entries: events
    }).promise();
  }
}