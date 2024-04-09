import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:4000"
  // baseURL: __myapp.env.API_URL,
});

const apiRequest = (
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  request?: any
) => {
  const headers = {
    authorization: "",
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

const get = (url) => apiRequest("GET", url);

const deleteRequest = (url) => apiRequest("DELETE", url);

const post = (url, request) => apiRequest("POST", url, request);

const put = (url, request) => apiRequest("PUT", url, request);

const patch = (url, request) => apiRequest("PATCH", url, request);

const API = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch,
};
export default API;
