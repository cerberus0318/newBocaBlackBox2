import { type Collection } from "tinacms";

const VenueCollection: Collection = {
  label: "VenueLists",
  name: "venue",
  path: "content/venues",
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

export { VenueCollection };
