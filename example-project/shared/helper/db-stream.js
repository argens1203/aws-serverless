import { parseAwsObject } from "./aws-parser";

export const REMOVE = 'REMOVE';
export const INSERT = 'INSERT';
export const MODIFY = 'MODIFY';

export function parseDdbStream(event) {
  const { Records: _Records } = event;
  const Records = _Records || [];
  return Records.map(parseDdb).filter(r => r);
}

function parseDdb(ddbRecord) {
  const { eventName, dynamodb: { NewImage, OldImage } } = ddbRecord;
  const newImage = NewImage && parseAwsObject(NewImage) || null;
  const oldImage = OldImage && parseAwsObject(OldImage) || null;
  return {
    eventName: eventName.toUpperCase(),
    newImage,
    oldImage
  };
}