import axios from 'axios';
const serviceaxios = axios.create({
  timeout: 3000
});
serviceaxios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);
serviceaxios.interceptors.response.use(
  response => {
    let res = {};
    res.status = response.status;
    res.data = response.data;
    return res;
  },
  error => {
    // Do something with response error
    return Promise.reject(error);
  }
);
export default serviceaxios;
