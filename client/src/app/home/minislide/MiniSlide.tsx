import React from "react";
import Image from "next/image";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
};

const slideImages = [
  {
    url: "https://gongcha.com.vn/wp-content/uploads/2023/05/799x500-01.jpg",
    caption: "Slide 1",
  },
  {
    url: "https://gongcha.com.vn/wp-content/uploads/2023/06/799x500px-01.jpg",
    caption: "Slide 2",
  },
];

const MiniSlide = () => {
  return (
    <section className="max-[992px]:max-w-[735px] w-[955px] min-[1200px]:w-[1185px] mx-auto">
      <div className="flex flex-col min-[768px]:flex-row w-full">
        <img
          src="https://gongcha.com.vn/wp-content/uploads/2017/12/banner-6-buoc-395x494.jpg"
          alt="banner logo"
          className="w-full max-w-[395px] min-[768px]:w-1/3 block"
        />
        <div className="slide-container w-full min-[768px]:w-2/3 block">
          <Slide>
            {slideImages.map((slideImage, index) => (
              <div key={index}>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${slideImage.url})`,
                  }}></div>
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default MiniSlide;
