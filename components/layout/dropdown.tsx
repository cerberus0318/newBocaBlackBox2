import React, { Fragment } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa";
import { tinaField } from "tinacms/dist/react";

const DropDownMenu = (props) => {
  const { menuItem } = props;

  const itemClasses = {
    nav: "inline-flex w-full justify-center items-center gap-1 rounded-md bg-black hover:bg-opacity-60 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
    subNavItems:
      "absolute z-10 right-0 mt-2 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
  };
  1;

  return (
    <Menu as="div" data-tina-field={tinaField(menuItem, "label")} className="relative inline-block text-left">
      {menuItem.subnav ? (
        <Menu.Button className={itemClasses.nav}>
          {menuItem.label}
          <FaAngleDown />
        </Menu.Button>
      ) : (
        <Link href={menuItem.href} className={itemClasses.nav}>
          {menuItem.label}
        </Link>
      )}
      {menuItem.subnav && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className={itemClasses.subNavItems}>
            {menuItem.subnav.map((nav, i) => (
              <Menu.Item key={nav.label + i}>
                {({ active }) => (
                  <Link
                    href={nav.href}
                    className={`${
                      active ? "bg-black bg-opacity-60" : "bg-black "
                    } text-white group flex w-content items-center border-bottom rounded-md px-2 py-2 text-sm`}
                  >
                    {nav.label}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
};

export default DropDownMenu;
