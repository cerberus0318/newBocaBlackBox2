
import type { Template } from "tinacms";
export const galleryBlockSchema: Template = {
  name: "gallery",
  label: "Gallery",
  ui: {
    defaultItem: {
      header_line: "Gallery",
    },
  },
  fields: [
    {
      type: "string",
      label: "Header Line",
      name: "header_line",
    },
    {
      type: "image",
      label: "Gallery Image",
      name: "gallery",
      list: true
    }
  ],
};