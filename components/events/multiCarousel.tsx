import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import { Pagination, Autoplay, Thumbs } from "swiper";
import { EventsType } from "../../pages/home";

import "swiper/css";
import "swiper/css/pagination";

const MultiCarousel = ({ data }: { data: EventsType[] }) => {
  const router = useRouter();

  const navigateDetail = (title) => {
    router.push("/events/" + title);
  };

  return (
    <Swiper
      autoplay={{
        delay: 500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={500}
      loop={true}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay, Thumbs]}
      slidesPerView={2}
      breakpoints={{
        // when window width is >= 640px
        640: {
          width: 640,
          slidesPerView: 4,
        },
        768: {
          width: 768,
          slidesPerView: 5,
        },
        900: {
          width: 900,
          slidesPerView: 6,
        },
        1024: {
          width: 1024,
          slidesPerView: 9,
        },
        1200: {
          slidesPerView: 10,
        },
      }}
      className="h-[100px]"
    >
      {data.map((carousel, index) => (
        <SwiperSlide
          onClick={() => navigateDetail(carousel.node._sys.filename)}
          key={index}
          className="flex justify-center align-center hover:cursor-pointer"
        >
          <img
            src={carousel.node.event_image[0]}
            alt={carousel.node.title}
            className="w-full h-full object-cover overflow-clip"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MultiCarousel;
