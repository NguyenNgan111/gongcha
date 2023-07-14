import style from "./PromoInfo.module.scss";
import clsx from "clsx";

const PromoInfo = () => {
  return (
    <section className="max-[992px]:max-w-[735px] w-[955px] min-[1200px]:w-[1185px] mx-auto grid grid-cols-3">
      <div className="p-5 bg-[#FFECAF]">
        <div className={clsx(style.heading)}>
          <h3 className="text-[#b82031] text-[36px] pt-[25px] mb-[11px]">
            Promotion
          </h3>
        </div>
        <div>
          <p className="mt-[22px] mb-[11px] text-[23px]">
            Discover our newest promotions this month
          </p>
          <hr className="my-[30px] w-[150px] border-[#000]" />
          <p>
            Welcome to Gong Cha Milk Tea, explore our promotions and offers in
            this month.
          </p>
        </div>
      </div>
      <div>
        <img
          src="https://gongcha.com.vn/wp-content/uploads/2018/04/delivery-2.png"
          alt=""
        />
        <div className="py-[20px] px-[25px]">
          <a href="">
            <h3 className="text-[23px] text-[#b81f32] font-semibold">
              Golden Wednesday at Gongcha
            </h3>
          </a>
          <p>
            Receive 20% discount when placing order via Hotline at select
            Gongcha store every Wednesday
          </p>
        </div>
      </div>
      <div>
        <img
          src="https://gongcha.com.vn/wp-content/uploads/2018/04/Hoian-opening-380x280.jpg"
          alt=""
        />
        <div className="py-[20px] px-[25px] min-h-[180px]">
          <a href="">
            <h3 className="text-[23px] text-[#b81f32] font-semibold">
              20% Off on Grand Opening Day
            </h3>
          </a>
          <p>First grand opening of Gongcha store in Hoi An Ancient town</p>
        </div>
      </div>
    </section>
  );
};

export default PromoInfo;
