"use client";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./page.module.scss";
import { useParams } from "next/navigation";
import { Breadcrumb, Button, Input, Modal, Radio, message } from "antd";
import { CloseOutlined, HomeOutlined } from "@ant-design/icons";
import CallAPI from "@/app/common/callAPI";
import TextArea from "antd/lib/input/TextArea";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState({});
  const [disable, setDisable] = useState(true);
  const [itemTypes, setItemTypes] = useState<any[]>([]);
  const [itemSize, setItemSize] = useState("M");
  const [itemPrice, setItemPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await CallAPI(
          `http://10.89.84.42:8080/products/${id}`,
          "GET",
          null
        );

        setItemDetail(res.data);
        setItemTypes(res.data.type);

      } catch (error) {

      }
    }
    fetchData();
  }, []);

  const deleteType = (id: any) => {
    const index = itemTypes.findIndex((item) => item.id === id);
    itemTypes.splice(index, 1);

    setItemTypes([...itemTypes]);
  };

  const lists = itemTypes?.map((type) => {
    return (
      <li key={type.id + Math.random()}>
        <div className={clsx(styles.liDiv)}>
          <CloseOutlined
            style={{ float: "right" }}
            onClick={(e) => {
              deleteType(type.id);
            }}
          />{" "}
          <br />
          <p>{type.size}</p>
          <p>{type.price}</p>
        </div>
      </li>
    );
  });

  const handleChange = (key: any, value: any) => {
    setDisable(false);
    setItemDetail((pre: any) => {
      return { ...pre, [key]: value };
    });
  };

  const handleOk = (size: string, price: string) => {
    const itemType = {
      id: Math.random(),
      size: size,
      price: price,
    };
    if (itemPrice === "") {
      messageApi.warning("Price is empty");
      return;
    }
    if (itemTypes.find((item) => item.size === itemType.size)) {
      messageApi.warning(`Size ${size} already exist`);
      return;
    }
    itemTypes.push(itemType as never);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const FinalItem = {
      name: (itemDetail as any).name,
      description: (itemDetail as any).description,
      discount: (itemDetail as any).discount,
      category: (itemDetail as any).category,
      year: (itemDetail as any).year,
      type: itemTypes,
    };
    try {
      const res = await CallAPI(
        `http://10.89.84.42:8080/products/${id}`,
        "PUT",
        FinalItem
      );
    } catch (error) {}
  };

  return (
    <div className={clsx(styles.ProductDetail)}>
      <>{contextHolder}</>
      <Modal
        title="Add item type"
        open={isModalOpen}
        onOk={(e) => {
          handleOk(itemSize, itemPrice);
        }}
        onCancel={handleCancel}
      >
        <p>Size:</p>
        <select
          defaultValue={"m"}
          name=""
          id=""
          onChange={(e) => setItemSize(e.target.value)}
        >
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
        <br /> <br />
        <p>Price:</p>
        <Input onChange={(e) => setItemPrice(e.target.value)}></Input>
      </Modal>
      <Breadcrumb>
        <Breadcrumb.Item href="../../admin">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="../product">Product</Breadcrumb.Item>
        <Breadcrumb.Item>{(itemDetail as any).name}</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <div className={clsx(styles.wrapProduct)}>
        <div className={clsx(styles.wrapProductImg)}>
          <center>
            <img
              style={{ marginTop: 50 }}
              src={`${(itemDetail as any).url}`}
              height={500}
            />
          </center>
        </div>

        <div className={clsx(styles.wrapDetail)}>
          <span>Name: </span>
          <input
            type="text"
            defaultValue={(itemDetail as any).name}
            onChange={(e) => {
              handleChange("name", e.target.value);
            }}
          />{" "}
          <br />
          <span>Description: </span> <br />
          <TextArea
            style={{ resize: "none", width: 1000, fontSize: 20, height: 200 }}
            value={(itemDetail as any).description}
            onChange={(e) => {
              handleChange("description", e.target.value);
            }}
          ></TextArea>
          <br />
          <hr />
          <span>Discount: </span>
          <input
            type="text"
            defaultValue={(itemDetail as any).discount}
            onChange={(e) => {
              handleChange("discount", e.target.value);
            }}
          />{" "}
          <br />
          <p>Item types:</p>
          <Button onClick={showModal}>Add item type</Button>
          <ul>{lists}</ul>
          <span>Category: </span>
          <Radio.Group
            defaultValue={(itemDetail as any).category}
            style={{ marginBottom: 5 }}
            onChange={(e) => {
              handleChange("category", e.target.value);
            }}
          >
            <Radio.Button value="cold">Cold</Radio.Button>
            <Radio.Button value="hot">Hot</Radio.Button>
          </Radio.Group>{" "}
          <br />
          <span>Year: </span>
          <input
            defaultValue={(itemDetail as any).year}
            type="text"
            style={{ marginBottom: 5 }}
            onChange={(e) => {
              handleChange("year", e.target.value);
            }}
          />{" "}
        </div>
      </div>

      <center>
        <Button
          style={{ marginTop: 50, width: 100, height: 30 }}
          disabled={disable}
          type="primary"
          onClick={handleSubmit}
        >
          SAVE
        </Button>
      </center>
    </div>
  );
};

export default ProductDetail;
