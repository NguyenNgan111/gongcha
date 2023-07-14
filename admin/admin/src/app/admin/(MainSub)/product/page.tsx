"use client";
import "antd/dist/antd.css";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Space, Table, message, Popconfirm } from "antd";
import React, { ReactNode, use, useEffect } from "react";
import clsx from "clsx";
import styles from "./page.module.scss";
import CallAPI from "@/app/common/callAPI";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

const Product: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await CallAPI(
          `http://10.89.84.42:8080/products/admin`,
          "GET",
          null
        );
        setProducts(res.data);
      } catch (error) {}
    }
    fetchData();
  }, []);

  //show product

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Type",
      key: "type",
      render: (
        _: any,
        record: {
          type: any;
          id: any;
          description: ReactNode;
          name: string;
        }
      ) => (
        <Space size="middle">
          {record.type.map((item: any, index: any) => {
            return <p key={index}>Size {record.type[index].size} </p>;
          })}
        </Space>
      ),
    },

    {
      title: "Edit",
      key: "edit",
      render: (
        _: any,
        record: {
          name: ReactNode;
        }
      ) => (
        <Space size="middle">
          <a href={`../admin/product/${(record as any)._id}`}>
            Edit {record.name}
          </a>
          <Popconfirm
            title="Delete product?"
            onConfirm={(e) => {
              const productID = {
                idProduct: (record as any)._id,
              };
              try {
                CallAPI(
                  `http://10.89.84.42:8080/products`,
                  "DELETE",
                  productID
                );
                const index = products.findIndex(
                  (item) => (item as any).id === (record as any)._id
                );
                products.splice(index, 1);
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
          <Breadcrumb.Item>Product</Breadcrumb.Item>
        </Breadcrumb>

        <Button
          data-testid="gotoCreate"
          onClick={(e) => {
            router.replace("/admin/product/create");
          }}
        >
          Add Product
        </Button>

        <div className={clsx(styles.Table)}>
          <Table
            style={{ marginBottom: 0 }}
            className="table-wrapper"
            columns={columns}
            dataSource={products}
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

export default Product;
