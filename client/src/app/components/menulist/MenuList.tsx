import style from "./MenuList.module.scss";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";

import { products } from "@/data/products";
import ProductInfo from "../productinfo/ProductInfo";
import ProducInfoModal from "../productinfomodal/ProductInfoModal";

export default function MenuList({ catType }: { catType: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  let getCategory = [""];
  if (catType === "year")
    getCategory = Array.from(new Set(products.map((item) => item.year)));
  if (catType === "cat")
    getCategory = Array.from(new Set(products.map((item) => item.category)));
  return (
    <div className={clsx(style.container)}>
      {getCategory.map((cat, index) => {
        // let filteredList = products.filter((item) => item.category === cat);
        let filteredList = products;
        if (catType === "year")
          filteredList = products.filter((item) => item.year === cat);
        if (catType === "cat")
          filteredList = products.filter((item) => item.category === cat);
        return (
          <section key={index} className="py-[30px]" id={cat}>
            <div className="w-full text-center py-[10px] uppercase mb-[50px] bg-[rgb(229,222,216)]">
              <h1 className="text-[25px]">{cat}</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3">
              {filteredList.map((product) => (
                <div
                  key={product.id}
                  className={`flex flex-col items-center ${clsx(
                    style.listProduct
                  )}`}>
                  <div
                    className={clsx(style.hoverCircle)}
                    onClick={() => setActiveIndex(product.id)}>
                    <img
                      src={product.url}
                      alt={product.name}
                      className="w-[220px] h-[220px]"
                    />
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-[16px] text-[rgb(184,31,50)]">
                      {product.name}
                    </h3>
                  </Link>

                  <ProductInfo
                    {...product}
                    handleClose={setActiveIndex}
                    isOpen={product.id === activeIndex}
                  />

                  {/* {product.id === activeIndex && (
                    <ProductInfo {...product} handleClose={setActiveIndex}  />
                  )} */}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
