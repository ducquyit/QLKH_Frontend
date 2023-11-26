import axios from "axios";
import queryString from "query-string";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Hàm để thêm access token vào header
// const setAuthHeader = () => {
//   const accessToken = localStorage.getItem("accessToken");
//   if (accessToken) {
//     axiosClient.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${accessToken}`;
//   } else {
//     delete axiosClient.defaults.headers.common["Authorization"];
//   }
// };
// axiosClient.interceptors.request.use(async (config) => {
//   setAuthHeader();
//   return config;
// });
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
