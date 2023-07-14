"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease } from "@/store/products/productsAction";
import { useAppSelector } from "@/store/store";
export default function Counter() {
  const count: number = Number(useAppSelector((state) => state.counter.count));
  const dispatch = useDispatch();
  const handleCount = (inc: boolean) => {
    inc ? dispatch(increase()) : dispatch(decrease());
  };
  return (
    <div>
      <button onClick={() => handleCount(true)}>increase</button>
      <span>{count}</span>
      <button onClick={() => handleCount(false)}>decrease</button>
    </div>
  );
}
