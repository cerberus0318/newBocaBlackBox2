import { useEffect } from "react";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";
import MultiCarousel from "../components/events/multiCarousel";
import EventView from "../components/events/eventView";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const events = props.data.eventConnection.edges;

  useEffect(() => {
    console.log("tinaProps,", props);
  }, []);
  return (
    <Layout>
      <div className="w-full">
        <MultiCarousel data={events} />
      </div>
      <div className="w-full">
        <EventView data={events} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const eventProps = await client.queries.eventQuery();

  return {
    props: {
      ...eventProps,
    },
  };
};
export type EventsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["eventConnection"]["edges"][number];
