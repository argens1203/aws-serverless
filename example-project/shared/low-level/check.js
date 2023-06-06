export function isEmpty(value) {
  return (value == null);
}

export function isObject(value) {
  return !isEmpty(value) && typeof value === "object";
}

export function isArrNotEmpty(arr){
  return Array.isArray(arr) && arr.length;
}