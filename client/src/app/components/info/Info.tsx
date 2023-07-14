const Info = ({
  url,
  title,
  desc,
  flexPos,
  bgColor,
}: {
  url: string;
  title: string;
  desc: string;
  flexPos: string;
  bgColor: string;
}) => {
  return (
    <div className={`py-[60px] flex justify-center`} style={{ background: bgColor }}>
      <div
        className={`max-w-734px min-[991px]:w-[954px] min-[1200px]:w-[1185px] mx-auto flex flex-col min-[768px]:${flexPos} px-2 min-[768px]:px-0`}>
        <div className="min-[768px]:w-1/2 px-4">
          <h2 className="text-[25px] font-bold uppercase text-[#B81F32]">
            {title}
          </h2>
          <p>{desc}</p>
        </div>
        <div className="min-[768px]:w-1/2">
          <img src={url} alt="brand image" className="mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Info;
