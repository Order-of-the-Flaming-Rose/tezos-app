/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { createErr } from '../../errors';

const baseConfig: { [key: string]: any } = {
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
  sender: any;

  request: any;

  unsuccessRequest: any;

  config: any;

  constructor(config = {}) {
    this.sender = axios.create();
    this.request = null;
    this.unsuccessRequest = null;
    this.config = Object.assign(baseConfig, config);
  }

  get cancel() {
    return axios.CancelToken;
  }

  abort(): void {
    if (this.request) {
      this.request.cancel();
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
  async send(config = {}): Promise<any> {
    this.request = this.cancel.source();
    const conf = Object.assign(this.config, config);
    if (!conf.headers) {
      conf.headers = {};
    }

    conf.headers['X-Requested-With'] = 'XMLHttpRequest';
    conf.headers.Accept = 'application/json';
    conf.cancelToken = this.request.token;

    try {
      return await this.sender(conf);
    } catch (error: any) {
      if (error.response) {
        // Запрос был сделан, и сервер ответил кодом состояния
        // выпадающий из диапазона 2xx
        // console.log('error response', error.response.data)
        // console.log('error response', error.response.status)
        return Promise.reject(
          createErr({
            type: '',
            name: '',
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
        if (this.unsuccessRequest) {
          this.unsuccessRequest.cancel();
          this.unsuccessRequest = null;
          this.abort();
          return Promise.reject(createErr(error));
        }
        // иначе создадим и вернем еще раз функцию с тем же конфигом
        this.unsuccessRequest = this.cancel.source();
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
