import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./ExpiredSessionMessage.css";

const ExpiredSessionMessageComponent = () => {
  const [showAlert, setShowAlert] = useState(false);
  // Kiểm tra Access token có hết hạn hay chưa
  useEffect(() => {
    const isTokenExpired = () => {
      // Check token expiry logic here
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        // Xử lý khi không có access token trong localStorage
        return true; // Hoặc thực hiện xử lý khác tùy thuộc vào trường hợp của bạn
      }

      try {
        // Giải mã access token để trích xuất thông tin hết hạn
        const decodedToken = jwtDecode(accessToken);
        const tokenExp = decodedToken.exp * 1000; // Đổi từ giây thành milliseconds
        const now = Date.now();
        return tokenExp < now; // Trả về true nếu access token đã hết hạn
      } catch (error) {
        console.error("Lỗi khi giải mã access token:", error);
        return true; // Xử lý khi có lỗi trong quá trình giải mã token
      }
    };

    const interval = setInterval(() => {
      if (isTokenExpired()) {
        setShowAlert(true);
      }
    }, 1000); // Adjust interval time as needed

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  const handleRedirectToLogin = () => {
    // Redirect to login page logic here
    window.location.href = "/login_user"; // Replace with your login page URL
  };

  return (
    showAlert && (
      <div className="token-expired-overlay">
        <div className="token-expired-box">
          <p>Phiên đăng nhập của bạn đã hết. Vui lòng đăng nhập lại</p>
          <button onClick={handleRedirectToLogin}>OK</button>
        </div>
      </div>
    )
  );
};

export default ExpiredSessionMessageComponent;
