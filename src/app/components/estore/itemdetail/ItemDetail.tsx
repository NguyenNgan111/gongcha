"use client";
import { useRef } from "react";

const ItemDetail = (item: any) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div
      key={item.id}
      className="px-8 py-8 bg-slate-100 m-2 flex items-center flex-col rounded-md">
      <img src={item.url} alt={item.name} width="150px" className="bg-white" />
      <div>
        <h3 className="font-semibold text-[18px]">{item.name}</h3>
        <div className="text-center">
          <label htmlFor="" className="mr-2">
            Choose a size:
          </label>
          <select name="" id="" ref={selectRef}>
            {item.type.map((singleItem: any) => (
              <option value={singleItem.size} className="flex justify-between">
                {singleItem.size}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h4>
        Price:{" "}
        {item.type
          .filter(
            (singleSize: any) => singleSize.size === selectRef?.current?.value
          )
          .map((item: any) => (
            <span>{item.price}</span>
          ))}
      </h4>
      <button
        type="button"
        className="bg-white rounded-sm py-2 px-4 mt-4 hover:bg-orange-200">
        Add To Cart
      </button>
    </div>
  );
};

export default ItemDetail;
