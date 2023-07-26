import { type Collection } from "tinacms";
import { contentBlockSchema } from "../../../components/blocks/content";
import { featureBlockSchema } from "../../../components/blocks/features";
import { heroBlockSchema } from "../../../components/blocks/hero";
import { testimonialBlockSchema } from "../../../components/blocks/testimonial";
import { meetTeamBlockSchema } from "../block/meet-team";
import { groupTicketBlockSchema } from "../block/group-ticket";
import { boxOfficeInformationBlockSchema } from "../block/box-office-information";
import { seatingChartBlockSchema } from "../block/seating-chart";

const PageSchema: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      if (document._sys.filename === "about") {
        return `/about`;
      }
      return undefined;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      description:
        "The title of the page. This is used to display the title in the CMS",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        // @ts-ignore
        featureBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        meetTeamBlockSchema,
        groupTicketBlockSchema,
        boxOfficeInformationBlockSchema,
        seatingChartBlockSchema
      ],
    },
  ],
};
export { PageSchema };
