/* eslint-disable class-methods-use-this */
import checkErrors from './checkErrors';
// import CashData from './CashData';
import { isString } from '../../utils';
import HttpClient from '../HttpClient';
import { API_BASE_PATH } from '../../config';

// TODO cash request
export default class Api {
  client: HttpClient;

  constructor(baseUrl: string) {
    this.client = new HttpClient({ baseURL: baseUrl || API_BASE_PATH });
  }

  buildUrl(template: string, params: any = {}): string | Error {
    if (!isString(template)) {
      throw new Error('url string pattern must be a string');
    }
    const redExp = /:([A-Z0-9]+)/gi;
    return template.replace(redExp, (_match: string, p1: string) => {
      const res = params[p1];
      if (typeof res === 'string' || typeof res === 'number') {
        return String(res);
      }
      throw new Error(`Build url failed: ${p1} is ${typeof res}`);
    });
  }

  get(urlTemplate: string, params: any, query: any, config: any) {
    return this.send('GET', {
      urlTemplate,
      params,
      query,
      config,
    });
  }

  post(urlTemplate: string, params: any, data: any, query: any, config: any) {
    return this.send('POST', {
      urlTemplate,
      data,
      params,
      query,
      config,
    });
  }

  put(urlTemplate: string, params: any, data: any, query: any, config: any) {
    return this.send('PUT', {
      urlTemplate,
      data,
      params,
      query,
      config,
    });
  }

  delete(urlTemplate: string, params: any, query: any, config: any) {
    return this.send('DELETE', {
      urlTemplate,
      params,
      query,
      config,
    });
  }

  async send(
    method: string,
    {
      urlTemplate,
      data = {},
      params = {},
      query = {},
      config = {},
    }: { [key: string]: any },
  ) {
    const url = this.buildUrl(urlTemplate, params);
    const clientConfig = {
      method,
      url,
      data,
      params: query,
      ...config,
    };

    try {
      let res;
      const cashData = null; // CashData.get(url);

      if (cashData) {
        res = cashData;
      } else {
        res = await this.client.send(clientConfig);
      }
      // TODO разнести обработку ошибок по классам
      // Либо как то определять как анализировать ошибку
      const err = checkErrors(res);

      if (err) {
        throw err;
      }

      return res;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
