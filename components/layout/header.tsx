import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import client from "../../tina/__generated__/client";
import { Container } from "../util/container";
import { useTheme } from ".";

import {
  FaYoutube,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";
import DropDownMenu from "./dropdown";

export const Header = ({ data }: { data: GlobalHeader }) => {
  const router = useRouter();
  const theme = useTheme();
  const [venueTypes, setVenueTypes] = useState([]);

  useEffect(() => {
    const getVenueType = async () => {
      const venueData = await client.queries.venueConnection();
      const venues = venueData.data.venueConnection.edges;
      console.log(venues);
      setVenueTypes(venues);
    };
    getVenueType();
  }, []);

  const headerColor = {
    default:
      "text-black dark:text-white from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
    primary: {
      blue: "text-white from-blue-300 to-blue-500",
      teal: "text-white from-teal-400 to-teal-500",
      green: "text-white from-green-400 to-green-500",
      red: "text-white from-red-400 to-red-500",
      pink: "text-white from-pink-400 to-pink-500",
      purple: "text-white from-purple-400 to-purple-500",
      orange: "text-white from-orange-400 to-orange-500",
      yellow: "text-white from-yellow-400 to-yellow-500",
    },
  };

  const headerColorCss =
    data.color === "primary"
      ? headerColor.primary[theme.color]
      : headerColor.default;

  return (
    <>
      <div className={`hidden md:block bg-red-900 text-white`}>
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button className="bg-white text-red-900 py-2 px-6 rounded-md">
                View All Shows
              </button>
              <button className="bg-white text-red-900 py-2 px-6 rounded-md">
                Newsletter Subscription
              </button>
            </div>
            <h2 data-tina-field={tinaField(data, "office")}>
              Box office: {data.office}
            </h2>
            <div className="flex">
              {data.social && data.social.youtube && (
                <Link
                  data-tina-field={tinaField(data.social, "youtube")}
                  href={data.social.youtube}
                  className="mx-2"
                >
                  <FaYoutube className="text-lg" />
                </Link>
              )}
              {data.social && data.social.map && (
                <Link
                  data-tina-field={tinaField(data.social, "map")}
                  href={data.social.map}
                  className="mx-2"
                >
                  <FaMapMarkerAlt className="text-lg" />
                </Link>
              )}
              {data.social && data.social.facebook && (
                <Link
                  data-tina-field={tinaField(data.social, "facebook")}
                  href={data.social.facebook}
                  className="mx-2"
                >
                  <FaFacebook className="text-lg" />
                </Link>
              )}
              {data.social && data.social.instagram && (
                <Link
                  data-tina-field={tinaField(data.social, "instagram")}
                  href={data.social.instagram}
                  className="mx-2"
                >
                  <FaInstagram className="text-lg" />
                </Link>
              )}
              {data.social && data.social.email && (
                <Link
                  data-tina-field={tinaField(data.social, "email")}
                  href={data.social.email}
                  className="mx-2"
                >
                  <FaEnvelope className="text-lg" />
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>
      <div
        className={`relative overflow-visible bg-gradient-to-b ${headerColorCss}`}
      >
        <Container size="custom" className="py-6 relative z-10 max-w-8xl">
          <div className="flex items-center justify-between gap-6">
            <div className="flex gap-2 sm:gap-4 lg:gap-2">
              {venueTypes &&
                venueTypes.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() =>
                        router.push(
                          "/home/" +
                            item.node._sys.filename
                        )
                      }
                      className="bg-red-900 text-white py-2 px-6 rounded-md hover:bg-red-800"
                    >
                      {item.node.name}
                    </button>
                  );
                })}
            </div>
            <ul className="flex gap-2 sm:gap-4 lg:gap-2 tracking-[.002em] -mx-4">
              {data.nav &&
                data.nav.map((item, i) => {
                  return <DropDownMenu key={item.label + i} menuItem={item} />;
                })}
            </ul>
          </div>
          <div
            className={`absolute h-1 bg-gradient-to-r from-transparent ${
              data.color === "primary"
                ? `via-white`
                : `via-black dark:via-white`
            } to-transparent bottom-0 left-4 right-4 -z-1 opacity-5`}
          />
        </Container>
      </div>
    </>
  );
};
