
import type { Template } from "tinacms";
export const contactBlockSchema: Template = {
  name: "contact",
  label: "Contact",
  ui: {
    defaultItem: {
      header_line: "Contact Us",
    },
  },
  fields: [
    {
      type: "string",
      label: "Header Line",
      name: "header_line",
    },
    {
      type: "string",
      label: "Tag Line",
      name: "tag_line"
    },
    {
      type: "string",
      label: "Address",
      name: "address"
    },
    {
      type: "string",
      label: "Phone",
      name: "phone"
    },
    {
      type: "string",
      label: "Fax",
      name: "fax"
    },
    {
      type: "string",
      label: "Email",
      name: "email"
    },
  ],
};