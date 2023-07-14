"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";
import style from "./ScrollToTop.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollToTop() {
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 200) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="p-[5px]">
      {isScrolling && (
        <div className={clsx(style.toTopButton)}>
          <FontAwesomeIcon
            icon={faAngleDoubleUp}
            className={clsx(style.iconStyle)}
            onClick={goToTop}
          />
        </div>
      )}
    </div>
  );
}
