"use client";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import clsx from "clsx";
import style from "./header.module.scss";
import TopHeader from "./topHeader/page";
import { menu } from "@/data/menu";
import { useState } from "react";
import SideBar from "../sidebar/SideBar";

export default function Header() {
  const [toggleSideBar, setToggleSideBar] = useState(false);

  return (
    <>
      {/* Screen width >= 1060px navbar */}
      <section className={clsx(style.header, "hidden min-[1060px]:block")}>
        <TopHeader />
        <section className="flex">
          <section className="logo h-20 w-20">
            <Link href="/" className="block w-full h-full">
              <img
                className="object-contain w-full h-full"
                src="https://gongcha.com.vn/wp-content/uploads/2018/03/Untitled-4.png"
              />
            </Link>
          </section>
          <section className={clsx(style.menu, "grow")}>
            <ul className="flex flex-row h-full" data-testid="desktop_nav">
              {menu.map((item, index) => {
                return (
                  <li key={index}>
                    <Link href={item.path}>{item.name}</Link>
                    {item.drop.length ? (
                      <div className={clsx(style.headerDrop)}>
                        <ul>
                          {item.drop?.map((subItem, subIndex) => {
                            return (
                              <li key={subIndex}>
                                <Link href={subItem.path}>{subItem.title}</Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : (
                      <></>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
          <section className={clsx(style.search)}>
            <div className={clsx(style.iconSearch)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-7" />
            </div>
            <div className={clsx(style.inputSearch)}>
              <input type="text" placeholder="Search here..." />
            </div>
          </section>
        </section>
      </section>
      {/* Sidebar for mobile */}
      <section
        className={clsx(
          style.mobileHeader,
          "w-full fixed top-0 px-[15px] z-[10]"
        )}>
        <div className="flex justify-between items-center max-w-[720px] mx-auto">
          <Link href="/">
            <img
              src="https://gongcha.com.vn/wp-content/uploads/2018/03/Untitled-4.png"
              alt="logo"
              width={53.75}
              height={70}
              className="my-[10px]"
            />
          </Link>
          <div className="p-1 px-[7px] rounded-sm bg-[rgb(184,31,50)]">
            <FontAwesomeIcon
              icon={faBars}
              className="font-[18px] cursor-pointer text-white"
              onClick={() => setToggleSideBar((prev) => !prev)}
              data-testid="menu_icon"
            />
          </div>
        </div>
      </section>
      <SideBar
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
      />
    </>
  );
}
