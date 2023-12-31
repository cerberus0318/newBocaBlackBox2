import { type Collection } from "tinacms";

const EventSchema: Collection = {
  label: "Events",
  name: "event",
  path: "content/events",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/events/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "rich-text",
      label: "Description",
      name: "description",
      required: true,
    },
    {
      type: "image",
      label: "Event Logo",
      name: "event_image",
      required: true,
      list: true
    },
    {
      type: "image",
      label: "Feature Image",
      name: "feature_image",
    },
    {
      type: "object",
      label: "Event Info",
      name: "event_info",
      fields: [
        {
          type: "datetime",
          label: "Event Date",
          name: "event_date",
          ui: {
            timeFormat: "HH:mm",
          },
        },
        {
          type: "string",
          label: "Ticket Buy Link",
          name: "ticket_link",
        },
      ],
      list: true
    },
    {
      type: "reference",
      label: "Venue",
      name: "venue",
      collections: ["venue"],
      required: true,
    },
    {
      type: "reference",
      label: "Language",
      name: "language",
      collections: ["language"],
      required: true,
    },
    {
      type: "reference",
      label: "Genere",
      name: "genere",
      collections: ["genere"],
      required: true,
    },
    {
      type: "reference",
      label: "Age Rating",
      name: "rating",
      collections: ["rating"],
      required: true,
    },
    {
      type: "string",
      label: "Admission",
      name: 'admission',
    },
    {
      type: "string",
      label: "Address",
      name: "address"
    },
    {
      type: "string",
      label: "Performers Link",
      name: "performer_link"
    }
  ],
};
export { EventSchema };
