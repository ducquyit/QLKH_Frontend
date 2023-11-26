import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateUser.css";

const UpdateUserComponents = () => {
  const currentURL = window.location.href;
  const userId = currentURL.split("/")[4];

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [idError, setIdError] = useState("");
  const [emailError, setEmailError] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/user/get-details/${userId}`
        );
        const userData = response.data.data;
        // console.log(userData);
        setFormData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/user/update-user/${userId}`,
        formData
      );
      console.log(response.data.message);
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
      if (
        response.data.status === "ERR" &&
        response.data.message === "The userId is not require"
      ) {
        setIdError("Id không hợp lệ");
      }
      if (response.data.status === "OK") {
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi khi update:", error);
    }
  };
  return (
    <div className="form_Update_Container">
      {/* <ErroMessageComponents message={idError} /> */}
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
        {/* <ErroMessageComponents message={error} /> */}
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
        {/* <ErroMessageComponents message={emailError} /> */}

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUserComponents;
