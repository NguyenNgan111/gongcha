"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import Home from "./home/page";
import Account from "./account/login/page";
import clsx from "clsx";
import style from "./page.module.scss";

export default function Page() {
  return (
    <section className={clsx(style.main)}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </section>
  );
}
