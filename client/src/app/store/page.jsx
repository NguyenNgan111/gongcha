"use client";
import Hero from "../components/hero/Hero";
import clsx from "clsx";
import withAuth from "../components/withAuth";
import EStore from "../components/estore/page";
function Store() {
  return (
    <div>
      <Hero
        title="Online Store"
        desc="Order your favorites"
        url="https://gongcha.com.vn/wp-content/uploads/2018/03/GC-Web-1900x335.jpg"
      />
      <EStore />
    </div>
  );
}
export default withAuth(Store);
