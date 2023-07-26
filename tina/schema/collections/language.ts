import { type Collection } from "tinacms";

const LanguageSchema: Collection = {
  label: "Languages",
  name: "language",
  path: "content/languages",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Language",
      name: "name",
      isTitle: true,
      required: true,
    },
  ],
};

export { LanguageSchema };
