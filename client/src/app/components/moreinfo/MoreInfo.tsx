import Link from "next/link";

const MoreInfo = () => {
  return (
    <div className="w-full py-[40px] h-[216px] flex justify-center items-center bg-[url(http://gongcha.com.vn/wp-content/uploads/2018/04/Banner-Tinh-Túy-Trà22.jpg?id=804)]">
      <div className="text-[rgb(184,27,48)] text-center">
        <h2 className="text-[25px]">The purest from the scrumptious tea</h2>
        <Link href="/menu/currentmenu">
          <button className="mt-[30px] py-[10px] px-[50px] font-semibold border-2 border-solid border-[rgb(184,27,48)]">
            MORE INFORMATION
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MoreInfo;
