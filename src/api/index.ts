/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios from 'axios';
// import { config } from 'process';

const APIService = axios.create();
APIService.interceptors.request.use(
  async (config) => {
    config.baseURL = 'http://localhost:1323/api/account/';
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return config;
  },
  (error) => Promise.reject(error),
);

APIService.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const original = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        const response = await axios.post(
          'http://localhost:1323/api/account/refresh',
          { refresh_token: localStorage.getItem('refresh_token') },
        );
        localStorage.setItem('token', response.data.access_token);
        return APIService.request(original);
      } catch (err) {
        console.log(err);
      }
    }
    throw Error();
  },
);

export const API = {
  signUP({
    email,
    password,
    address,
  }: {
    email: string;
    password: string;
    address: string;
  }) {
    return axios.post('http://localhost:1323/api/account/sign-up', {
      email,
      password,
      address,
    });
  },
  singIn({ email, password }: { email: string; password: string }) {
    return axios.post('http://localhost:1323/api/account/sign-in', {
      email,
      password,
    });
  },

  me() {
    return APIService.get('/me');
  },
  signOut() {
    return APIService.post('/sign-out');
  },
  addDiscord(name: string) {
    return APIService.patch(`/add-discord?name=${name}`);
  },
  addTelegram(name: string) {
    return APIService.patch(`/add-tg?name=${name}`);
  },
};
