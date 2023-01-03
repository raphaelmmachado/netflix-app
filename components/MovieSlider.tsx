import { useContext } from "react";
import Image from "next/image";
import { Movie } from "../typing";
import apiConfiguration from "../utils/apiConfiguration";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.css";
// import required modules
import { Pagination, Navigation } from "swiper";

interface IMovieSlider {
  movies: Movie[];
  title: string;
  poster: boolean;
  background: boolean;
}

export default function Slider({
  movies,
  title,
  background,
  poster,
}: IMovieSlider) {
  const imgUrl = apiConfiguration.images.secure_base_url;
  const posterSize = apiConfiguration.images.poster_sizes;
  const backdropSize = apiConfiguration.images.backdrop_sizes;
  return (
    <section
      className={`${background ? "bg-black" : ""} pl-8 py-6 m-0 shadow-2xl`}
    >
      <h1 className="font-semibold tracking-wide text-lg text-white border-l-4 pl-1 my-1 border-red">
        {title}
      </h1>
      <Swiper
        loop
        slidesPerView={5}
        spaceBetween={5}
        navigation
        modules={[Pagination, Navigation]}
        className="swiper-slider"
      >
        {movies.map((item, i) => (
          <>
            <SwiperSlide key={i}>
              <div
                className={
                  poster ? `w-[120px] h-[280px]` : `w-[285px] h-[171px] `
                }
              >
                <Image
                  src={
                    poster
                      ? `${imgUrl}${posterSize[3]}${item.poster_path}`
                      : `${imgUrl}${backdropSize[1]}${item.backdrop_path}`
                  }
                  fill={true}
                  alt="movie-poster"
                  className="rounded-sm shadow-sm"
                />
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </section>
  );
}
