import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErroMessageAdminComponents from "../ErrorMessageAdminComponents/ErrorMessageAdminCpomponents";
import ErroMessageComponents from "../ErrorMessageCoponents/ErroMessageComponents";
import "./FloginAdmin.css";

const FLoginAdminComponents = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [passError, setPassError] = useState("");
  const [adminError, setAdminError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/sign-in-admin",
        formData
      );
      const data = response.data;
      console.log("data", data);
      // const id = data.id;
      const accessToken = data.access_token;
      // Hiển thị thông báo từ server
      // const access_token_local = response.data.access_token;
      // Lưu userId vào Local Storage
      // localStorage.setItem("userid", id);
      localStorage.setItem("accessToken", accessToken);
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
        response.data.status === "ERR" &&
        response.data.message === "you are not admin"
      ) {
        setAdminError("Bạn không phải là Admin");
        setShowError(true);
      } else {
        setAdminError("");
        setShowError(false);
      }

      if (
        response.data.status === "OK" &&
        response.data.message === "SUCCESS"
      ) {
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
  };
  return (
    <div className="form_Login_Admin_Container">
      {showError && <ErroMessageAdminComponents message={adminError} />}
      <form onSubmit={handleSubmit}>
        <span>LOGIN</span>
        <div className="form_Login_Admin_Item">
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
        <div className="form_Login_Admin_Item">
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
      </form>
    </div>
  );
};
export default FLoginAdminComponents;
