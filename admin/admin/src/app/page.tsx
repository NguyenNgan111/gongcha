"use client";
import "antd/dist/antd.css";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import CallAPI from "./common/callAPI";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import clsx from "clsx";

const Login: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const registForm = {
      phone: user,
      pwd: pwd,
    };
    try {
      const res = await CallAPI(
        `http://10.89.84.42:8080/admin/login`,
        "POST",
        registForm
      );
      localStorage.setItem("token", res.data.accessToken);
      router.replace("/admin");
    } catch (err) {}
  };

  return (
    <div className={clsx(styles.Home)}>
      <div className={clsx(styles.form)}>
        <p>login</p>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              data-testid="username"
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              data-testid="pwd"
              onChange={(e) => setPwd(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            style={{ marginLeft: 198 }}
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button type="primary" data-testid="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
