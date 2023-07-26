const EventList = (props: any) => {
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
    <div className="w-full border border-red-900 rounded-sm relative flex">
      <div className="h-[250px]">
        <img
          src={props?.event?.node?.event_image}
          alt={props?.event?.node?.title}
          className="h-full w-[250px] object-cover"
        />
      </div>
      <div className="align-center w-full h-1100 bg-black items-center flex">
        <div className="text-center w-full">
          <h1 className="text-md font-bold">{props?.event?.node?.title}</h1>
          <p className="text-sm font-bold italic">
            {convertDateFormat(props?.event?.node?.event_date)}
          </p>
          <p className="text-sm font-bold pt-2 text-red-700 italic">
            Venue: {props?.event?.node?.venure?.name}
          </p>
          <button className="mt-2 bg-red-900 text-gray-200 hover:text-white text-md font-bold py-2 px-6 rounded-md hover:bg-red-800">
            Info & Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventList;