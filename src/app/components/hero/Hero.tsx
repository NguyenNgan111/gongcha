import BreadCrum from "@/components/breadcrum/BreadCrum";
import style from "./Hero.module.scss";
import clsx from "clsx";

export default function Hero({
  title,
  desc,
  url,
}: {
  title: string;
  desc: string;
  url: string;
}) {
  const image = "url(" + url + ")";
  return (
    <section
      data-testid="hero"
      className={clsx(style.hero)}
      style={{ backgroundImage: image }}>
      <div className={`${clsx(style.container)} px-[15px] mx-auto`}>
        <h2 className="mb-[11px] uppercase font-bold text-4xl">{title}</h2>
        <p className="text-[14px]">{desc}</p>
        <BreadCrum title={title} />
      </div>
    </section>
  );
}
