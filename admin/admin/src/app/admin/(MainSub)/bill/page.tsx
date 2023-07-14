"use client";
import "antd/dist/antd.css";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";

const Bill: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="../admin">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Bill;
