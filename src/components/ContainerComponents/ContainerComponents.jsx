import React from "react";
import "./Container.css";
import axios from "axios";
import { useEffect, useState } from "react";
import axiosClient from "~/api/axiosClient";
import ExpiredSessionAdminComponent from "../ExpiredSessionAdminComponents/ExpiredSessionAdminComponent";

const ContainerComponents = () => {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalUserList, setOriginalUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [searchResult, setSearchResult] = useState([]);

  //Lấy accessToken từ LocalStorage
  const accessToken = localStorage.getItem("accessToken");
  console.log("access_detail", accessToken);

  const fetchUserList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/user/getAll");
      setOriginalUserList(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/user/delete-user/${userId}`
      );
      const updatedList = userList.filter((user) => user._id !== userId);
      setUserList(updatedList);
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/user/get-search?searchTerm=${searchTerm}`
      );
      setSearchResult(response.data.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  const resetSearchResults = () => {
    setSearchTerm("");
    setSearchResult([]);
    setCurrentPage(1);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      handleSearch();
    } else {
      resetSearchResults();
    }
  };

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const dataToFetch = searchTerm ? searchResult : originalUserList;
      const startIndex = (page - 1) * 5;
      const paginatedData = dataToFetch.slice(startIndex, startIndex + 5);
      setUserList(paginatedData);
      setHasMoreData(dataToFetch.length > startIndex + 5);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (hasMoreData) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, searchResult, originalUserList]);
  // Other handlers and components.. };
  return (
    <div className="container">
      <div className="container_wrapper">
        <div className="container_wrapper_functions">
          <form onSubmit={handleSubmit}>
            <div className="search-container">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={handleChange} // Gắn sự kiện onChange
              />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
          <a
            href="http://localhost:3000/create_user"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="button_add">
              <i className="fa-solid fa-plus"></i>
              Tạo mới khách hàng
            </button>
          </a>
        </div>
        <div className="container_wrapper_content">
          <table className="table_getAll_user">
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Username</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Permission</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 ? (
                userList.map((user) => (
                  <tr key={user._id}>
                    <td>{user.fullname}</td>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.permission}</td>
                    <td>
                      <a
                        href={`http://localhost:3000/update_user/${user._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button>Edit</button>
                      </a>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Không có kết quả phù hợp</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination controls */}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button onClick={handleNextPage} disabled={!hasMoreData}>
              Next Page
            </button>
          </div>
        </div>
      </div>
      <ExpiredSessionAdminComponent />
    </div>
  );
};

export default ContainerComponents;
