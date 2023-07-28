import React from "react";
import { Container } from "../../util/container";
import { Section } from "../../util/section";
import { PageBlocksContact } from "../../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const Contact = ({ data }: { data: PageBlocksContact }) => {
  return (
    <Section>
      <h2
        data-tina-field={tinaField(data, "header_line")}
        className="text-5xl font-bold py-8 text-center"
      >
        {data.header_line}
      </h2>
      <Container>
        <div>
          <h2 className="text-lg font-bold py-2" data-tina-field={tinaField(data, "tag_line")}>{data.tag_line}</h2>
          <p data-tina-field={tinaField(data, "address")}>{data.address}</p>
          <p data-tina-field={tinaField(data, "phone")}>Phone: {data.phone}</p>
          <p data-tina-field={tinaField(data, "fax")}>Fax: {data.fax}</p>
          <p data-tina-field={tinaField(data, "email")}>Email: {data.email}</p>
        </div>
        <form className="mt-8">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-white "
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-white "
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white "
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white "
            >
              Your message(optional)
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-[150px] p-2.5 "
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-900 text-white py-2 px-6 rounded-md hover:bg-red-800"
          >
            Submit
          </button>
        </form>
      </Container>
    </Section>
  );
};
