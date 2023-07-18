"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Category } from "@/common.types";

type Props = {
  title: string;
  state: string;
  filters: Array<{ id: string; name: string }>;
  setState: (arg: Category | undefined) => void;
};

const CustomMenu = ({ title, state, filters, setState }: Props) => (
  <div className="flexStart flex-col w-full gap-7 relative">
    <label htmlFor={title} className="w-full text-gray-100">
      {title}
    </label>
    <Menu as="div" className="self-start relative">
      <div>
        <Menu.Button className="flexCenter custom_menu-btn">
          {state || "Category"}
          <Image src="/arrow-down.svg" width={10} height={5} alt="arrow down" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="flexStart custom_menu-items">
          {filters.map((tag) => (
            <Menu.Item key={tag.id}>
              <button
                type="button"
                value={tag.name}
                className="custom_menu-item"
                onClick={(e) => {
                  setState(
                    filters.find((item) => e.currentTarget.value === item.name)
                  );
                }}
              >
                {tag.name}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  </div>
);

export default CustomMenu;
