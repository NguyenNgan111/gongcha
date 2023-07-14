"use client";
import { products } from "@/data/products";
import Hero from "@/app/components/hero/Hero";
import clsx from "clsx";
import style from "./page.module.scss";

export default function Page({ params }: { params: { id: number } }) {
  let index = params.id;
  const { name, description, discount, type, url, category, year } =
    products[index];
  return (
    <div>
      <Hero
        title={name}
        desc=""
        url="http://gongcha.com.vn/wp-content/uploads/2018/08/banner-web-trong_FN-01.jpg"
      />
      <div className="py-[50px]">
        <div
          className={`px-[15px] ${clsx(
            style.container
          )} mx-auto flex flex-col`}>
          <h2 className="mt-[22px] mb-[11px] text-[25px]">{name}</h2>
          <img src={url} alt={name} className="self-center" />
          <table className="table-auto w-full text-center">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Price (VND)</th>
              </tr>
              <tr>
                <td rowSpan={3}>{name}</td>
              </tr>
              {type.map((item, index) => (
                <tr key={index}>
                  <td>{item.size}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
