
import type { Template } from "tinacms";
export const seatingChartBlockSchema: Template = {
  name: "seatingChart",
  label: "SeatingChart",
  ui: {
    defaultItem: {
      header_line1: "Performances",
      header_line2: "Wrestling Matches",
    },
  },
  fields: [
    {
      type: "string",
      label: "Header Line",
      name: "header_line1",
    },
    {
      type: "image",
      label: "Seating Info",
      name: "seating_image1"
    },
    {
      type: "string",
      label: "Header Line",
      name: "header_line2",
    },
    {
      type: "image",
      label: "Seating Info",
      name: "seating_image2"
    },
  ],
};