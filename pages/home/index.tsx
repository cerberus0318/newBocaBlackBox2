import { client } from "../../tina/__generated__/client";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import MultiCarousel from "../../components/events/multiCarousel";
import EventView from "../../components/events/eventView";
import FeatureCarousel from "../../components/blocks/featureCarousel";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const events = props.data.eventConnection.edges;

  return (
    <Layout>
      <FeatureCarousel />
      <div className="w-full">
        <MultiCarousel data={events} />
      </div>
      <div className="w-full">
        <EventView data={events} venue="" />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const eventProps = await client.queries.eventConnection();

  return {
    props: {
      ...eventProps,
    },
  };
};
export type EventsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["eventConnection"]["edges"][number];
