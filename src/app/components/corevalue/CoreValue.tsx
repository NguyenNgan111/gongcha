import React from "react";

const CoreValue = () => {
  return (
    <div style={{ background: "rgb(248, 229, 222)" }}>
      <section className="max-[992px]:max-w-[735px] w-[955px] min-[1200px]:w-[1185px] mx-auto py-[60px] px-[7.5px]">
        <h3 className="uppercase text-[25px] text-[#b81f32] mt-[22px] mb-8 text-center">
          our core value
        </h3>
        <div className="grid grid-cols-3">
          <div className="flex flex-col">
            <div className="bg-[#fff] rounded-full w-[220px] h-[220px] flex justify-center items-center drop-shadow-lg self-center">
              <img
                src="https://gongcha.com.vn/wp-content/uploads/2018/01/icon1.png"
                alt=""
              />
            </div>
            <h3 className="uppercase text-[#b81f32] text-[22px] p-[15px] mt-[22px] mb-[11px] font-semibold text-center">
              1. top quality
            </h3>
            <p className="px-[30px]">
              Safe, hygienic and delicacy. The use of safe, natural and hygienic
              ingredients is Gong Cha’s top priority. The perfect taste of the
              drinks is the next important goal we want to address.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#fff] rounded-full w-[220px] h-[220px] flex justify-center items-center drop-shadow-lg self-center">
              <img
                src="https://gongcha.com.vn/wp-content/uploads/2018/01/icon2.png"
                alt=""
              />
            </div>
            <h3 className="uppercase text-[#b81f32] text-[22px] p-[15px] mt-[22px] mb-[11px] font-semibold text-center">
              2. friendly & professional services
            </h3>
            <p className="px-[30px]">
              Gong Cha always desires to satisfy customers with professional and
              friendly service as well as listening to customers’ contributions
              in order to improve the Gong Cha’s quality.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="bg-[#fff] rounded-full w-[220px] h-[220px] flex justify-center items-center drop-shadow-lg self-center">
              <img
                src="https://gongcha.com.vn/wp-content/uploads/2018/01/icon3.png"
                alt=""
              />
            </div>
            <h3 className="uppercase text-[#b81f32] text-[22px] p-[15px] mt-[22px] mb-[11px] font-semibold text-center">
              3. trusted brands
            </h3>
            <p className="px-[30px]">
              Based on two core foundations, Quality and Service, Gong Cha
              consistently strives to build and maintain a reliable brand image
              in the eyes of customers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoreValue;
