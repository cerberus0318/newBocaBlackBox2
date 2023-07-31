import React from "react";
import { Container } from "../../util/container";
import { Section } from "../../util/section";
import { PageBlocksMeet_Team } from "../../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const MeetTeam = ({ data }: { data: PageBlocksMeet_Team }) => {
  return (
    <Section>
      <h2 data-tina-field={tinaField(data, "header_line")} className="text-5xl font-bold py-8 text-center">
        {data.header_line}
      </h2>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {data?.team_member?.map((member, index) => (
            <div
              key={index}
              data-tina-field={tinaField(member, "name")}
              className="text-center text-white"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full xl:h-[200px] lg:h-[250px] md:h-[350px] h-[400px] overflow-hidden object-cover"
              />
              <div className="bg-black py-2">
                <h2 className="text-lg font-bold">{member.name}</h2>
                <p className="text-md font-bold text-red-900">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
