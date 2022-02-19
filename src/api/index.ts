/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios';


const APIService = axios.create({
//   timeout: 30000,
//   responseType: 'json',
//   headers:{
//     'Content-Type': 'application/json'
//   },
  withCredentials: true,
});

APIService.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.baseURL = 'http://localhost:1323/api/account/';
    config.headers = {
      Authorization: `Bearer : ${localStorage.getItem('token')}`,
    };
    return config;
  },
  (error) => Promise.reject(error),
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
    console.log(
      `/sign-up?email=${email}&password=${password}&address=${address}`,
    );
    return APIService.post(
      `/sign-up?email=${email}&password=Vvoovvaa31&address=tz1RB9RXTv6vpuH9WnyyG7ByUzwiHDHGqHzq`,
    );
  },
  singIn({ email, password }: { email: string; password: string }) {
      console.log(email,password);
    // return APIService.post()
    return axios.post('http://localhost:1323/api/account/sign-in', {email: 'oberigfast@gmail.com', password: 'Vvoovvaa31#'})
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
