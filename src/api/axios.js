import axios from "axios";

export const customFetch = axios.create({
  baseURL:
    "https://api.thecatapi.com",
  headers: {
    "Content-type": "application/json; charset=utf-8",
  },
});


customFetch.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

