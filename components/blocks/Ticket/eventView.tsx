import React, { useState, useEffect } from "react";
import { Container } from "../../util/container";
import { Section } from "../../util/section";
import { PageBlocksEventview } from "../../../tina/__generated__/types";
import client from "../../../tina/__generated__/client";
import { tinaField } from "tinacms/dist/react";
import EventCard from "../../events/eventCard";

export const EventView = ({ data }: { data: PageBlocksEventview }) => {
  const [venueTypes, setVenueTypes] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [isShowMore, setIsShowMore] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [showingData, setShowingData] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const eventQuery = await client.queries.eventConnection();
      const events = eventQuery.data.eventConnection.edges;
      setEventData(events);
    };
    const getVenueType = async () => {
      const venueData = await client.queries.venueConnection();
      const venues = venueData.data.venueConnection.edges;
      setVenueTypes(venues);
    };
    getEvents();
    getVenueType();
  }, []);

  useEffect(() => {
    let filterData = [];
    if (selectedVenue !== "") {
      filterData = eventData?.filter((event) => {
        return event.node?.venue?.name === selectedVenue;
      });
    } else filterData = eventData;

    if (isShowMore && filterData.length > 8)
      setShowingData(filterData.slice(0, 8));
    else setShowingData(filterData);
  }, [isShowMore, selectedVenue, eventData]);

  return (
    <Section>
      <h2
        data-tina-field={tinaField(data, "header_line")}
        className="text-5xl font-bold py-8 text-center"
      >
        {data.header_line}
      </h2>
      <div className="flex gap-3 justify-center mb-4">
        <button
          onClick={() => setSelectedVenue("")}
          className="bg-red-900 text-gray-200 hover:text-white py-2 px-6 rounded-md hover:-translate-y-1 transition-all delay-50 hover:bg-red-800"
        >
          All
        </button>
        {venueTypes.map((venue, index) => (
          <button
            onClick={() => setSelectedVenue(venue.node.name)}
            className="bg-red-900 text-gray-200 hover:text-white py-2 px-6 rounded-md hover:-translate-y-1 transition-all delay-50 hover:bg-red-800"
            key={index}
          >
            {venue.node.name}
          </button>
        ))}
      </div>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {showingData?.map((event: any, index: number) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </Container>
      <div className="py-8">
        {!isShowMore && showingData.length > 8 && (
          <button
            onClick={() => setIsShowMore(true)}
            className="bg-red-900 text-gray-200 hover:text-white py-2 px-6 rounded-md hover:-translate-y-1 transition-all delay-50 hover:bg-red-800"
          >
            Load More
          </button>
        )}
      </div>
    </Section>
  );
};
