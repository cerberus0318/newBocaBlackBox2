import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Thumbs } from "swiper";

import { client } from "../../tina/__generated__/client";
import { tinaField } from "tinacms/dist/react";

import "swiper/css";
import "swiper/css/pagination";

const FeatureCarousel = () => {
  const router = useRouter();

  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const getFeatureCarouselData = async () => {
      const eventProps = await client.queries.eventConnection();
      const eventData = eventProps.data.eventConnection.edges;
      const featureCarouselData = eventData.filter((event) => {
        return Boolean(event.node.feature_image);
      });
      setCarouselData(featureCarouselData);
    };
    getFeatureCarouselData();
  }, []);

  const navigateDetail = (title) => {
    router.push("/events/" + title);
  };

  return (
    <div className="w-full">
      <Swiper
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={500}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, Thumbs]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {carouselData.map((carousel, index) => (
          <SwiperSlide
            data-tina-field={tinaField(carousel.node, "title")}
            onClick={() => navigateDetail(carousel.node._sys.filename)}
            key={index}
            className="bg-red-900"
          >
            <div className="flex w-screen justify-center align-center hover:cursor-pointer">
              <img
                src={carousel.node.feature_image}
                alt={carousel.node.title}
                className="h-[450px] object-cover overflow-clip"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeatureCarousel;
