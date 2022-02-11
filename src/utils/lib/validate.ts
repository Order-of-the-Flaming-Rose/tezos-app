export function isPlainObj(value: Object) {
  return !!value && value.constructor === Object;
}

export function isString(value: string) {
  return !!value && value.constructor === String;
}

export function isNumber(value: any) {
  let val = value;
  if (val instanceof Number) {
    val = val.valueOf();
  }
  return Number.isFinite(val) && val === parseInt(val, 10);
}

export function validateMobilePhone(phone: string) {
  return /^\+79\d{9}/.test(phone);
}
