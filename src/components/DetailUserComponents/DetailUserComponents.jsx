import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./DetailUser.css";
// import axiosClient from "~/api/axiosClient";
import ExpiredSessionMessageComponent from "../ExpiredSessionMessageComponents/ExpiredSessionMessageComponent";

const DetailUserComponents = () => {
  const userId = localStorage.getItem("userid");
  console.log(userId);
  const accessToken = localStorage.getItem("accessToken");
  console.log("access_detail", accessToken);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      // Kiểm tra nếu userId có giá trị
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/user/get-details/${userId}`
          );
          setUserDetails(response.data.data);
          console.log("abc", response.data);
        } catch (error) {
          console.error("Lỗi khi lấy thông tin người dùng:", error);
          // Xử lý lỗi khi không thể lấy thông tin người dùng
        }
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div className="container_user">
      <div className="header_user">
        {userDetails ? (
          <>
            <span className="fullname">Xin chào: {userDetails.fullname}</span>
          </>
        ) : (
          <p>Loading</p>
        )}
        <div className="user_logout_icon">
          <i className="fa-solid fa-right-from-bracket"></i>
        </div>
      </div>
      <div className="content_user">
        <div className="detail_user">
          <span>Thông tin của bạn</span>
          <div className="detail_user_text">
            {userDetails ? (
              <>
                <p>Full Name: {userDetails.fullname}</p>
                <p>Phone: {userDetails.phone}</p>
                <p>Email: {userDetails.email}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <ExpiredSessionMessageComponent />
      </div>
    </div>
  );
};

export default DetailUserComponents;
