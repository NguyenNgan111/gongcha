import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import clsx from "clsx";
import style from "./slideMain.module.scss";
const imageSlideList = [
  "http://gongcha.com.vn/wp-content/uploads/2023/06/Cover-web_rainbow-01-scaled.jpg",
  "http://gongcha.com.vn/wp-content/uploads/2023/05/cover-web-Dao-Hoang-Kim-01-scaled.jpg",
];
export default function SlideMain() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className={clsx(style.slideMain)} style={{ background: "#fff" }}>
      <Slider {...settings}>
        {imageSlideList?.map((item, index) => {
          return (
            <div key={index}>
              <img src={item} />
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
