import { type Collection } from "tinacms";

const AgeRestrictionSchema: Collection = {
  label: "Ratings",
  name: "rating",
  path: "content/ageratings",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Rating",
      name: "rating",
      isTitle: true,
      required: true,
    },
  ],
};

export { AgeRestrictionSchema };
