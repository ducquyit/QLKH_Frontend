import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErroMessageComponents from "../ErrorMessageCoponents/ErroMessageComponents";
import "./CreateUser.css";
// import {Row, Col} from 'antd';

const CreateUserComponents = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    // repassword: "",
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
      console.log(response.data.message); // Hiển thị thông báo từ server
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
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi khi tạo User:", error);
    }
  };
  return (
    <div className="form_Signup_Create_Container">
      <form onSubmit={handleSubmit}>
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
          type="text"
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
        <button type="submit">Tạo mới</button>
      </form>
    </div>
  );
};

export default CreateUserComponents;
