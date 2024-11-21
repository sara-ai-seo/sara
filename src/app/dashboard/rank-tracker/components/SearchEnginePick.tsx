import React, { useState } from "react";
import { Menu, MenuButton, Transition, MenuItems, MenuItem } from "@headlessui/react";
import { Fragment } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { BsBing } from "react-icons/bs";

interface Engines {
  name: string;
  icon: React.ReactNode;
  value: string;
}

export const engines = [
  { name: "Google", icon: <FcGoogle />, value: "google" },
  { name: "Bing", icon: <BsBing />, value: "bing" },
];

interface SearchEnginePickProps {
  className?: string;
  onEngineChange?: (engine: string) => void;
}

export default function SearchEnginePick({ className, onEngineChange }: SearchEnginePickProps) {
  const [currentEngine, setCurrentEngine] = useState<Engines>({
    name: engines[0].name,
    icon: engines[0].icon,
    value: engines[0].value,
  });

  const handleChange = (engine: Engines) => {
    setCurrentEngine(engine);
    onEngineChange?.(engine.value); 
  };

  return (
    <div className="text-right">
      <Menu
        as="div"
        className={`${className} w-[184px] shadow-sm h-38px relative inline-block text-left`}
      >
        <MenuButton className="inline-flex w-full justify-between rounded-lg text-black p-3 text-sm font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <span className="flex items-center gap-2">
            <span className="rounded-full">{currentEngine.icon}</span>
            <b>{currentEngine.name}</b>
          </span>

          <IoChevronDownOutline className="-mr-1 ml-2 text-black" aria-hidden="true" />
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
            <div className="px-1 py-1">
              {engines.map((engine, i: number) => (
                <MenuItem key={i}>
                  {({ active }) => (
                    <button
                      className={`${active ? "bg-primary text-white" : "text-gray-900"
                        } group flex gap-2 w-full items-center justify-start rounded-md px-2 py-2 text-sm cursor-pointer`}
                      onClick={() => handleChange(engine)} 
                    >
                      <span className="rounded-full">{engine.icon}</span>
                      <span className="text-lg truncate">{engine.name}</span>
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}