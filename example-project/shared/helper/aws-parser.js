export function parseAwsShit(valueObj) {
  if (Object.entries(valueObj).length !== 1) {
    console.error('AWS Helper - Parsing Error - Expects Length of 1');
    console.log(JSON.stringify(valueObj));
    throw new Error();
  }
  const key = Object.keys(valueObj)[0];
  const value = Object.values(valueObj)[0];

  switch (key) {
    case 'BS': //Binary Set
      return value;
    case 'NULL': // Null
      return null;
    case 'N': // Number
      return Number.parseFloat(value);
    case 'NS': // Number Set
      return value.map(Number.parseFloat);
    case 'BOOL': // Boolean
      return value;
    case 'B': // Binary, returned as string
      return value;
    case 'SS': // String Set, returned as string array
      return value;
    case 'S': // String
      return value;
    case 'L': // List
      return value.map(parseAwsShit);
    case 'M': // Map
      return parseAwsObject(value);
    default:
      console.error('AWS Helper - Parsing Error - Unexpected Value Type');
      console.error(key);
      console.error(value);
      throw new Error();
  }
}

export function parseAwsObject(obj) {
  const ret = {};
  Object.entries(obj).forEach(([key, value]) => {
    ret[key] = parseAwsShit(value);
  });
  return ret;
}