import AppError from '@errors/AppError';
import {
  FORBIDDEN,
  UNAUTHORIZED,
  SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  CONNECT_ERROR,
  VALIDATION_ERROR,
  SERVER_FAILED,
  NON_AUTHORITATIVE,
  NO_CONTENT,
  RESET_CONTENT,
} from '@errors/codes';

export { default as AppError } from '@errors/AppError';

export function createErr(err) {
  if (err instanceof Error && err.message === 'Network Error') {
    return new AppError({
      message: 'Проблемы с сетевым соединением',
      type: 'connectError',
      code: CONNECT_ERROR,
    });
  }
  const errData = {
    message: err.message,
    code: err.code,
    data: err.data || null,
  };
  switch (Number(err.code)) {
    case UNAUTHORIZED: {
      return new AppError({
        ...errData,
        type: 'authorizationError',
      });
    }
    case FORBIDDEN: {
      return new AppError({
        ...errData,
        type: 'accessError',
      });
    }
    case SERVER_ERROR:
    case SERVER_FAILED:
    case BAD_REQUEST: {
      return new AppError({
        ...errData,
        type: 'serverError',
      });
    }
    case NOT_FOUND:
    case NO_CONTENT:
    case RESET_CONTENT:
    case NON_AUTHORITATIVE: {
      return new AppError({
        ...errData,
        type: 'apiError',
      });
    }
    case VALIDATION_ERROR: {
      return new AppError({
        ...errData,
        type: 'validationError',
      });
    }
    default: {
      return new AppError({
        message: err.message,
        type: err.name,
        code: err.code,
      });
    }
  }
}
