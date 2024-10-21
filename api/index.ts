import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const api = axios;

export async function initializeAxios() {
  const DOMAIN_URL = process.env.EXPO_PUBLIC_API_URL;
  const token = await AsyncStorage.getItem("@token");

  const headers = {
    "Content-Type": "application/json",
  };

  axios.defaults.baseURL = DOMAIN_URL;
  axios.defaults.headers.common = headers;
  axios.defaults.headers.common["Authorization"] = token;

  axios.interceptors.request.use(
    function (config) {
      console.info(`${config.method} ${config.url} [...]`);

      return config;
    },
    function (error) {
      if (error.response) {
        console.info(`${error.request._method} ${error.request._url} [ERROR]`);
      } else {
        console.info("Error", error.message, error);
      }
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      console.info(`${response.config.method} ${response.config.url} [OK]`);

      return response;
    },
    function (error) {
      if (error.response) {
        if (error.response.status == 401) {
          AsyncStorage.removeItem("@token");
        }
        console.info(`${error.request._method} ${error.request._url} [ERROR]`);
        console.info(
          `\t[${error.response.status}] ${JSON.stringify(error.response.data)}`
        );
      }
      return Promise.reject(error);
    }
  );
}

export default api;
