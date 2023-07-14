"use client";
import { IProduct } from "@/store/products/productTypes";
import Hero from "../components/hero/Hero";
import { fetchProductsRequest } from "@/store/products/productsAction";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useState, useEffect } from "react";
import Profile from "../components/profile/Profile";
import withAuth from "../components/withAuth";
import React from "react";

function User() {
  const [data, setData] = useState<IProduct[]>([]);
  const dispatch = useAppDispatch();
  const { pending, error, products } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    const getProducts = async () => {
      await dispatch(fetchProductsRequest());
      await setData(products);
    };
    getProducts();
  }, []);

  return (
    <div>
      <Hero
        title="Profile"
        desc=""
        url="https://gongcha.com.vn/wp-content/uploads/2018/03/bannertuyendung.jpg"
      />
      <Profile />
      {/* <div>
        {products?.map((product, index) => (
          <li key={index}>{product.name}</li>
        ))}
      </div> */}
    </div>
  );
}

export default withAuth(User);
