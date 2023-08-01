import React from "react";
import Link from "next/link";

import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { tinaField } from "tinacms/dist/react";

import DropDownMenu from "./dropdown";
import { Container } from "../../util/container";
import { useTheme } from "..";

export const Footer = ({ data }) => {
  const theme = useTheme();

  const footerColor = {
    default:
      "text-gray-800 from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000",
    primary: {
      blue: "text-white from-blue-500 to-blue-700",
      teal: "text-white from-teal-500 to-teal-600",
      green: "text-white from-green-500 to-green-600",
      red: "text-white from-red-500 to-red-600",
      pink: "text-white from-pink-500 to-pink-600",
      purple: "text-white from-purple-500 to-purple-600",
      orange: "text-white from-orange-500 to-orange-600",
      yellow: "text-white from-yellow-500 to-yellow-600",
    },
  };

  const footerColorCss =
    data.color === "primary"
      ? footerColor.primary[theme.color]
      : footerColor.default;

  return (
    <footer className={`bg-gradient-to-br ${footerColorCss}`}>
      <Container className="relative" size="small">
        <div className="grid grid-cols-4 justify-between gap-8 flex-wrap">
          <Link
            href="/"
            className="col-span-4 lg:col-span-1 group mx-2 flex justify-center font-bold tracking-tight text-gray-400 dark:text-gray-300 opacity-50 hover:opacity-100 transition duration-150 ease-out whitespace-nowrap"
            data-tina-field={tinaField(data, "logo")}
          >
            <img className="max-w-[250px] h-fit" src={data?.logo} alt="logo" />
          </Link>
          <ul className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col gap-2">
            {data.nav &&
              data.nav.map((item, i) => {
                return <DropDownMenu key={item.label + i} menuItem={item} />;
              })}
          </ul>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 flex flex-col text-white gap-4">
            <p data-tina-field={tinaField(data.contact, "email")}>
              Email: {data?.contact?.email}
            </p>
            <p data-tina-field={tinaField(data.contact, "contact")}>
              Contact: {data?.contact?.contact}
            </p>
            <p data-tina-field={tinaField(data.contact, "fax")}>
              Fax: {data?.contact?.fax}
            </p>
            <p data-tina-field={tinaField(data.contact, "address")}>
              {data?.contact?.address}
            </p>
          </div>
          <div className="col-span-4 lg:col-span-1 flex gap-4 justify-center">
            {data.social && data.social.facebook && (
              <Link
                data-tina-field={tinaField(data.social, "facebook")}
                href={data.social.facebook}
                className="p-2 bg-red-900 h-fit hover:bg-red-700 rounded-full text-white"
              >
                <FaFacebook className="text-2xl" />
              </Link>
            )}
            {data.social && data.social.twitter && (
              <Link
                data-tina-field={tinaField(data.social, "twitter")}
                href={data.social.twitter}
                className="p-2 bg-red-900 h-fit hover:bg-red-700 rounded-full text-white"
              >
                <FaTwitter className="text-2xl" />
              </Link>
            )}
            {data.social && data.social.email && (
              <Link
                data-tina-field={tinaField(data.social, "email")}
                href={data.social.email}
                className="p-2 bg-red-900 h-fit hover:bgapt: error while loading shared libraries: libapt-private.so.0.0: cannot open shared object file: No such file or directory
                -red-700 rounded-full text-white"
              >
                <FaEnvelope className="text-2xl" />
              </Link>
            )}
            {data.social && data.social.instagram && (
              <Link
                data-tina-field={tinaField(data.social, "instagram")}
                href={data.social.instagram}
                className="p-2 bg-red-900 h-fit hover:bg-red-700 rounded-full text-white"
              >
                <FaInstagram className="text-2xl" />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
};
