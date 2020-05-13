import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://192.168.178.100:9200/growth',
    //baseURL: 'http://192.168.178.21:9200/growth',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
});