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
  NOT_ACCEPTABLE,
} from './codes';

type err = {
  message: string;
  code: number;
  type: string;
  data?: any;
};

// зашить в enum
const errorMessages: { [key: number]: string } = {
  [FORBIDDEN]: 'Доступ запрещен.',
  [UNAUTHORIZED]: 'Необходима авторизация',
  [SERVER_ERROR]: 'Ошибка сервера',
  [SERVER_FAILED]: 'Ошибка сервера',
  [BAD_REQUEST]: 'Невозможно выполнить текущий запрос',
  [NOT_FOUND]: 'Сервер не поддерживает запрос',
  [CONNECT_ERROR]: 'Проблемы с сетевым соединением',
  [VALIDATION_ERROR]: 'Ошибка валидации',
  [NON_AUTHORITATIVE]: 'Недопустимое значение',
  [NO_CONTENT]: '',
  [RESET_CONTENT]: '',
  [NOT_ACCEPTABLE]: 'Недопустимое значение',
};
export default class AppError extends Error {
  name: string;

  type: string | any;

  userText: string;

  code: number;

  originalMessage: string;

  data: any;

  constructor({ message, code, type, data }: err) {
    super(
      `
        code - ${code};
        message: ${message};
      `,
    );
    this.name = 'AppError';
    this.type = type;
    this.userText = errorMessages[code] || message;
    this.code = code;
    this.originalMessage = message;
    this.data = data;
  }
}
