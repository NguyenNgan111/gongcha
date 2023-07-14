import clsx from "clsx";
import Link from "next/link";
import style from "./footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { menu } from "@/data/menu";

export default function Footer() {
  return (
    <section className={clsx(style.footer, "flex min-[768px]:flex-row flex-col")}>
      <section className={clsx(style.footerLeft, "basis-4/12")}>
        <Link href="/">
          <img
            src="https://gongcha.com.vn/wp-content/themes/theme/images/logo-footer.png"
            alt="Gongcha"
          />
        </Link>
        <p>COPYRIGHT © 2023 GONG CHA VIỆT NAM</p>
      </section>
      <section className={clsx(style.footerRight, "basis-8/12")}>
        <div className={clsx(style.nav)}>
          <ul>
            {menu.slice(1).map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.path}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={clsx(style.mail)}>
          <Link href="#">
            <FontAwesomeIcon
              icon={faEnvelope}
              className={clsx(style.iconMail, "w-5")}
            />
            <p> info@gongcha.com.vn</p>
          </Link>
        </div>
      </section>
    </section>
  );
}
