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
} from './codes';
import AppError from './AppError';

export { default as AppError } from './AppError';

type errType = {
  message: string;
  code: number;
  type?: string;
  data?: any;
  name?: string;
};

export function createErr(err: errType): AppError {
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
        type: err.name || 'uncknown error',
        code: err.code,
      });
    }
  }
}
