import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001/api/',
});

const registation = (data) => {
  http.post('registation', data);
};
