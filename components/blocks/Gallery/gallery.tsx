import React from "react";
import { Container } from "../../util/container";
import { Section } from "../../util/section";
import { PageBlocksGallery } from "../../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const Gallery = ({ data }: { data: PageBlocksGallery }) => {
  return (
    <Section>
      <h2
        data-tina-field={tinaField(data, "header_line")}
        className="text-5xl font-bold py-8 text-center"
      >
        {data.header_line}
      </h2>
      <Container>
        <div className="gallery">
          <ul className="images" data-tina-field={tinaField(data, "gallery")}>
            {data?.gallery?.map((image, index) => (
              <li className="card relative border border-white rounded-md hover:cursor-pointer" key={index}>
                <img src={image} alt="gallery image" />
                <div className="absolute w-full h-full flex justify-center top-0 items-center opacity-0 hover:opacity-100 transition-opacity duration-500 bg-black/60">
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
};
