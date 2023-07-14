import style from "./address.module.scss";
import clsx from "clsx";
const image =
  "http://gongcha.com.vn/wp-content/uploads/2018/03/Banner-Trang-Ch%E1%BB%A7-k%E1%BA%BF-%C4%91%E1%BB%8Ba-ch%E1%BB%89-CH-800x380-01.jpg";
const locationList = [
  { id: 0, name: "Chọn Tỉnh/Thành" },
  { id: 1, name: "Sóc Trăng" },
  { id: 2, name: "Nha Trang" },
  { id: 3, name: "Đà Lạt" },
  { id: 4, name: "Kiên Giang" },
  { id: 5, name: "Hồ Chí Minh" },
  { id: 6, name: "Hà Nội" },
  { id: 7, name: "Đà Nẵng" },
  { id: 8, name: "Bình Dương" },
  { id: 9, name: "Biên Hòa" },
  { id: 10, name: "Cần Thơ" },
  { id: 11, name: "Huế" },
  { id: 12, name: "Mỹ Tho" },
  { id: 13, name: "Vũng Tàu" },
  { id: 14, name: "Thanh Hóa" },
];
export default function Address() {
  return (
    <section
      className={clsx(
        style.address,
        "max-[992px]:max-w-[735px] w-[955px] min-[1200px]:w-[1185px]"
      )}>
      <section className={clsx("flex flex-col-reverse min-[992px]:flex-row ")}>
        <div className={clsx("min-[992px]:basis-8/12", style.left)}>
          <img src={image} alt="" />
        </div>
        <div className={clsx("min-[992px]:basis-4/12 p-[30px]", style.right)}>
          <form
            id="location-form"
            action="cua-hang/"
            method="get"
            className="w-full">
            <div id="heading-form">
              <h3 className="mb-[11px] text-[24px] font-bold">
                Địa chỉ cửa hàng
              </h3>
              <p className="pr-[50px] mb-[11px]">
                Hãy chọn thành phố bạn đang sống, Gong Cha sẽ hiển thị danh sách
                các cửa hàng trong khu vực
              </p>
            </div>
            <div className="body-form mb-[30px]">
              <div className="form-group border-1 border-black border-solid">
                <select name="city" className="form-control pt-[6px] py-[12px] w-full leading-10 focus:ring-2 focus:rounded-sm focus:drop-shadow-sm focus:border-none" id="">
                  {locationList?.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button
              title=""
              name="submit"
              value="search"
              type="submit"
              className="btn btn-primary btn-block w-[100%] text-center border-1 text-white bg-[rgb(184,31,50)] py-[6px] px-[12px] font-semibold leading-10">
              TÌM CỬA HÀNG
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}
