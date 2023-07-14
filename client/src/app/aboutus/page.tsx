"use client";
import CoreValue from "../components/corevalue/CoreValue";
import Hero from "../components/hero/Hero";
import Info from "../components/info/Info";
import clsx from "clsx";

export default function AboutUs() {
  return (
    <div>
      <Hero
        title="About us"
        desc="Good Tea - Great Taste"
        url="https://gongcha.com.vn/wp-content/uploads/2018/01/bg-qua-trinh-phat-trien.jpg"
      />
      <Info
        title="Brand Story"
        desc="“Gong Cha” in Chinese means to offer the best tea to the Emperor from all possessions. It represents the highest quality and self-expectation. Established in 2006, Gong cha has been appreciated by its customers, relying on good words of mouth and unique customized services originated in Taiwan.From then on, the story of Gong cha has widely spread, and Gong cha has become one of the best-known quality tea providers in the world. Nowadays, Gong Cha has blossomed in more than 20 regions all over the world."
        url="https://gongcha.com.vn/wp-content/uploads/2018/02/lytra-350x441.png"
        flexPos="flex-row"
        bgColor="rgb(248, 229, 222)"
      />
      <Info
        title="Gong Cha Vietnam"
        desc="Gong Cha was officially put into operation in Vietnam market by Golden Trust Co., Ltd., in  October 11st, 2014. Over five years of operation, Golden Trust Co., Ltd.- the Master of Franchise of Gong Cha in Vietnam, has made the brand grow expeditiously and become one of the most favorite F&B brands for young generation who loves milk tea and has the desire to experience qualified tea products from only selected ingredients."
        url="https://gongcha.com.vn/wp-content/uploads/2018/03/H%C3%ACnh-CH.jpg"
        flexPos="flex-row"
        bgColor="rgb(255, 255, 255)"
      />
      <CoreValue />
    </div>
  );
}
