"use client";
import "antd/dist/antd.css";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Popconfirm, Space, Table, message } from "antd";
import React, { ReactNode, useEffect } from "react";
import clsx from "clsx";
import styles from "./page.module.scss";
import CallAPI from "@/app/common/callAPI";
import { useState } from "react";

const User: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await CallAPI(`http://10.89.84.42:8080/user`, "GET", null);
        setUsers(res.data);
      } catch (error) {
      }
    }
    fetchData();
  }, []);

  //show product

  const columns = [
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Role",
      key: "role",
      render: (
        _: any,
        record: {
          role: ReactNode;
        }
      ) => (
        <Space size="middle">
          <select
            name="role"
            id="role"
            onChange={(e) => {
              const userID = (record as any)._id;
              messageApi.info("Role changed");
              setRole(e?.target?.value);
              const userRole = {
                userID: userID,
                role: role,
              };
              async function changeRole() {
                try {
                  const res = await CallAPI(
                    `http://10.89.84.42:8080/user/role`,
                    "PUT",
                    userRole
                  );
                  setUsers(res.data);
                } catch (err: any) {
                  if (err?.response?.status === 403) {
                    messageApi.error("403 Forbidden");
                  }
                }
              }
              changeRole();
            }}
          >
            <option
              selected={record.role === "admin" ? true : false}
              value="admin"
            >
              Admin
            </option>
            <option
              selected={record.role === "user" ? true : false}
              value="user"
            >
              User
            </option>
          </select>
        </Space>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_: any, record: {}) => (
        <Space size="middle">
          <Popconfirm
            title="Delete user?"
            onConfirm={(e) => {
              const productID = {
                idProduct: (record as any)._id,
              };
              try {
                CallAPI(
                  `http://10.89.84.42:8080/users`,
                  "DELETE",
                  productID
                );
                const index = users.findIndex(
                  (item) => (item as any).id === (record as any)._id
                );
                users.splice(index, 1);
                messageApi.success("Deleted");
              } catch (err: any) {
                if (err?.response?.status === 403) {
                  messageApi.info("403 Forbidden");
                }
              }
            }}
            okText="Delete"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={clsx(styles.Product)}>
      <>
        {contextHolder}
        <Breadcrumb>
          <Breadcrumb.Item href="../admin">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>User</Breadcrumb.Item>
        </Breadcrumb>

        <div className={clsx(styles.Table)}>
          <Table
            className="table-wrapper"
            columns={columns}
            dataSource={users}
            rowKey="Id"
            pagination={{
              current: page,
              pageSize: limit,
              onChange: (page, limit) => {
                setPage(page);
                setLimit(limit);
              },
            }}
          ></Table>
        </div>
      </>
    </div>
  );
};

export default User;
