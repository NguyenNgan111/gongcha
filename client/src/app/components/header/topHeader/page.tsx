"use client";
import clsx from "clsx";
import style from "./topHeader.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cart from "../../cart/Cart";
import store, { useAppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store";
import { signOut } from "@/store/user/login/loginAction";
export default function TopHeader() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useAppDispatch();
  let { pending, successful } = useAppSelector((store) => store.user);
  // localStorage.getItem("token") ? (successful = true) : false;

  return (
    <section
      className={style.topHeader}
      onMouseLeave={() => setShowCart(false)}>
      <div>
        {!successful ? (
          <div className={clsx(style.account)}>
            <Link href={"/account/login"}>Sign in/ Sign up</Link>
          </div>
        ) : (
          <div className="flex h-full items-center">
            <div className={clsx(style.account)}>
              <Link href={"/account/login"} onClick={() => dispatch(signOut())}>
                Sign Out
              </Link>
            </div>
            <div className={clsx(style.account, "ml-4")}>
              <Link href={"/user"}>Profile</Link>
            </div>
            <Link href="/cart">
              <div
                className={clsx(style.cart)}
                onMouseEnter={() => setShowCart(true)}>
                <span>Cart</span>
              </div>
            </Link>
          </div>
        )}
      </div>
      {showCart && <Cart />}
    </section>
  );
}
