import React, { useState, useEffect } from "react";
import { client } from "../../tina/__generated__/client";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import MultiCarousel from "../../components/events/multiCarousel";
import EventView from "../../components/events/eventView";
import FeatureCarousel from "../../components/blocks/featureCarousel";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getFeatureCarouselData = async () => {
      const eventProps = await client.queries.eventConnection();
      const eventData = eventProps.data.eventConnection.edges;
      setEvents(eventData);
    };
    getFeatureCarouselData();
  }, []);

  return (
    <Layout>
      <FeatureCarousel />
      <div className="w-full">
        <MultiCarousel data={events} />
      </div>
      <div className="w-full">
        <EventView data={events} venue={props.data.venue.name} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const venueProps = await client.queries.venueQuery({
    relativePath: `${params.type}.md`,
  });
  return {
    props: {
      ...venueProps,
    },
  };
};

export const getStaticPaths = async () => {
  const eventData = await client.queries.eventConnection();
  return {
    paths: eventData.data.eventConnection.edges.map((event) => ({
      params: { type: event.node._sys.filename },
    })),
    fallback: "blocking",
  };
};
