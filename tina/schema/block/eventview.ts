
import type { Template } from "tinacms";
export const eventViewBlockSchema: Template = {
  name: "eventview",
  label: "Events by Venue",
  ui: {
    defaultItem: {
      header_line: "Events by Venue",
    },
  },
  fields: [
    {
      type: "string",
      label: "Header Line",
      name: "header_line",
    },
  ],
};