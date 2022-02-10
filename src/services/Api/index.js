import checkErrors from './checkErrors';
import CashData from './CashData';
import { isString } from '~/utils';
import HttpClient from '~/services/HttpClient';
import { API_BASE_PATH } from '~/config';

// TODO cash request
export default class Api {
  constructor(baseUrl) {
    this.client = new HttpClient();
    this.client.sender.interceptors.request.use((conf) => {
      return { ...conf, baseURL: baseUrl || API_BASE_PATH };
    });
  }

  _buildUrl(template, params = {}) {
    if (!isString(template)) {
      throw new Error('url string pattern must be a string');
    }
    return template.replace(/:([A-Z0-9]+)/gi, (match, p1) => {
      const res = params[p1];
      if (typeof res === 'string' || typeof res === 'number') {
        return res;
      }
      throw new Error(`Build url failed: ${p1} is ${typeof res}`);
    });
  }

  _get(urlTemplate, params, query, config) {
    return this._send('GET', {
      urlTemplate, params, query, config,
    });
  }

  _post(urlTemplate, params, data, query, config) {
    return this._send('POST', {
      urlTemplate, data, params, query, config,
    });
  }

  _put(urlTemplate, params, data, query, config) {
    return this._send('PUT', {
      urlTemplate, data, params, query, config,
    });
  }

  _delete(urlTemplate, params, query, config) {
    return this._send('DELETE', {
      urlTemplate, params, query, config,
    });
  }

  async _send(method, {
    urlTemplate, data = {}, params = {}, query = {}, config = {},
  }) {
    const url = this._buildUrl(urlTemplate, params);
    const clientConfig = {
      method,
      url,
      data,
      params: query,
      ...config,
    };

    try {
      let res;
      const cashData = CashData.get(url);

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
