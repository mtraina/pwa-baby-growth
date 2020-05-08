import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost:9200/growth',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'foo': 'bar'
    }
  });