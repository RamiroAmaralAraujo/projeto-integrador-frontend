import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { FreeMode, Pagination, A11y, Autoplay } from "swiper/modules";

import { ServiceData } from "./constants";

const ActiveSlider = () => {
  return (
    <div className="flex items-center justify-center h-full mt-10">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          700: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Pagination, A11y, Autoplay]}
        className="max-w-[90%] lg:max-w-[80%]"
        >
          {ServiceData.map((item) => (
            <SwiperSlide key={item.title} className="mx-1/2">
              <div className="flex flex-col gap-6 mb-20 group relative shadow-xl text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-brand-blue-500 opacity-70 group-hover:opacity-90" />
                <div className="relative flex flex-col items-center gap-20">
                  {/* <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" /> */}
                  <img src={item.logo} alt="LogoEmpresa" width={100} className="rounded-full" />
                  <div>
                    <h1 className="text-xl lg:text-2xl mb-2">{item.title} </h1>
                    <p className="lg:text-[18px]">{item.content} </p>
                  </div>
                </div>
                {/* <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" /> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  );
};

export default ActiveSlider;