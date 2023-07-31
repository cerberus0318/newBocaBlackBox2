
import type { Template } from "tinacms";
export const boxOfficeInformationBlockSchema: Template = {
  name: "boxOfficeInfo",
  label: "BoxOfficeInformation",
  ui: {
    defaultItem: {
      header_line: "Box Office Information",
    },
  },
  fields: [
    {
      type: "string",
      label: "Header Line",
      name: "header_line",
    },
    {
      type: "rich-text",
      label: "Box Information",
      name: "box_info"
    },
    {
      type: "image",
      label: "Avatar",
      name: "avatar1"
    },
    {
      type: "image",
      label: "Avatar",
      name: "avatar2"
    },
  ],
};