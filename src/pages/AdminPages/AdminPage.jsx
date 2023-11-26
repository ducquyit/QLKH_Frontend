// import React from "react";
import React from "react";

import { Row, Col } from "antd";
import HeaderComponents from "~/components/HeaderComponents/HeaderComponents";
import SidebarComponents from "~/components/SidebarComponents/SidebarComponents";
import ContainerComponents from "~/components/ContainerComponents/ContainerComponents";
// import CreateUserComponents from "~/components/CreateUserComponents/CreateUserComponents";
import "~/index.css";

const AdminPage = () => {
  return (
    <div style={{ height: "100%" }} className="container">
      <HeaderComponents></HeaderComponents>
      <Row className="row_admin">
        <Col span={4}>
          <SidebarComponents></SidebarComponents>
        </Col>
        <Col span={20}>
          <ContainerComponents></ContainerComponents>
          {/* <Route path="/" component={ContainerComponents} />
          <Route path="/create-user" component={CreateUserComponents} /> */}
        </Col>
      </Row>
    </div>
  );
};

export default AdminPage;
