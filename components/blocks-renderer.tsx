import type { Page, PageBlocks } from "../tina/__generated__/types";
import { Content } from "./blocks/content";
import { Features } from "./blocks/features";
import { Hero } from "./blocks/hero";
import { Testimonial } from "./blocks/testimonial";
import { MeetTeam } from "./blocks/About/meetTeam";
import { GroupTickets } from "./blocks/About/groupTicket";
import { tinaField } from "tinacms/dist/react";
import { BoxOfficeInfo } from "./blocks/About/boxOfficeInformation";
import { SeatingChart } from "./blocks/About/seatingChart";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <Block {...block} />
              </div>
            );
          })
        : null}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksMeet_team":
      return <MeetTeam data={block} />;
    case "PageBlocksGroup_ticket":
      return <GroupTickets data={block} />;
    case "PageBlocksBoxOfficeInfo":
      return <BoxOfficeInfo data={block} />;
    case "PageBlocksSeatingChart":
      return <SeatingChart data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    default:
      return null;
  }
};
