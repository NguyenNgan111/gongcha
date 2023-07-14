"use client";
import "antd/dist/antd.css";
import {
  AreaChartOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import styles from "./page.module.scss";
import clsx from "clsx";
import { Colors } from "chart.js";
import CallAPI from "../common/callAPI";
import { IOrderItem, IUser } from "./interface";
Chart.register(CategoryScale);
Chart.register(Colors);
Chart.defaults.color = "black";

const Admin: React.FC = () => {
  const [saleData, setSaleData] = useState([]);
  const [generalData, setGeneralData] = useState({});
  const [bestSeller, setBestSeller] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    async function getAdminDate() {
      try {
        const res = await CallAPI(
          `http://10.89.84.42:8080/dashboard`,
          "GET",
          null
        );
        setGeneralData(res.data);
        setSaleData(res.data.chart);
      } catch (err: any) {}
    }
    getAdminDate();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await CallAPI(`http://10.89.84.42:8080/user`, "GET", null);
        console.log("user", res.data);
        setUserData(res.data);
      } catch (error) {}
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await CallAPI(
          `http://10.89.84.42:8080/products`,
          "GET",
          null
        );
        setBestSeller(res.data);
      } catch (error) {}
    }
    fetchProduct();
  }, []);

  const saleDataChart = {
    labels: saleData?.map((item: any) => item?.date),
    datasets: [
      {
        label: "Weekly Total Sale",
        data: saleData?.map((item: any) => item?.sale),
        backgroundColor: "red",
      },
    ],
  };

  const bestSellerChart = {
    labels: bestSeller?.map((item: any) => item?.name),
    datasets: [
      {
        label: "Sale",
        data: bestSeller?.map((item: any) => item?.bought),
        backgroundColor: "red",
      },
    ],
  };

  const userLists = userData.map((user: IUser) => {
    const orderLists = user.order.map((userOrder: IOrderItem) => {
      const detailOrderLists = userOrder.detailOrder.map((userDetailOrder) => {
        return <div key={Math.random()}>{userDetailOrder.idProduct}</div>;
      });
      return (
        <ul key={userOrder.orderNumber}>
          <hr />

          <li>Product ID: {detailOrderLists}</li>
          <li>Date bought: {userOrder.date}</li>
          <br />
        </ul>
      );
    });
    return (
      <div key={Math.random()} className={clsx(styles.wrapUL)}>
        <ul>
          User: {user.phone} <br />
          Number of order: {user.order.length} <br />
        </ul>
        {orderLists}
      </div>
    );
  });

  return (
    <div className={clsx(styles.Admin)}>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin">
          <HomeOutlined />
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className={clsx(styles.wrapReports)}>
        <Col span={5} order={1} style={{ marginRight: 50 }}>
          <AreaChartOutlined /> Total sale <br />
          {(generalData as any).totalPrice}
        </Col>
        <Col span={5} order={2} style={{ marginRight: 50 }}>
          <UserOutlined /> Total visit <br />
          {(generalData as any).views}
        </Col>
        <Col span={5} order={2} style={{ marginRight: 50 }}>
          <TeamOutlined /> Total users <br />
          {userData.length}
        </Col>
      </div>
      <br />
      <div style={{ display: "flex" }}>
        <div className={clsx(styles.wrapCharts)}>
          <div style={{ width: 500 }}>
            <Line data={saleDataChart} />
          </div>
        </div>
        <div className={clsx(styles.wrapCharts)} style={{ marginLeft: 100 }}>
          <div style={{ width: 500 }}>
            <Bar data={bestSellerChart} />
          </div>
        </div>
      </div>
      <h1 style={{ marginTop: 50 }}>Recent orders</h1>
      <div className={clsx(styles.wrapUserOrder)}>{userLists}</div>
    </div>
  );
};

export default Admin;
