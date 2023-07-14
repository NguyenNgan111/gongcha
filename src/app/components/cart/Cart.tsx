"use client";
import { products } from "@/data/products";
import { cart } from "@/data/cart";
import style from "./Cart.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      axios({
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
        url: "http://10.89.84.42:8080/cart",
      })
        .then((res) => {
          setCart(res.data.cartList);
          console.log(res.data.cartList);
        })
        .catch((error) => {});
    };
    fetchCart();
  }, []);

  const handleDeleteCartItem = async (id: string) => {
    const token = localStorage.getItem("token");
    await axios({
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
      url: "http://10.89.84.42:8080/cart",
      data: {
        idProduct: id,
      },
    })
      .then((res) => {})
      .catch((error) => {});
  };

  return (
    <div className="absolute top-[100%] right-0 bg-[#fff] z-40 w-[400px] min-h-[200px] max-h-[400px] overflow-y-auto border border-solid">
      <div className={clsx(style.cart)}>
        <ul className={clsx(style.list)}>
          {cart ? (
            cart.map((cartItem: any) => (
              <li className={clsx(style.item)} key={cartItem._id}>
                <Link href="/product/1" className={clsx(style.productLink)}>
                  <img
                    className={clsx(style.img)}
                    src={cartItem.idProduct.url}
                  />
                  <div className={clsx(style.content)}>
                    <h4 className={clsx(style.name)}>
                      {cartItem.idProduct.name}
                    </h4>
                    <span className={clsx(style.price)}>50000đ</span>
                    <div className={clsx(style.quantityHandle)}>
                      <span>+</span>
                      <span>{cartItem.quantity}</span>
                      <span>-</span>
                    </div>
                  </div>
                  <div className={clsx(style.totalPrice)}>
                    <span>100000đ</span>
                  </div>
                  <div
                    className={clsx(style.remove)}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      console.log(cartItem.idProduct);

                      handleDeleteCartItem(cartItem.idProduct._id);
                    }}>
                    <span>X</span>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <div className="text-center font-semibold">Empty Cart</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
