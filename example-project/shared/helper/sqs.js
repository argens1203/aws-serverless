import AWS from 'aws-sdk';

const awsSqs = new AWS.SQS({
  apiVersion: '2012-11-05',
  retryDelayOptions: {
    base: 1000
  }
});

export class Sqs {
  constructor(QueueUrl) {
    this.QueueUrl = QueueUrl;
    this.defaultMaxNumberofMessages = 10;
  }

  async sendMessage(body) {
    return await awsSqs.sendMessage({
      MessageBody: JSON.stringify(body),
      QueueUrl: this.QueueUrl
    }).promise();
  }


  async receiveAndDeleteBodies(MaxNumberOfMessages = this.defaultMaxNumberofMessages) {
    const rawMessages = await this.receiveRawMessages(MaxNumberOfMessages);

    const bodies = [];
    for (const message of rawMessages) {
      const { Body, ReceiptHandle } = message;
      try {
        bodies.push(JSON.parse(Body));
      } catch {
      }
      await this.deleteMessage(ReceiptHandle);
    }

    return bodies;
  }

  async receiveMessages(MaxNumberOfMessages = this.defaultMaxNumberofMessages) {
    const rawMessages = await this.receiveRawMessages(MaxNumberOfMessages);

    const messages = [];
    for (const message of rawMessages) {
      const { Body, ReceiptHandle } = message;
      try {
        messages.push({
          handle: ReceiptHandle,
          body: JSON.parse(Body)
        });
      } catch (e) {
        await this.deleteMessage(ReceiptHandle);
      }
    }

    return messages;
  }

  async receiveRawMessages(MaxNumberOfMessages = this.defaultMaxNumberofMessages) {
    const res = await awsSqs.receiveMessage({
      QueueUrl: this.QueueUrl,
      MaxNumberOfMessages
    }).promise();

    console.log('res', res);
    return res.Messages || [];
  }

  async deleteMessage(ReceiptHandle) {
    return await awsSqs.deleteMessage({
      QueueUrl: this.QueueUrl,
      ReceiptHandle
    }).promise();
  }

  static getBodiesFromEvent(event) {
    console.log(event);
    const bodies = [];
    event.Records.forEach(({ body }) => {
      try {
        bodies.push(JSON.parse(body));
      } catch {
        //Erroneous bodies will automatically be removed if (handler-)function returns successfully
      }
    });
    return bodies;
  }

  static getBodyFromMessage(message) {
    const { body } = message;
    return body;
  }

  static getHandleFromMessage(message) {
    const { handle } = message;
    return handle;
  }
}
