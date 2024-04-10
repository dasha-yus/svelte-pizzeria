
import axios from "axios";
import { variables } from "$lib/variables";
import tokenStore from "../store/auth-store";
import { onDestroy } from "svelte";

let auth: any;
let unsubscribe = tokenStore.subscribe((t) => (auth = t));

onDestroy(unsubscribe);

const axiosAPI = axios.create({
  baseURL: variables.apiBasePath,
});

const apiRequest = (
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  request?: object
) => {
  const headers = {
    "x-auth-token": auth?.token,
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
