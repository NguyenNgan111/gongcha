"use client";
import { Spin } from "antd";
import { FC } from "react";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div >
      <center>
        <Spin />
      </center>
    </div>
  );
};

export default loading;
