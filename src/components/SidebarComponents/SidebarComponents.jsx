import React from "react";
import './Sidebar.css';

const SidebarComponents = () => {
    return (
        <div id="sidebar">
            <div className="sidebar_main">
                <div className="sidebar_info_admin">
                    <div className="sidebar_info_image">
                        <img src="https://gaixinh.photo/wp-content/uploads/2022/01/gai-xinh-mac-ao-tre-vai-khoe-nguc.jpg" alt="admin_image" />
                    </div>
                    <span className="sidebar_info_name">Ngô Đức Quý</span>
                </div>
                <hr></hr>
                <div className="sidebar_list">
                    <div className="primary sidebar_list_item">
                        <div className="sidebar_list_item_icon">
                            <i className="primary fa-solid fa-users"></i>
                        </div>
                        <div className="sidebar_list_item_text">
                            <span className="primary sidebar_list_item_text">Quản lý khách hàng</span>
                        </div>       
                    </div>
                    <div className="sidebar_list_item">
                        <div className="sidebar_list_item_icon">
                            <i className="fa-solid fa-user-minus"></i>
                        </div>
                        <div className="sidebar_list_item_text">
                            <span>Quản lý Admin</span>
                        </div>
                    </div>
                    <div className="sidebar_list_item">
                        <div className="sidebar_list_item_icon">
                            <i className="fa-solid fa-shop"></i>
                        </div>
                        <div className="sidebar_list_item_text">
                            <span>Quản lý sản phẩm</span>
                        </div>
                    </div>
                    <div className="sidebar_list_item">
                        <div className="sidebar_list_item_icon">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div className="sidebar_list_item_text">
                            <span>Quản lý đơn hàng</span>
                        </div>
                    </div>
                    <div className="sidebar_list_item">
                        <div className="sidebar_list_item_icon">
                            <i className="fa-solid fa-truck-fast"></i>
                        </div>
                        <div className="sidebar_list_item_text">
                            <span>Báo cáo số lượng</span>
                        </div>
                    </div>    
                    <div className="sidebar_list_item">
                        <div className="sidebar_list_item_icon">
                            <i className="fa-solid fa-person"></i>
                        </div>
                        <div className="sidebar_list_item_text">
                            <span>Quản lý nhân viên</span>
                        </div>
                    </div>
                    <div className="sidebar_list_item">
                        <div className="sidebar_list_item_icon">
                            <i className="fa-brands fa-paypal"></i>
                        </div>
                        <div className="sidebar_list_item_text">
                            <span>Bảng kê lương</span>
                        </div>
                    </div>
                    <div className="sidebar_list_item">
                        <div className="sidebar_list_item_icon">
                            <i className="fa-solid fa-gear"></i>
                        </div>
                        <div className="sidebar_list_item_text">
                            <span>Cài đặt</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarComponents