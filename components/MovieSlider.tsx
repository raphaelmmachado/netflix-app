import { IMovieSlider } from "../typing";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import Image from "next/image";

export default function Slider({ results, poster }: IMovieSlider) {
  return (
    <div>
      <Swiper
        grabCursor
        slidesPerView={7}
        spaceBetween={30}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {results.map((item, i) => (
          <SwiperSlide key={i}>
            <Image
              src={`${poster}${item.poster_path}`}
              width={140}
              height={280}
              alt="movie-poster"
              className="rounded-sm shadow-sm"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
