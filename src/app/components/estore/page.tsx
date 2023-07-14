import clsx from "clsx";
import style from "./page.module.scss";
import { IProduct } from "@/store/products/productTypes";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProductsRequest } from "@/store/products/productsAction";

const EStore = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const dispatch = useAppDispatch();
  const { pending, error, products } = useAppSelector(
    (state) => state.products
  );
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const getProducts = async () => {
      await dispatch(fetchProductsRequest());
      await setData(products);
    };
    getProducts();
  }, []);

  if (pending) return <div className={clsx(style.container)}>Loading...</div>;
  if (error) {
    return (
      <div className={clsx(style.container)}>
        Error loading product. Please refresh the page.
      </div>
    );
  }
  console.log(data);

  return (
    <div
      className={clsx(
        style.container,
        "flex flex-wrap justify-center items-center text-[16px]"
      )}>
      {data.map((item) => (
        <div
          key={item.id}
          className="px-8 py-8 bg-slate-100 m-2 flex items-center flex-col rounded-md">
          <img
            src={item.url}
            alt={item.name}
            width="150px"
            className="bg-white"
          />
          <div>
            <h3 className="font-semibold text-[18px]">{item.name}</h3>
            <div className="text-center">
              <label htmlFor="" className="mr-2">
                Choose a size:
              </label>
              <select name="" id="" ref={selectRef}>
                {item.type.map((singleItem) => (
                  <option
                    value={singleItem.size}
                    className="flex justify-between">
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
                (singleSize) => singleSize.size === selectRef?.current?.value
              )
              .map((item) => (
                <span>{item.price}</span>
              ))}
          </h4>
          <button
            type="button"
            className="bg-white rounded-sm py-2 px-4 mt-4 hover:bg-orange-200">
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default EStore;
