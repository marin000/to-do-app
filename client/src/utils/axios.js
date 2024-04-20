import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_SERVER,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
});

export default instance;
