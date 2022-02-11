import { createErr } from '../../errors';
import { isPlainObj } from '../../utils';
import { VALIDATION_ERROR } from '../../errors/codes';

export function checkResponseType(response: any) {
  if (!isPlainObj(response)) {
    return createErr({
      message: `invalid response data type. Response data type must be "application/json" at ${typeof response}`,
      code: VALIDATION_ERROR,
    });
  }
  return null;
}

export function checkResponseDataType(response: any) {
  const { data: resData } = response;
  if (resData && typeof resData !== 'object') {
    return createErr({
      message: `response data must be Object or Array at ${typeof resData}`,
      code: VALIDATION_ERROR,
    });
  }
  return null;
}

function* errorChecker(value: any) {
  yield checkResponseType(value);
  yield checkResponseDataType(value);
}

export default function checkErrors(response: any) {
  const iterator = errorChecker(response);
  let result = null;
  while (!result) {
    const res = iterator.next();
    result = res && res.value ? res.value : null;
    if (res.done) break;
  }
  return result;
}
