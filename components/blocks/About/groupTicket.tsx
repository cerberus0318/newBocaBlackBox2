import React from "react";
import { Container } from "../../util/container";
import { Section } from "../../util/section";
import { PageBlocksGroup_Ticket } from "../../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const GroupTickets = ({ data }: { data: PageBlocksGroup_Ticket }) => {
  const convertDateFormat = (date: string) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "short" });
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
    <Section>
      <h2
        data-tina-field={tinaField(data, "header_line")}
        className="text-5xl font-bold py-8 text-center"
      >
        {data.header_line}
      </h2>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data?.tickets?.map((ticket, index) => (
            <div key={index} className="w-full border border-red-900 rounded-sm relative" data-tina-field={tinaField(ticket, "title")}>
              <div className="w-full flex justify-center aligh-center">
                <img
                  src={ticket.event_image}
                  alt={ticket.title}
                  className="w-full h-[250px] object-cover"
                />
              </div>
              <div className="align-center h-[150px] bg-black items-center flex">
                <div className="text-center w-full">
                  <h1 className="text-md font-bold">{ticket.title}</h1>
                  <p className="text-sm font-bold italic">
                    {convertDateFormat(ticket.event_date)}
                  </p>
                </div>
              </div>
              <div className="absolute w-full h-full flex justify-center top-0 items-center opacity-0 hover:opacity-100 transition-opacity duration-500 bg-black/60">
                <button className="bg-red-900 text-gray-200 hover:text-white text-md font-bold py-2 px-6 rounded-md hover:bg-red-800">
                  Info & Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
