"use client";
import style from "./MenuCategory.module.scss";
import clsx from "clsx";
import { products } from "@/data/products";
import { useEffect, useState } from "react";

export default function MenuCategory({ catType }: { catType: string }) {
  let getCategory = [""];
  if (catType === "year")
    getCategory = Array.from(new Set(products.map((item) => item.year)));
  if (catType === "cat")
    getCategory = Array.from(new Set(products.map((item) => item.category)));
  return (
    <section>
      <div className={clsx(style.container)}>
        {getCategory.map((category, index) => (
          <li key={index} className="text-base font-semibold">
            <img
              src="https://gongcha.com.vn/wp-content/themes/theme/images/cup-icon.png" className="inline-block mr-[10px]"
              alt=""
            />
            <a href={`#${category}`}>{category}</a>
          </li>
        ))}
      </div>
    </section>
  );
}
