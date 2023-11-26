import React from "react";
import "./ErrorMessageAdmin.css"; // File CSS cho thông báo lỗi

const ErroMessageAdminComponents = ({ message }) => {
  return (
    <div className="error-message-admin">{message && <p>{message}</p>}</div>
  );
};
export default ErroMessageAdminComponents;
