"use client";
import { CloseOutlined, DropboxOutlined } from "@ant-design/icons";
import { Button, Input, Modal, message } from "antd";
import "antd/dist/antd.css";
import clsx from "clsx";
import { use, useEffect, useState } from "react";
import styles from "./page.module.scss";
import TextArea from "antd/lib/input/TextArea";
import CallAPI from "@/app/common/callAPI";

const Create: React.FC = () => {
  const [itemSize, setItemSize] = useState("M");
  const [itemPrice, setItemPrice] = useState("");
  const [itemTypes, setItemTypes] = useState<any[]>([]);
  const [disable, setDisable] = useState(true);
  const [itemDetail, setItemDetail] = useState({
    name: "",
    description: "",
    discount: "",
    year: "",
    category: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (
      itemDetail.name === "" ||
      itemDetail.description === "" ||
      itemDetail.discount === "" ||
      itemDetail.year === "" ||
      itemDetail.category === "" ||
      itemTypes.length === 0
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [itemDetail, itemTypes.length]);

  const handleChange = (key: any, value: any) => {
    setItemDetail((pre: any) => {
      return { ...pre, [key]: value };
    });
  };

  const handleOk = (size: string, price: string) => {
    const itemType = {
      id: itemTypes.length + 1,
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

  const deleteType = (id: any) => {
    const index = itemTypes.findIndex((item) => item.id === id);
    itemTypes.splice(index, 1);
    setItemTypes([...itemTypes]);
  };

  const lists = itemTypes.map((type) => {
    return (
      <li key={type.id}>
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
        `http://10.89.84.42:8080/admin/products`,
        "POST",
        FinalItem
      );
      messageApi.info('Item created');
    } catch (error) {}
  };

  return (
    <div className={clsx(styles.Form)}>
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
      <span>
        <DropboxOutlined /> Item name: <br />
        <Input
          type="text"
          style={{ width: 200 }}
          maxLength={30}
          allowClear
          onChange={(e) => {
            handleChange("name", e.target.value);
          }}
        />
      </span>
      <br />
      Item types: <br />
      <Button onClick={showModal}>Add item type</Button>
      <div>
        <ul className={clsx(styles.wrapTypes)}>{lists}</ul>
      </div>
      <br />
      <span>
        <DropboxOutlined /> Description <br />
        <TextArea
          showCount
          maxLength={100}
          style={{ height: 120, resize: "none", width: 400 }}
          placeholder="Item description"
          onChange={(e) => {
            handleChange("description", e.target.value);
          }}
        />
      </span>
      <br />
      <span>
        <DropboxOutlined /> Discount <br />
        <Input
          type="text"
          style={{ width: 200 }}
          maxLength={30}
          allowClear
          addonAfter="%"
          onChange={(e) => {
            handleChange("discount", e.target.value);
          }}
        />
      </span>
      <br />
      <span>
        <DropboxOutlined /> Year <br />
        <Input
          type="text"
          style={{ width: 200 }}
          maxLength={30}
          allowClear
          onChange={(e) => {
            handleChange("year", e.target.value);
          }}
        />
      </span>
      <br />
      <span>
        <DropboxOutlined /> Category <br />
        <Input
          type="text"
          style={{ width: 200 }}
          maxLength={30}
          allowClear
          onChange={(e) => {
            handleChange("category", e.target.value);
          }}
        />
      </span>
      <center>
        <Button
          style={{ marginTop: 50, width: 100, height: 30 }}
          type="primary"
          onClick={handleSubmit}
          disabled={disable}
        >
          CREATE
        </Button>
      </center>
    </div>
  );
};

export default Create;
