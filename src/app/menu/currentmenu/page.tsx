"use client";
import clsx from "clsx";
import Hero from "@/app/components/hero/Hero";
import { use, useEffect, useState } from "react";
import MenuCategory from "@/app/components/menucategory/MenuCategory";
import MenuList from "@/app/components/menulist/MenuList";

export default function CurrentMenu() {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("http://10.89.84.42:8080/products")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //       setIsLoading(false);
  //     });
  // }, []);
  // if (isLoading) return <p>Loading...</p>;
  return (
    <div className="bg-[rgb(245,238,233)]">
      <Hero
        title="Menu"
        desc="Introducing attractive and varied drinks from Gong Cha"
        url="https://gongcha.com.vn/wp-content/uploads/2020/08/banner-menu-1900-x-335.jpg"
      />
      <MenuCategory catType="cat" />
      <MenuList catType="cat" />
      {/* {products.map((item) => (
        <ol key={item["_id"]}>{item["_id"]}</ol>
      ))} */}
    </div>
  );
}
