import { useContext } from "react";
import Image from "next/image";
import { Context } from "../context/ContextProvider";
import apiConfiguration from "../utils/apiConfiguration";
import { Movie } from "../typing";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.css";
// import required modules
import { Pagination, Navigation, FreeMode, Autoplay, Lazy } from "swiper";

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

  const { setHighlighted } = useContext(Context);
  const handleHover = (movie: Movie) => {
    setHighlighted(movie);
  };

  return (
    <section className={`${background ? "bg-black" : ""}  py-6 m-0 shadow-2xl`}>
      {/* ATENCAO AO MARGIN NO H1 */}
      <h1
        className="ml-8 pl-2 font-semibold tracking-wide text-lg
   text-white my-2 border-l-4 border-red"
      >
        {title}
      </h1>
      <Swiper
        modules={[Pagination, Navigation, FreeMode, Autoplay, Lazy]}
        slidesPerView="auto"
        spaceBetween={5}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
        }}
        freeMode={true}
        loop
        lazy={true}
        navigation
        className="swiper-slider"
      >
        {movies.map((item, i) => (
          <SwiperSlide key={i} onMouseEnter={() => handleHover(item)}>
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
                className="rounded-sm shadow-lg scale-95
            hover:scale-105 hover:z-10"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
