"use client";
import "antd/dist/antd.css";
import {
  BellFilled,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import styles from "./layout.module.scss";
import CallAPI from "../common/callAPI";
import { AxiosError } from "axios";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/admin", <PieChartOutlined />),
  getItem("Product", "/admin/product", <DesktopOutlined />),
  getItem("User", "/admin/user", <UserOutlined />),
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const changeRoute = (info: { key: any }) => {
    const menuKey = info.key;
    router.replace(menuKey);
  };

  useEffect(() => {
    async function checkToken() {
      try {
        const res = await CallAPI(
          `http://10.89.84.42:8080/admin/token`,
          "GET",
          null
        );
      } catch (err: any) {
        if (err?.response?.status === 401) {
          router.replace("/401");
        }
      }
    }
    checkToken();
  }, []);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          data-testid="sider"
        >
          <center>
            <img
              src="https://gongcha.com.vn/wp-content/uploads/2018/03/Untitled-4.png"
              alt="Gong cha icon"
              height={100}
              style={{ padding: 0, color: "red" }}
            />
          </center>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            data-testid="menu"
            onClick={changeRoute}
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className={clsx(styles.Product)}
            style={{ padding: 0, color: "gray", fontSize: "25px", height: 104 }}
          >
            <BellFilled style={{ float: "right" }} />
            <BellFilled style={{ float: "right" }} />
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Admin</Footer>
        </Layout>
      </Layout>
    </>
  );
}
