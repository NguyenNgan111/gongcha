"use client";
import Hero from "@/app/components/hero/Hero";
import clsx from "clsx";
import MenuCategory from "@/app/components/menucategory/MenuCategory";
import MenuList from "@/app/components/menulist/MenuList";
export default function NewDrink() {
  return (
    <div>
      <Hero
        title="New Drinks"
        desc="Introducing attractive and varied drinks from Gong Cha"
        url="https://gongcha.com.vn/wp-content/uploads/2020/08/banner-menu-1900-x-335.jpg"
      />
      <MenuCategory catType="year" />
      <MenuList catType="year" />
    </div>
  );
}
