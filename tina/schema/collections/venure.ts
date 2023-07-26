import { type Collection } from "tinacms";

const VenureCollection: Collection = {
  label: "VenureLists",
  name: "venure",
  path: "content/venures",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },
  ],
};

export { VenureCollection };
