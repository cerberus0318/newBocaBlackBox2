import Link from "next/link";
import { useEffect } from "react";

const EventCard = (props: any) => {
  const convertDateFormat = (date: string) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "short" });
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
    <div className="w-full border border-red-900 rounded-sm relative">
      <div className="w-full flex justify-center aligh-center">
        <img
          src={props?.event?.node?.event_image}
          alt={props?.event?.node?.title}
          className="w-full h-[250px] object-cover"
        />
      </div>
      <div className="align-center h-[150px] bg-black items-center flex">
        <div className="text-center w-full">
          <h1 className="text-md font-bold">{props?.event?.node?.title}</h1>
          <p className="text-sm font-bold italic">
            {convertDateFormat(props?.event?.node?.event_date)}
          </p>
          <p className="text-sm font-bold pt-2 text-red-700 italic">
            Venue: {props?.event?.node?.venue?.name}
          </p>
        </div>
      </div>
      <div className="absolute w-full h-full flex justify-center top-0 items-center opacity-0 hover:opacity-100 transition-opacity duration-500 bg-black/60">
        <Link
          href={"/events/" + props?.event?.node._sys.filename}
          className="bg-red-900 text-gray-200 hover:text-white text-md font-bold py-2 px-6 rounded-md hover:bg-red-800"
        >
          Info & Ticket
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
