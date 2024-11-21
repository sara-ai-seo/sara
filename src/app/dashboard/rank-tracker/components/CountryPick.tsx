import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import countries from "../../../../app/utils/CountriesAndCode.json";

export interface Country {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
        common: string;
      };
    };
  };
}

interface Prop {
  title?: string;
  className?: string;
}

interface CountryPickProps {
  className?: string;
  setCountry?: React.Dispatch<SetStateAction<Country | null>>;
}

export default function CountryPick({
  className,
  setCountry,
}: CountryPickProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  // console.log(currentCountry);

  async function getCountries() {
    const res = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );
    setCountries(res.data);
    setCurrentCountry(res.data[0]);
  }
  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    setCountry && setCountry(currentCountry);
  }, [currentCountry]);

  return (
    <div className=" text-right">
      <Menu
        as="div"
        className={`${className} w-[184px] shadow-sm h-38px  relative inline-block text-left`}
      >
        <Menu.Button className="inline-flex w-full justify-between rounded-lg text-black p-3 text-sm font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          {currentCountry ? (
            <span className="flex items-center gap-2">
              <img
                src={currentCountry.flags.svg}
                alt={currentCountry.flags.alt}
                className="h-5 w-5 rounded-full"
              />
              <b className="">{currentCountry.name.common} </b>
            </span>
          ) : (
            <span>Loading...</span>
          )}
          <IoChevronDownOutline
            className="-mr-1 ml-2 h-5 w-5 text-black"
            aria-hidden="true"
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 max-h-[184px] overflow-auto right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {countries &&
                countries.map((prop: Country, i: number) => {
                  return (
                    <Menu.Item key={i}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-primary text-white" : "text-gray-900"
                          } group flex gap-2 w-full items-center justify-start rounded-md px-2 py-2 text-sm cursor-pointer`}
                          onClick={() => {
                            setCurrentCountry(prop);
                            // setCountry && setCountry(prop);
                          }}
                        >
                          <img
                            src={prop.flags.svg}
                            alt={prop.flags.alt}
                            className="h-5 w-5 rounded-full"
                          />
                          <span className="text-lg truncate">
                            {prop.name.common}{" "}
                          </span>
                        </button>
                      )}
                    </Menu.Item>
                  );
                })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export function CountryPickAllLocationDefault({
  title = "Select location",
  className,
}: Prop) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  // console.log(countries);

  async function getCountries() {
    const res = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );
    setCountries(res.data);
  }
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="  text-right">
      <Menu
        as="div"
        className={`${className} w-[184px] shadow-sm h-38px  relative inline-block text-left`}
      >
        <Menu.Button className="inline-flex w-full justify-between rounded-lg text-black p-3 text-sm font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          {currentCountry ? (
            <span className="flex items-center gap-2">
              <img
                src={currentCountry.flags.svg}
                alt={currentCountry.flags.alt}
                className="h-5 w-5 rounded-full"
              />
              <b className="">{currentCountry.name.common} </b>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CiGlobe className="h-5 w-5 rounded-full" />
              <b className="">{title} </b>
            </span>
          )}
          <IoChevronDownOutline
            className="-mr-1 ml-2 h-5 w-5 text-black"
            aria-hidden="true"
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 max-h-[184px] overflow-auto right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <span className="px-1 py-1 ">
              {countries &&
                countries.map((prop: Country, i: number) => {
                  return (
                    <Menu.Item key={i}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-primary text-white" : "text-gray-900"
                          } group flex gap-2 w-full items-center justify-start rounded-md px-2 py-2 text-sm cursor-pointer`}
                          onClick={() => setCurrentCountry(prop)}
                        >
                          <img
                            src={prop.flags.svg}
                            alt={prop.flags.alt}
                            className="h-5 w-5 rounded-full"
                          />
                          <span className="text-lg truncate">
                            {prop.name.common}{" "}
                          </span>
                        </button>
                      )}
                    </Menu.Item>
                  );
                })}
            </span>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
