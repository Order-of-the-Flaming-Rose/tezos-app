import axios from 'axios';
import { createErr } from '~/errors';

const baseConfig = {
  baseURL: '/',
  timeout: 0,
  responseType: 'json',
  responseEncoding: 'utf8',
  withCredentials: true,
  crossDomain: true,
  defaults: {
    withCredentials: true,
    crossDomain: true,
  },
};
export default class HttpClient {
  constructor(config = {}) {
    this.sender = axios.create();
    this._request = null;
    this._unsuccessRequest = null;
    this.config = Object.assign(baseConfig, config);
  }

  get cancel() {
    return axios.CancelToken;
  }

  abort() {
    if (this._request) {
      this._request.cancel();
      this.request = null;
    }
  }

  /**
   *
   *
   * @param {*} config axios config
   * @returns axios result
   * @memberof HttpClient
   */
  async send(config = {}) {
    this._request = this.cancel.source();
    const conf = Object.assign(this.config, config);
    if (!conf.headers) {
      conf.headers = {};
    }

    conf.headers['X-Requested-With'] = 'XMLHttpRequest';
    conf.headers.Accept = 'application/json';
    conf.cancelToken = this._request.token;

    try {
      return await this.sender(conf);
    } catch (error) {
      if (error.response) {
        // Запрос был сделан, и сервер ответил кодом состояния
        // выпадающий из диапазона 2xx
        // console.log('error response', error.response.data)
        // console.log('error response', error.response.status)
        return Promise.reject(
          createErr({
            code: error.response.status,
            message: error.response.statusText,
            data: error.response.data,
          }),
        );
      }

      if (error.request) {
        // Запрос был сделан, но ответа не было
        // `error.request` - это экземпляр XMLHttpRequest в браузере и экземпляр
        // http.ClientRequest в node.js
        // console.log('error request', error.request)
        // что бы небыло рекурсии проверим что запрос есть
        // TODO надо проверить что-бы не отменялся какой другой параллельный запрос класс то один!!!
        if (this._unsuccessRequest) {
          this._unsuccessRequest.cancel();
          this._unsuccessRequest = null;
          this.abort();
          return Promise.reject(createErr(error));
        }
        // иначе создадим и вернем еще раз функцию с тем же конфигом
        this._unsuccessRequest = this.cancel.source();
        // TODO наверное пропущен await ?
        //  нет  упущен ретурн
        return this.send(error.config);
      }
      // Что-то произошло при настройке запроса, вызвавшего ошибку
      // console.log('Error', error.message)

      return Promise.reject(error);
    }
  }
}
