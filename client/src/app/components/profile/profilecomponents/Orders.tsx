"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Pagination } from "antd";

const pageSize = 3;

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [pagingInfo, setPagingInfo] = useState({
    totalPage: 0,
    current: 1,
    min: 0,
    max: 0,
  });
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");
      axios({
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
        url: "http://10.89.84.42:8080/user/order",
      })
        .then((res) => {
          setOrder(res.data);
          setPagingInfo({
            ...pagingInfo,
            totalPage: res.length / pageSize,
            min: 0,
            max: pageSize,
          });
        })
        .catch((error) => {});
    };
    fetchOrder();
  }, []);
  const handleChange = (page: any) => {
    setPagingInfo({
      ...pagingInfo,
      current: page,
      min: (page - 1) * pageSize,
      max: page * pageSize,
    });
  };

  return (
    <div className="w-full px-8 overflow-hidden">
      {order.map(
        (singleOrder, index) =>
          index >= pagingInfo.min &&
          index < pagingInfo.max && (
            <Link
              key={singleOrder.orderNumber}
              href={`/order/${singleOrder.orderNumber}`}>
              <div className="bg-slate-300 mb-8 py-4 px-3 rounded-md cursor-pointer hover:opacity-75">
                <div className="flex justify-between font-semibold text-[16px]">
                  {" "}
                  <h3>Order number: {singleOrder.orderNumber}</h3>
                  <p>{singleOrder.date}</p>
                </div>
                <div className="flex justify-between">
                  {" "}
                  <h3>Number of items: {singleOrder.detailOrder.length}</h3>
                  <p>Total: {singleOrder.totalPrice.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          )
      )}
      {order.length !== 0 ? (
        <Pagination
          pageSize={pageSize}
          current={pagingInfo.current}
          total={order.length}
          onChange={handleChange}
          className="text-center"
        />
      ) : (
        <div>You currently don't have any order</div>
      )}
    </div>
  );
};

export default Orders;
