import { useState, useEffect } from "react";
import { EventsType } from "../../pages/home";
import { Container } from "../util/container";

import EventCard from "./eventCard";
import EventList from "./eventList";

import { FaListUl } from "react-icons/fa";

import client from "../../tina/__generated__/client";

const EventView = ({ data, venue }: { data: EventsType[], venue: string }) => {
  const [venueTypes, setVenueTypes] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(venue);
  const [isShowMore, setIsShowMore] = useState(false);
  const [showingData, setShowingData] = useState([]);
  const [viewMode, setViewMode] = useState(0);

  useEffect(() => {
    const getVenueType = async () => {
      const venueData = await client.queries.venueConnection();
      const venues = venueData.data.venueConnection.edges;
      setVenueTypes(venues);
    };
    getVenueType();
  }, []);

  useEffect(() => {
    let filterData = [];
    console.log(data);
    if (selectedVenue !== "") {
      filterData = data.filter((event) => {
        return event.node?.venue?.name === selectedVenue;
      });
    } else filterData = data;

    if (isShowMore && filterData.length > 8)
      setShowingData(filterData.slice(0, 8));
    else setShowingData(filterData);
  }, [isShowMore, selectedVenue, data]);

  const changeViewMode = () => {
    if (viewMode === 0) setViewMode(1);
    else setViewMode(0);
  };

  return (
    <div className="text-center text-white">
      <h1 className="text-5xl font-bold py-8">All Events</h1>
      <div className="flex gap-3 justify-center mb-4">
        <button className="bg-red-900 text-gray-200 hover:text-white py-2 px-6 rounded-md hover:-translate-y-1 transition-all delay-50 hover:bg-red-800">
          Calendar
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
        <button
          onClick={changeViewMode}
          className={viewMode === 0 ? "text-gray-200 hover:text-white py-2 px-4 rounded-md" : " bg-white text-gray-900 py-2 px-4 rounded-md"}
        >
          <FaListUl />
        </button>
      </div>
      <Container>
        <div
          className={
            viewMode === 0
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "grid grid-cols-1 gap-4"
          }
        >
          {showingData.map((event: any, index: number) =>
            viewMode === 0 ? (
              <EventCard key={index} event={event} />
            ) : (
              <EventList key={index} event={event} />
            )
          )}
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
    </div>
  );
};

export default EventView;
