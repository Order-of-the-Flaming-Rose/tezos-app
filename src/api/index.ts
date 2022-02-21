/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios from 'axios';



axios.defaults.baseURL = 'http://localhost:1323/api/account/';
// axios.defaults.headers.common.Authorization = `Bearer ${key}`;
// // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.headers['Access-Control-Max-Age'] = 86400;
// axios.defaults.headers.get.Accept = '*/*';

const APIService = axios.create();
// APIService.interceptors.request.use(
//   async (config) => {
//     config.baseURL = 'http://localhost:1323/api/account/';
//     config.headers = {
//       Authorization:  `Bearer ${key}`,
//       'Access-Control-Max-Age':600
//     };
//     console.log(config);
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

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
    console.log(
      `/sign-up?email=${email}&password=${password}&address=${address}`,
    );
    return axios.post('http://localhost:1323/api/account/sign-up', { email, password, address})

  },
  singIn({ email, password }: { email: string; password: string }) {
  console.log('hallo')
    return axios.post('http://localhost:1323/api/account/sign-in', { email, password })
  },

   me() {


  return APIService.get('/me')
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
