import style from "./SideBar.module.scss";
import clsx from "clsx";
import { menu } from "@/data/menu";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { signOut } from "@/store/user/login/loginAction";

const SideBar = ({
  toggleSideBar,
  setToggleSideBar,
}: {
  toggleSideBar: boolean;
  setToggleSideBar: any;
}) => {
  const dispatch = useAppDispatch();
  const { successful } = useAppSelector((state) => state.user);
  return (
    <section
      className={clsx(
        toggleSideBar ? style.show : style.hide,
        style.sidebar,
        "h-screen bg-[#b81f32] fixed top-0 z-[9999]"
      )}>
      <ul className="list-none p-[20px] w-full">
        {menu.map((item, index) => (
          <Link href={item.path} key={index}>
            <li
              className="text-white py-[7px] text-[16px] border-b border-[rgbl(255,255,255,0.5)]"
              onClick={() => setToggleSideBar(false)}>
              {item.name}
            </li>
          </Link>
        ))}
        {!successful ? (
          <Link href="/account/login" onClick={() => setToggleSideBar(false)}>
            <li className="text-white py-[7px] text-[16px] border-b border-[rgbl(255,255,255,0.5)]">
              Sign In
            </li>
          </Link>
        ) : (
          <Link
            href="/account/login"
            onClick={() => {
              setToggleSideBar(false);
              dispatch(signOut());
            }}>
            <li className="text-white py-[7px] text-[16px] border-b border-[rgbl(255,255,255,0.5)]">
              Sign Out
            </li>
          </Link>
        )}
      </ul>
    </section>
  );
};

export default SideBar;
