import axios from 'axios';

export default {
  apiPipedrive: axios.create({
    baseURL: 'https://api.pipedrive.com/v1/',
  }),

  apiBling: axios.create({
    baseURL: 'https://bling.com.br/Api/v2',
    headers: { 'Content-Type': 'x-www-form-urlencoded' },
  }),
};
