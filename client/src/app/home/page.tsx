"use client";
import clsx from "clsx";
import style from "./home.module.scss";
import SlideMain from "./slides/slideMain";
import Address from "./address/page";
import MoreInfo from "../components/moreinfo/MoreInfo";
import MiniSlide from "./minislide/MiniSlide";
import ImageLink from "./imagelink/ImageLink";
import PromoInfo from "./promoinfo/PromoInfo";
import MenuIntro from "./menuintro/MenuIntro";

export default function Home() {
  return (
    <section className={clsx(style.home)}>
      <SlideMain />
      <Address />
      <MiniSlide />
      <PromoInfo />
      <MoreInfo />
      <MenuIntro />
      <ImageLink />
      {/* <section>discount slice</section>
      <section>discount poster</section>
      <section>more infomation</section>
      <section>menu nav body</section> */}
    </section>
  );
}
