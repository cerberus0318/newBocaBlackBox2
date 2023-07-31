
import type { Template } from "tinacms";
export const calendarViewblockSchema: Template = {
  label: "CalendarView",
  name: "calendarView",
  ui: {
    defaultItem: {
      header_line: "CalendarView",
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