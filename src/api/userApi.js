// import axiosClient from "./axiosClient";

// const userApi = {
//   getAll: () => {
//     //Lấy accessToken từ Local Storage
//     const accessToken = localStorage.getItem("accessToken");
//     console.log(accessToken);
//     const url = "/user/getAll";
//     return axiosClient.get(url, {
//       params: {},
//       headers: {
//         Authorization: `Bearer ${accessToken}`, // Sử dụng token từ localStorage
//       },
//     });
//   },
//   getDetail: () => {
//     const accessToken = localStorage.getItem("accessToken");
//     const url = "/user/get-details/:id";
//     return axiosClient.get(url, {
//       params: {},
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//   },
// };

// export default userApi;
