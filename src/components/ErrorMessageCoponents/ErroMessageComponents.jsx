import React from "react";
import "./ErrorMessage.css"; // File CSS cho thông báo lỗi

const ErroMessageComponents = ({ message }) => {
  return <div className="error-message">{message && <p>{message}</p>}</div>;
};
export default ErroMessageComponents;
