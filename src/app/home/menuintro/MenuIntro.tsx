"use client";
import { useState } from "react";

const data = [
  {
    title: "Gong Cha Signature Drink",
    desc: "The signature series is the combination of brewed tea and milk foam with slightly salty taste, which creates an amazing enjoyment in every cups of Gong Cha.",
  },
  {
    title: "Brewed Tea Series",
    desc: "Gong Cha Brewed Tea ingredients are directly imported from Taiwan. Enjoy our Brewed Tea within 4 hours to ensure the best flavor and perfect quality.",
  },
  {
    title: "Milk Tea Series",
    desc: "One of the outstanding series with lots of creative ways to mix and match. With some highly recommended drinks which are 3J Oolong Milk Tea, Milk Tea with Pudding & Red Bean, you can enjoy high-quality milk tea combined with various toppings that are iconic in Taiwanese milk tea culture.",
  },
  {
    title: "Smoothie Series",
    desc: "“Freeze and Sweet!” – That’s how Gong Cha Smoothie can refresh your day.",
  },
  {
    title: "Creative Series",
    desc: "A combination of tea and fresh fruit flavor.",
  },
];

const MenuIntro = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeClass = "border-b-[2px] border-b-[#b81f32] text-[#b81f32]";
  return (
    <div style={{ background: "rgb(245, 238, 232)" }}>
      <section className="max-[992px]:max-w-[735px] w-[955px] min-[1200px]:w-[1185px] mx-auto flex py-[40px]">
        <div className="w-[40%] px-[7.5px]">
          <h3 className="mt-[22px] mb-[11px] text-[23px]">
            The secret to a perfect cup of tea
          </h3>
          <img
            src="https://gongcha.com.vn/wp-content/uploads/2017/12/ly-tra.png"
            alt=""
            className="max-h-[310px]"
          />
        </div>
        <div className="w-[60%] text-[#333]">
          <ul className="w-full list-none">
            {data.map((item, index) => (
              <li
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`inline-block py-[14px] px-[4px] border-[3px] border-transparent hover:border-b-[2px] hover:border-b-[#b81f32] hover:text-[#b81f32] cursor-pointer ${
                  index === activeIndex && activeClass
                }`}>
                {item.title}
              </li>
            ))}
          </ul>
          <div className="py-[14px] px-[4px] border-transparent border-[3px]">
            <h3 className="text-[23px] text-[#b81f32]">
              {data[activeIndex].title}
            </h3>
            <p className="text-[14px] leading-7">{data[activeIndex].desc}</p>
            <button
              type="button"
              className="uppercase mt-[30px] py-[10px] px-[50px] border-[#b81f32] border-[2px] font-semibold text-[#b81f32]">
              menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuIntro;
