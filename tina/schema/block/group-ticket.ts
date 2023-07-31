
import type { Template } from "tinacms";
export const groupTicketBlockSchema: Template = {
  name: "group_ticket",
  label: "GroupTicket",
  ui: {
    defaultItem: {
      header_line: "Group Tickets",
    },
  },
  fields: [
    {
      type: "string",
      label: "Header Line",
      name: "header_line",
    },
    {
      type: "object",
      label: "Tickets",
      name: "tickets",
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Description",
          name: "description",
        },
        {
          type: "image",
          label: "Event Logo",
          name: "event_image",
        },
        {
          type: "image",
          label: "Feature Image",
          name: "feature_image",
        },
        {
          type: "string",
          label: "Ticket Buy Link",
          name: "ticket_link",
        },
        {
          type: "datetime",
          label: "Event Date",
          name: "event_date",
          ui: {
            timeFormat: "HH:mm",
          },
        },
        {
          type: "reference",
          label: "Venue",
          name: "venue",
          collections: ["venue"],
        },
        {
          type: "reference",
          label: "Language",
          name: "language",
          collections: ["language"],
        },
        {
          type: "reference",
          label: "Genere",
          name: "genere",
          collections: ["genere"],
        },
        {
          type: "reference",
          label: "Age Rating",
          name: "rating",
          collections: ["rating"],
        },
      ],
    }
  ],
};