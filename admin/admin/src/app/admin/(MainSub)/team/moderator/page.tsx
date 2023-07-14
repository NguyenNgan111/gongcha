"use client";
import "antd/dist/antd.css";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";

const Moderator: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="../admin">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Moderators</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Moderator;
