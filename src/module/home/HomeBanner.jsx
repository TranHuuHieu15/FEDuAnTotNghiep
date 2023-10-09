import imgBanner from "/src/assets/images/imagebanner.png";
import eclipBanner from "/src/assets/images/eclipsebanner.png";
const HomeBanner = () => {
  return (
    <div className="inline-flex flex-row w-full">
      <div className="bg-[#1C2333] basis-3/5">
        <div className="flex flex-col items-start p-10 my-32 ml-20 mr-80 gap-14 bg-[#1F2937]">
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-[#FAFAFA] font-semibold text-[56px] not-italic font-eculid">
              Get up to 30% off
              <span className="text-[#F7C59F] block">New Arrivals</span>
            </h1>
            <p className="text-lg font-eculid text-[#F3F4F6] not-italic font-semibold">
              Introducing our latest collection of products
            </p>
          </div>
          <button className="gap-4 px-4 py-3 border">
            <p className="text-base font-semibold text-white font-eculid">
              PLACE YOUR ORDER
            </p>
          </button>
        </div>
      </div>
      <div className="basis-2/5 bg-[#F7C59F] relative">
        <img
          src={imgBanner}
          alt="Img banner"
          className="relative z-50 mx-auto mt-4"
        />
        <img
          src={eclipBanner}
          alt="eclipse"
          className="absolute inset-0 m-auto"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
