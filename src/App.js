import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPages/AdminPage";
import LoginPage from "./pages/UserPages/LoginPage";
import SignupPage from "./pages/UserPages/SignupPage";
import DetailPage from "./pages/UserPages/DetailPage";
import LoginAdminPage from "./pages/AdminPages/LoginAdminPage";
import CreateUserPage from "./pages/AdminPages/CreateUserPage";
import UpdateUserPage from "./pages/AdminPages/UpdateUserPage";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <Router>
        <Routes>
          <Route path="/" element={<AdminPage />}></Route>
          <Route path="/login_user" element={<LoginPage />}></Route>
          <Route path="/signup_user" element={<SignupPage />}></Route>
          <Route path="/detail_user" element={<DetailPage />}></Route>
          <Route path="/login_admin" element={<LoginAdminPage />}></Route>
          <Route path="/create_user" element={<CreateUserPage />}></Route>
          <Route path="/update_user/:id" element={<UpdateUserPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
