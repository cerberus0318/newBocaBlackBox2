import { type Collection } from "tinacms";

const GenereSchema: Collection = {
  label: "Generes",
  name: "genere",
  path: "content/generes",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Genere",
      name: "genere",
      isTitle: true,
      required: true,
    },
  ],
};

export { GenereSchema };
