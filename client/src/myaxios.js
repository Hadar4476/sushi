import axios from 'axios';

export const url = 'https://hadar-sushi-project.herokuapp.com';

const instance = axios.create({
  baseURL: url,
});

export default instance;
