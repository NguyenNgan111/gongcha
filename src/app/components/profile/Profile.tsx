"use client";
import React, { useState } from "react";
import style from "./Profile.module.scss";
import {
  ShoppingOutlined,
  UserOutlined,
  HomeOutlined,
  CreditCardOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import clsx from "clsx";
import YourInfo from "./profilecomponents/YourInfo";
import Addresses from "./profilecomponents/Addresses";
import Orders from "./profilecomponents/Orders";
import Payments from "./profilecomponents/Payments";
import Wishlist from "./profilecomponents/Wishlist";

const { Header, Content, Footer, Sider } = Layout;

const sideBarContent = [
  { key: 1, label: "Your Info", icon: React.createElement(UserOutlined) },
  { key: 2, label: "Orders", icon: React.createElement(ShoppingOutlined) },
  { key: 3, label: "Addresses", icon: React.createElement(HomeOutlined) },
  { key: 4, label: "Payments", icon: React.createElement(CreditCardOutlined) },
  { key: 5, label: "Wishlist", icon: React.createElement(BookOutlined) },
];

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState("1");
  const [editPW, setEditPW] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="w-full">
      <Layout className={clsx(style.container, "bg-orange-300")}>
        <Sider collapsible={false} width="250px">
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={activeIndex}
            items={sideBarContent}
            onClick={(e: any) => setActiveIndex(e.key)}
            className="text-[16px] font-semibold bg-[#b91f32] py-8 text-white"
          />
        </Sider>
        <Layout>
          <Content>
            <div
              style={{
                padding: 24,
                minHeight: 660,
                background: colorBgContainer,
              }}>
              {activeIndex === "1" && (
                <YourInfo editPW={editPW} setEditPW={setEditPW} />
              )}
              {activeIndex === "2" && <Orders />}
              {activeIndex === "3" && <Addresses />}
              {activeIndex === "4" && <Payments />}
              {activeIndex === "5" && <Wishlist />}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
