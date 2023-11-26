import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErroMessageComponents from "../ErrorMessageCoponents/ErroMessageComponents";
import "./FLogin.css";

const FLoginComponents = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [passError, setPassError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/sign-in",
        formData
      );
      const data = response.data;
      const id = data.id;
      const accessToken = data.access_token;

      localStorage.setItem("accessToken", accessToken);
      // Lưu userId vào Local Storage
      localStorage.setItem("userid", id);
      if (
        response.data.status === "ERR" &&
        response.data.message === "The username is not defined"
      ) {
        setError("Tên đăng nhập không đúng");
      } else {
        setError("");
      }
      if (
        response.data.status === "ERR" &&
        response.data.message === "The password or user is incorrect"
      ) {
        setPassError("Mật khẩu không đúng");
      } else {
        setPassError("");
      }

      if (
        response.data.status === "OK" &&
        response.data.message === "SUCCESS"
      ) {
        console.log();
        navigate("/detail_user");
      }
    } catch (error) {}
  };
  return (
    <div className="form_Login_Container">
      <form onSubmit={handleSubmit}>
        <span>LOGIN</span>
        <div className="form_Login_Item">
          <label htmlFor="username">Tên đăng nhập:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
          <ErroMessageComponents message={error} />
        </div>
        <div className="form_Login_Item">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <ErroMessageComponents message={passError} />
        </div>
        <button type="submit">Đăng nhập</button>
        <p className="FLogin_Link">
          Bạn chưa có tài khoản ? <a href="/signup_user">SIGN UP</a>
        </p>
      </form>
    </div>
  );
};
export default FLoginComponents;
