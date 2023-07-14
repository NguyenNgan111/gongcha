import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function BreadCrum({ title }: { title: string }) {
  return (
    <div className="absolute -bottom-5 px-[20px] py-[10px] bg-[#B91F32] text-[14px] text-white">
      <Link href="/">
        <FontAwesomeIcon
          icon={faHome}
          className="text-[#E1939D] cursor-pointer"
        />
      </Link>{" "}
      <FontAwesomeIcon icon={faAngleRight} className="text-[#E1939D]" /> {title}
    </div>
  );
}
