import axios from "axios";
import { variables } from "$lib/variables";
import tokenStore from "../store/auth-store";
import { browser } from "$app/environment";

let auth: any;
tokenStore.subscribe((t) => (auth = t));

const axiosAPI = axios.create({
  baseURL: variables.apiBasePath,
});

const apiRequest = (
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  request?: object
) => {
  if (browser) {
    console.log();
  }
  const headers = {
    "x-auth-token": browser
      ? atob(localStorage.getItem("token") || "") || auth?.token
      : auth?.token,
  };
  return axiosAPI({
    method,
    url,
    data: request,
    headers,
  })
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const get = (url: string) => apiRequest("GET", url);

const deleteRequest = (url: string) => apiRequest("DELETE", url);

const post = (url: string, request: object) => apiRequest("POST", url, request);

const put = (url: string, request: object) => apiRequest("PUT", url, request);

const patch = (url: string, request: object) =>
  apiRequest("PATCH", url, request);

const API = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch,
};

export default API;
