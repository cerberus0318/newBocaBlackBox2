
import type { Template } from "tinacms";
export const meetTeamBlockSchema: Template = {
  name: "meet_team",
  label: "MeetTeam",
  ui: {
    defaultItem: {
      header_line: "Meet Team",
    },
  },
  fields: [
    {
      type: "string",
      label: "Header Line",
      name: "header_line",
    },
    {
      type: "object",
      label: "TeamMembers",
      name: "team_member",
      list: true,
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Position",
          name: "position",
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar",
        },
      ]
    }
  ],
};