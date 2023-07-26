import React from "react";
import { Container } from "../../util/container";
import { Section } from "../../util/section";
import { PageBlocksBoxOfficeInfo } from "../../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const BoxOfficeInfo = ({ data }: { data: PageBlocksBoxOfficeInfo }) => {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div data-tina-field={tinaField(data, "avatar1")}>
            <img src={data?.avatar1} alt="avatar1" />
          </div>
          <div data-tina-field={tinaField(data, "avatar2")}>
            <img src={data?.avatar2} alt="avatar2" />
          </div>
        </div>
      </Container>
      <h2
        data-tina-field={tinaField(data, "header_line")}
        className="text-5xl font-bold py-8 text-center"
      >
        {data.header_line}
      </h2>
      <Container
        width="medium"
        className="text-lg"
        data-tina-field={tinaField(data, "box_info")}
      >
        <TinaMarkdown content={data?.box_info} />
      </Container>
    </Section>
  );
};
