import React, { useState } from "react";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Thumbs,
} from "swiper/modules";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { client } from "../../tina/__generated__/client";
import { Container } from "../../components/util/container";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function EventDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina(props);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const convertDateFormat = (date: string) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.getDate();
    const year = newDate.getFullYear();

    const customFormat = `${month} ${day}, ${year}`;

    return customFormat;
  };

  const convertDateTimeFormat = (date: string) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();

    const shortMonthString = month;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    const period = hour < 12 ? "AM" : "PM";
    const customFormat = `${shortMonthString} ${day}, ${year} at ${formattedHour}:${formattedMinute} ${period}`;

    return customFormat;
  };

  return (
    <Layout data={data.global as any}>
      <Container className="w-full">
        <div className="text-left text-white text-2xl font-bold py-2 w-full border-b border-white">
          <h1>{data.event.title}</h1>
          <p className="text-red-700 text-xl italic">
            ({data.event.venue.name})
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 p-8 gap-8 detail-swiper">
          <div className="px-4 col-span-1 md:col-span-2">
            <Swiper
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              speed={500}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Autoplay, FreeMode, Navigation, Thumbs]}
              className="mainSwiper"
            >
              {data.event?.event_image?.map((event, index) => (
                <SwiperSlide key={index} className="bg-red-900">
                  <div className="flex justify-center align-center hover:cursor-pointer">
                    <img
                      src={event}
                      alt={data?.event?.title}
                      className="!h-[350px] object-cover overflow-clip"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="smallSwiper"
            >
              {data.event?.event_image?.map((event, index) => (
                <SwiperSlide key={index} className="bg-red-900">
                  <div className="flex justify-center align-center hover:cursor-pointer">
                    <img
                      src={event}
                      alt={data?.event?.title}
                      className="h-[150px] object-cover overflow-clip"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="col-span-1 text-white ">
            {data.event?.event_info?.map((event, index) => (
              <h2 key={index} className=" text-xl text-center font-bold">
                {convertDateTimeFormat(event?.event_date)}
              </h2>
            ))}
            <div className="py-2">
              <p className="text-lg text-red-600 py-2">
                <label className="font-bold text-white">Genre: </label>
                {data.event.genere.genere}
              </p>
              <p className="text-lg text-red-600 py-2">
                <label className="font-bold text-white">Language: </label>
                {data.event.language.name}
              </p>
              <p className="text-lg text-red-600 py-2">
                <label className="font-bold text-white">
                  Age restriction:{" "}
                </label>
                {data.event.rating.rating}
              </p>
            </div>
            {data.event?.event_info?.map((event, index) => (
              <div key={index} className="w-full pt-2 flex justify-center">
                <Link
                  href={event.ticket_link}
                  className="block w-full max-w-[450px] text-center bg-red-900 text-gray-200 hover:text-white text-md font-bold py-2 px-6 rounded-md hover:bg-red-800"
                >
                  {convertDateFormat(event?.event_date)}
                </Link>
              </div>
            ))}
            <div className="w-full pt-2 flex justify-center">
              <Link
                href={data.event.performer_link}
                className="block w-full max-w-[450px] text-center bg-red-900 text-gray-200 hover:text-white text-md font-bold py-2 px-6 rounded-md hover:bg-red-800"
              >
                Performers
              </Link>
            </div>
          </div>
        </div>
        <div className=" text-white text-lg">
          <TinaMarkdown content={data.event.description} />
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.eventQuery({
    relativePath: `${params.slug}.mdx`,
  });
  return {
    props: {
      ...tinaProps,
    },
  };
};

export const getStaticPaths = async () => {
  const eventData = await client.queries.eventConnection();
  return {
    paths: eventData.data.eventConnection.edges.map((event) => ({
      params: { slug: event.node._sys.filename },
    })),
    fallback: "blocking",
  };
};
