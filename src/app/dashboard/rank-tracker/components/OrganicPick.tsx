import React, { useState } from "react";
import { Menu, Transition, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Fragment } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const types = [{name: "Organic", value:"organic_positions"}, {name:"Paid", value:"paid_positions"}];

interface OrganicPickProps {
  className?: string;
  changeType: ({ name, value }: { name: string, value: string }) => void
}
export default function OrganicPick({ className, changeType }: OrganicPickProps) {
  const [type, setType] = useState({
    name: types[0].name,
    value: types[0].value,
  });
  const handleTypeChange = (newType: {name: string, value: string}) => {
    setType({name: newType.name, value: newType.value}),
    changeType({name: newType.name , value: newType.value })
  };

  // console.log("TYPE", type)

  return (
    <div className="  text-right">
      <Menu
        as="div"
        className={`${className} w-[114px] shadow-sm h-38px  relative inline-block text-left`}
      >
        <MenuButton className="inline-flex w-full justify-between rounded-lg text-black p-3 text-sm font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <span className="flex items-center gap-2">
            {/* className="h-5 w-5 rounded-full"  */}
            <b className=" rounded-full"> {type.name}</b>
          </span>

          <IoChevronDownOutline
            className="-mr-1 ml-2 text-black"
            aria-hidden="true"
          />
        </MenuButton>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute z-50 max-h-[184px] overflow-auto right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <span className="px-1 py-1 ">
              {types.map((prop, i: number) => {
                return (
                  <MenuItem key={i}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-primary text-white" : "text-gray-900"
                        } group flex gap-2 w-full items-center justify-start rounded-md px-2 py-2 text-sm cursor-pointer`}
                        onClick={() => handleTypeChange({ name: prop.name, value: prop.value })}
                      >
                        <span className="text-lg truncate">{prop.name} </span>
                      </button>
                    )}
                  </MenuItem>
                );
              })}
            </span>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
