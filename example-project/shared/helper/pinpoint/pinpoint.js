import AWS from "aws-sdk";
import { ChannelType } from "./constants/channel-type";
import { SMSMessageType } from "./constants/sms-message-type";

const awsPinpoint = new AWS.Pinpoint({ apiVersion: '2016-12-01' });

export class Pinpoint {
  constructor(appId) {
    this.appId = appId;
  }

  async sendTransactionalSms(title, message, phoneNumber) {
    return this.sendSmsToMany(title, message, [phoneNumber], SMSMessageType.TRANSACTIONAL);
  }

  async sendSmsToMany(title, message, phoneNumbers, MessageType) {
    const Addresses = {};
    phoneNumbers.forEach(p => {
      Addresses[p] = {
        ChannelType: ChannelType.SMS
      };
    });
    return awsPinpoint.sendMessages({
      ApplicationId: this.appId,
      MessageRequest: {
        MessageConfiguration: {
          SMSMessage: {
            SenderId: title,
            Body: message,
            MessageType
          }
        },
        Addresses
      }
    }).promise();
  }
}