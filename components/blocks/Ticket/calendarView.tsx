import React, { useEffect, useState } from "react";
import client from "../../../tina/__generated__/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Container } from "../../util/container";
import EventCard from "../../events/eventCard";
import EventList from "../../events/eventList";

const CalendarView = () => {
  const [eventsData, setEventsData] = useState([]);
  const [filteredEventsData, setFilteredEventsData] = useState([]);
  const [eventsDate, setEventsDate] = useState([]);
  const [venueData, setVenueData] = useState([]);
  const [genereData, setGenereData] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [ageRestrictionData, setAgeRestrictionData] = useState([]);
  const [viewOption, setViewOption] = useState("calendar");

  const [filter, setFilter] = useState({
    venue: "",
    genere: "",
    language: "",
    ageRestriction: "",
  });

  const convertDateForm = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear().toString();
    let month = (newDate.getMonth() + 1).toString();
    let day = newDate.getDate().toString();

    if (month.length === 1) {
      month = "0" + month;
    }
    if (day.length === 1) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  };

  useEffect(() => {
    const getAllFilterData = async () => {
      const eventProps = await client.queries.eventConnection();
      const eventData = eventProps.data.eventConnection.edges;
      setEventsData(eventData);
      setFilteredEventsData(eventData);
      const venueProps = await client.queries.venueConnection();
      setVenueData(venueProps.data.venueConnection.edges);
      const languageProps = await client.queries.languageConnection();
      setLanguageData(languageProps.data.languageConnection.edges);
      const genereProps = await client.queries.genereConnection();
      setGenereData(genereProps.data.genereConnection.edges);
      const ageRestriction = await client.queries.ratingConnection();
      setAgeRestrictionData(ageRestriction.data.ratingConnection.edges);
    };
    getAllFilterData();
  }, []);

  useEffect(() => {
    let events = [];
    filteredEventsData?.forEach((filteredEvent, index) => {
      filteredEvent?.node?.event_info?.forEach((eventInfo) => {
        events.push({
          title: filteredEvent?.node?.title,
          start: convertDateForm(eventInfo?.event_date),
          url: "/events/" + filteredEvent?.node?._sys?.filename,
        });
      });
    });
    setEventsDate(events);
  }, [filteredEventsData]);

  useEffect(() => {
    const filteredEvents = eventsData.filter((event) => {
      if (filter.venue != "" && event.node.venue.name != filter.venue)
        return false;
      if (filter.language != "" && event.node.language.name != filter.language)
        return false;
      if (filter.genere != "" && event.node.genere.genere != filter.genere)
        return false;
      if (
        filter.ageRestriction != "" &&
        event.node.rating.rating != filter.ageRestriction
      )
        return false;
      return true;
    });
    setFilteredEventsData(filteredEvents);
  }, [filter]);

  const changeFilter = (type, value) => {
    setFilter({ ...filter, [type]: value });
  };

  return (
    <Container size="large" className="text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <label
            htmlFor="venues"
            className="block mb-2 text-sm font-medium text-white "
          >
            Select Venue
          </label>
          <select
            onChange={(e) => changeFilter("venue", e.target.value)}
            id="venues"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option value="" selected>
              Choose a Venue
            </option>
            {venueData.map((venue, index) => (
              <option key={index} value={venue.node.name}>
                {venue.node.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="generes"
            className="block mb-2 text-sm font-medium text-white "
          >
            Select Genere
          </label>
          <select
            onChange={(e) => changeFilter("genere", e.target.value)}
            id="generes"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option value="" selected>
              Choose a Genere
            </option>
            {genereData.map((genere, index) => (
              <option key={index} value={genere.node.genere}>
                {genere.node.genere}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="languages"
            className="block mb-2 text-sm font-medium text-white "
          >
            Select Language
          </label>
          <select
            onChange={(e) => changeFilter("language", e.target.value)}
            id="languages"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option value="" selected>
              Choose a Language
            </option>
            {languageData.map((language, index) => (
              <option key={index} value={language.node.name}>
                {language.node.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="age-restriction"
            className="block mb-2 text-sm font-medium text-white "
          >
            Select Age Restriction
          </label>
          <select
            onChange={(e) => changeFilter("ageRestriction", e.target.value)}
            id="age-restriction"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option value="" selected>
              Choose a age restriction
            </option>
            {ageRestrictionData.map((ageRestriction, index) => (
              <option key={index} value={ageRestriction.node.rating}>
                {ageRestriction.node.rating}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="py-4">
        <label
          htmlFor="viewmode"
          className="block mb-2 text-sm font-medium text-white "
        >
          Select View Mode
        </label>
        <select
          onChange={(e) => setViewOption(e.target.value)}
          id="viewmode"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="calendar" selected>
            Calendar
          </option>
          <option value="list">List View</option>
          <option value="card">Card View</option>
        </select>
      </div>
      {viewOption === "calendar" && (
        <FullCalendar
          themeSystem="Lux"
          plugins={[dayGridPlugin]}
          events={eventsDate}
          height={550}
        />
      )}
      {viewOption === "card" && (
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEventsData?.map((event: any, index: number) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </Container>
      )}
      {viewOption === "list" && (
        <Container>
          <div className="grid grid-cols-1 gap-4">
            {filteredEventsData?.map((event: any, index: number) => (
              <EventList key={index} event={event} />
            ))}
          </div>
        </Container>
      )}
    </Container>
  );
};

export default CalendarView;
