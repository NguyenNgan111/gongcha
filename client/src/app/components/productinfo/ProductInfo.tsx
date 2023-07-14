import style from "./ProductInfo.module.scss";
import clsx from "clsx";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IProduct {
  name: string;
  description: string[];
  discount: string;
  type: { size: string; price: string }[];
  url: string;
  category: string;
  year: string;
  handleClose: any;
  isOpen: boolean;
}

export default function ProductInfo({
  name,
  description,
  discount,
  type,
  url,
  category,
  year,
  handleClose,
  isOpen,
}: IProduct) {
  return (
    <div className={`${clsx(style.info)} ${!isOpen ? clsx(style.hide) : clsx(style.show)}`}>
      <div className={`flex items-center ${clsx(style.container)}`}>
        <div className="px-[15px] w-1/3 flex flex-col items-center">
          <img src={url} alt={name} className="w-[220px] h-[220px]" />
          <p className="text-center italic">
            * This image is used for representational purpose only
          </p>
        </div>
        <div className="px-[15px] w-2/3">
          <h3 className="mt-[22px] mb-[11px] text-[23px]">
            {name}{" "}
            <span className="text-[14px] text-[#696969] float-right cursor-pointer">
              <FontAwesomeIcon icon={faClose} onClick={() => handleClose(0)} />
            </span>
          </h3>
          <div className="mb-[20px]">
            {description.map((item, index) => (
              <div className="inline-block" key={index}>
                {item.toUpperCase() === "COLD" && (
                  <img
                    src="https://gongcha.com.vn/wp-content/themes/theme/images/ico-cold.png"
                    alt="cold item"
                  />
                )}
                {item.toUpperCase() === "HOT" && (
                  <img
                    src="https://gongcha.com.vn/wp-content/themes/theme/images/ico-hot.png"
                    alt="hot item"
                  />
                )}
              </div>
            ))}
          </div>
          <h3 className="mt-[22px] mb-[11px] text-[23px]">Info</h3>
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
