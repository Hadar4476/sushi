import axios from 'axios';

export const url = 'http://localhost:3006';

const instance = axios.create({
  baseURL: url,
});

export default instance;
