import React, { useEffect } from "react";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";

import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { client } from "../../tina/__generated__/client";
import { Container } from "../../components/util/container";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function EventDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina(props);

  const convertDateFormat = (date: string) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    let hour = newDate.getHours();
    let minute = newDate.getMinutes();

    const shortMonthString = month;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    const period = hour < 12 ? "AM" : "PM";
    const customFormat = `${shortMonthString} ${day}, ${year} at ${formattedHour}:${formattedMinute} ${period}`;

    return customFormat;
  };

  return (
    <Layout rawData={data} data={data.global as any}>
      <Container className="w-full">
        <div className="text-left text-white text-2xl font-bold py-2 w-full border-b border-white">
          <h1>{data.event.title}</h1>
          <p className="text-red-700 text-xl italic">
            ({data.event.venue.name})
          </p>
        </div>
        <div className="grid grid-cols-1 md: grid-cols-3 p-8 gap-8">
          <div className="px-4 col-span-1 md:col-span-2">
            <img
              className="rounded-lg w-full mb-4"
              src={data.event.event_image}
              alt="avatar"
            />
          </div>
          <div className="col-span-1 text-white ">
            <h2 className=" text-xl text-center font-bold">
              {convertDateFormat(data.event.event_date)}
            </h2>
            <h2 className=" text-xl text-center font-bold">
              {convertDateFormat(data.event.event_date)}
            </h2>
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
            <div className="w-full">
              <Link
                href={data.event.ticket_link}
                className="my-2 block w-full text-center bg-red-900 text-gray-200 hover:text-white text-md font-bold py-2 px-6 rounded-md hover:bg-red-800"
              >
                Buy Ticket
              </Link>
              <Link
                href={data.event.ticket_link}
                className="my-2 block w-full text-center bg-red-900 text-gray-200 hover:text-white text-md font-bold py-2 px-6 rounded-md hover:bg-red-800"
              >
                Buy Ticket
              </Link>
              <Link
                href={data.event.ticket_link}
                className="my-2 block w-full text-center bg-red-900 text-gray-200 hover:text-white text-md font-bold py-2 px-6 rounded-md hover:bg-red-800"
              >
                Performance page
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
