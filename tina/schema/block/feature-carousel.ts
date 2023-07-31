
import type { Template } from "tinacms";
export const featureCarouselblockSchema: Template = {
  label: "FeatureCarousel",
  name: "featureCarousel",
  ui: {
    defaultItem: {
      header_line: "featureCarousel",
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