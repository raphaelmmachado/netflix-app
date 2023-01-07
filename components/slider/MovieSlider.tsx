import { useContext, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Context } from "../../context/ContextProvider";
import apiConfiguration from "../../utils/apiConfiguration";
import { Movie } from "../../typing";

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
  const [carouselMaxwidth, setCarouselMaxWidth] = useState<number>(0);
  const [carouselWidth, setCarouselWidth] = useState<number>(0);
  const carousel = useRef<HTMLDivElement>(null);
  const { setHighlighted } = useContext(Context);

  useEffect(() => {
    setCarouselMaxWidth(
      Number(carousel.current?.scrollWidth) -
        Number(carousel.current?.offsetWidth)
    );
  }, []);

  useEffect(() => {
    setCarouselWidth(Number(carousel.current?.scrollWidth));
    if (carouselWidth === Number(carousel.current?.offsetWidth)) {
      carousel.current?.scrollWidth;
    }
  }, [carouselWidth]);

  const handleHover = (movie: Movie) => {
    setHighlighted(movie);
  };

  const imgUrl = apiConfiguration.images.secure_base_url;
  const posterSize = apiConfiguration.images.poster_sizes;
  const backdropSize = apiConfiguration.images.backdrop_sizes;

  return (
    <section className={`${background ? "bg-black" : ""}  m-0 shadow-2xl`}>
      <h1
        className="p-8 font-semibold tracking-wider text-xl
   text-white"
      >
        {title}
      </h1>
      <motion.div
        ref={carousel}
        className="cursor-grab carousel relative"
        whileTap={{ cursor: "grabbing" }}
      >
        {/* <span className="absolute arrow-left" />
        <span className="absolute arrow-right" /> */}
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -carouselMaxwidth }}
          className="inner-carousel flex justify-center w-screen "
        >
          {movies.map((movie, i) => {
            return (
              <motion.div
                key={i}
                className=""
                onMouseEnter={() => handleHover(movie)}
              >
                <div
                  className={
                    poster
                      ? `w-[250px] h-[320px] overflow-hidden relative hover:scale-105`
                      : `w-[285px] h-[171px]  overflow-hidden relative hover:scale-105`
                  }
                >
                  <Image
                    key={i}
                    src={
                      poster
                        ? `${imgUrl}${posterSize[3]}${movie.poster_path}`
                        : `${imgUrl}${backdropSize[1]}${movie.backdrop_path}`
                    }
                    fill={true}
                    alt="movie-poster"
                    className="rounded-sm shadow-lg scale-95
hover:scale-105 object-contain pointer-events-none"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

// MOTION
//  <h1
//         className="p-8 font-semibold tracking-wider text-xl
//    text-white"
//       >
//         {title}
//       </h1>
//       <motion.div
//   ref={carousel}
//   className="cursor-grab carousel relative"
//   whileTap={{ cursor: "grabbing" }}
// >
//         { <span className="absolute arrow-left" />
//         <span className="absolute arrow-right" /> *
// <motion.div
//   drag="x"
//   dragConstraints={{ right: 0, left: -carouselMaxwidth }}
//   className="inner-carousel flex justify-evenly w-screen "
// >
//           {movies.map((movie, i) => {
//             return (
//               <motion.div
//                 key={i}
//                 className="bg-def_blue-700"
//                 onMouseEnter={() => handleHover(movie)}
//               >
// <div
//   className={
//     poster
//       ? `w-[250px] h-[320px] overflow-hidden relative hover:scale-105`
//       : `w-[285px] h-[171px]  overflow-hidden relative hover:scale-105`
//   }
// >
//   <Image key={i}
//     src={
//       poster
//         ? `${imgUrl}${posterSize[3]}${movie.poster_path}`
//         : `${imgUrl}${backdropSize[1]}${movie.backdrop_path}`
//     }
//     fill={true}
//     alt="movie-poster"
//     className="rounded-sm shadow-lg scale-95
// hover:scale-105 object-contain pointer-events-none"
//   />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </motion.div>

{
  //SWIPER
  // Import Swiper React components
  // import { Swiper, SwiperSlide } from "swiper/react";
  // Import Swiper styles
  // import "swiper/swiper-bundle.css";
  // import required modules
  // import { Pagination, Navigation, FreeMode, Autoplay, Lazy } from "swiper";
  /* <Swiper
        modules={[Pagination, Navigation, FreeMode, Autoplay, Lazy]}
        slidesPerView="auto"
        spaceBetween={5}                      
        breakpoints={{  
          450: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
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
      </Swiper> */
}
