import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErroMessageComponents from "../ErrorMessageCoponents/ErroMessageComponents";
import "./FSignup.css";

const FSignupComponents = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/sign-up",
        formData
      );
      console.log("message: ", response.data); // Hiển thị thông báo từ server
      if (
        response.data.status === "ERR" &&
        response.data.message === "The username is already"
      ) {
        setError("Tên người dùng đã tồn tại");
      } else {
        setError("");
      }
      if (
        response.data.status === "ERR" &&
        response.data.message === "The input is not email"
      ) {
        setEmailError("Email không hợp lệ");
      } else {
        setEmailError("");
      }
      if (response.data.status === "OK") {
        navigate("/login_user");
      }

      // } else {
      //   // Xử lý các lỗi khác
      //   if (response.data.message === "The input is required 22") {
      //     setError("Vui lòng điền đầy đủ thông tin");
      //   } else if (response.data.message === "The input is not email") {
      //     setError("Email không hợp lệ");
      //   } else {
      //     setError("Lỗi không xác định");
      //   }
      // }
    } catch (error) {
      // Xử lý lỗi từ server hoặc trong quá trình gửi yêu cầu
      if (error.response) {
        setError("Lỗi từ server: " + error.response.data.message);
      } else if (error.request) {
        setError("Không có phản hồi từ server");
      } else {
        setError("Có lỗi xảy ra trong quá trình gửi yêu cầu");
      }
    }
  };

  return (
    <div className="form_Signup_Container">
      <form onSubmit={handleSubmit}>
        <span>Sign Up</span>
        <input
          type="text"
          placeholder="Họ và tên"
          name="fullname"
          required
          value={formData.fullname}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Tên đăng nhập"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
        />

        <ErroMessageComponents message={error} />
        <input
          type="number"
          placeholder="Số điện thoại"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="input"
          placeholder="Email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <ErroMessageComponents message={emailError} />

        <input
          type="password"
          placeholder="Mật khẩu"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        {/* <input
          type="password"
          placeholder="Xác nhận lại mật khẩu"
          name="repassword"
          required
          value={formData.repassword}
          onChange={handleChange}
        /> */}
        <button type="submit">Đăng ký</button>
        <p className="FSignup_Link">
          Bạn đã có tài khoản ? <a href="/login_user">LOGIN</a>
        </p>
      </form>
    </div>
  );
};

export default FSignupComponents;
