import React from "react";
import { Container } from "../../util/container";
import { Section } from "../../util/section";
import { PageBlocksSeatingChart } from "../../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const SeatingChart = ({ data }: { data: PageBlocksSeatingChart }) => {
  return (
    <Section>
      <Container>
        <h2
          data-tina-field={tinaField(data, "header_line1")}
          className="text-5xl font-bold py-8 text-center"
        >
          {data.header_line1}
        </h2>
        <div data-tina-field={tinaField(data, "seating_image1")} className="flex justify-center">
          <img src={data.seating_image1} />
        </div>
        <h2
          data-tina-field={tinaField(data, "header_line2")}
          className="text-5xl font-bold py-8 text-center"
        >
          {data.header_line2}
        </h2>
        <div data-tina-field={tinaField(data, "seating_image2")} className="flex justify-center">
          <img src={data.seating_image2} />
        </div>
      </Container>
    </Section>
  );
};
