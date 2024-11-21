"use client";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import { Fragment, useEffect, useState } from "react";
import FilledButton from "../../FilledButton";
import PlainButton from "../../PlainButton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { currentNav, setCurrentState } from "@/redux/features/navSlice";
import { RootState } from "@/app/store";
import { PopoverComponent } from "@/app/dashboard/components/ui/PopOver";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

export default function Nav() {
  const [show, setShow] = useState(false);
  // const [resources, setResources] = useState(false)
  // const [features, setFeatures] = useState(false)

  const router = useRouter();
  const navstate = useSelector(currentNav);
  const dispatch = useDispatch();

  const resource = [
    {
      title: "Blog",
      description: "The latest industry news, updates and info.",
      file: "/blog.png",
      link: "/blog",
    },
    {
      title: "Documentation",
      description: "All the boring stuff that you (hopefully won’t) need.",
      file: "/file.png",
      link: "/",
    },
    {
      title: "Help and support",
      description: "Learn, fix a problem, and get answers to your questions.",
      file: "/help.png",
      link: "/help",
    },
  ];

  const feature = [
    {
      title: "Technical SEO audit",
      description: `Run an AI-driven audit to analyze and improve your website's SEO health.`,
      file: "/seo.png",
      link: "/seo-audit",
    },
    {
      title: "Rank tracker",
      description: `Discover strategic keywords for your industry and target audience.`,
      file: "/rank.png",
      link: "/rank",
    },
    {
      title: "Smart keyword explorer",
      description: `Discover strategic keywords for your industry and target audience.`,
      file: "/keyword.png",
      link: "/keyword",
    },
    {
      title: "Optimization recommendations",
      description: `Customized recommendations for your website based on your SEO audit.`,
      file: "/optimize.png",
      link: "/optimize",
    },
    {
      title: "Semantic content analysis",
      description: `Enhance your content's relevance with semantic analysis.`,
      file: "/content.png",
      link: "/keyword",
    },
    {
      title: "Competitor analysis",
      description: `Compare your SEO metrics with competitors and gain insights.`,
      file: "/competitor.png",
      link: "/keyword",
    },
    {
      title: "Link building",
      description: `Explore potential websites for building valuable backlinks.`,
      file: "/link.png",
      link: "/keyword",
    },
  ];

  useEffect(() => {});
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <main className="w-full z-30 justify-between flex items-center font-normal h-[72px] bg-secondary p-2 ">
      <div className=" items-center h-full gap-8 flex w-full">
        <Link href={`/`} className="flex items-center h-full ">
          <Image
            src={`/logo.png`}
            alt="Webmaxi Logo"
            width={145}
            height={24}
            className=""
          />
        </Link>
        <Link href="/" className="text-base font-semibold hidden lg:flex">
          {" "}
          Home
        </Link>
        {/* { user !== undefined && <Link href="/dashboard" className="text-base font-semibold p-3 "> Dashboard</Link>} */}

        <Menu as="div">
          <MenuButton className=" hidden lg:inline-flex items-center gap-1 rounded-md  font-semibold  shadow-inner shadow-white/10 focus:outline-none ">
            Features
            <MenuButton className="data-[active]:transform data-[active]:rotate-180">
              <IoIosArrowDown />
            </MenuButton>
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition duration-150 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <MenuItems
              // anchor="top start"
              anchor={{ to: "top" }}
              className="w-[790px] translate-x-10 origin-top-right grid grid-cols-2 gap-5 bg-white p-8 shadow-md rounded-md font-normal border border-white/5  text-sm/6  transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              {feature.map((item) => {
                return (
                  <MenuItem>
                    <div
                      className="flex z-50 h-full text-base p-2 hover:bg-blue-200 hover:rounded-md items-start w-full gap-3"
                      onClick={() => router.push(`${item.link}`)}
                    >
                      <Image
                        src={item.file}
                        alt={item.description}
                        className="mt-1"
                        height={24}
                        width={24}
                      />
                      <div className=" flex flex-col w-full h-full overflow-auto">
                        <p className=" font-semibold text-base">
                          {item.title}{" "}
                        </p>
                        <small className=" text-sm">{item.description} </small>
                      </div>
                    </div>
                  </MenuItem>
                );
              })}
            </MenuItems>
          </Transition>
        </Menu>

        <Menu>
          <MenuButton className="hidden lg:inline-flex items-center gap-1 rounded-md  font-semibold  shadow-inner shadow-white/10 focus:outline-none ">
            Resources
            <MenuButton className="data-[active]:transform data-[active]:rotate-180">
              <IoIosArrowDown />
            </MenuButton>
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition duration-150 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <MenuItems
              // anchor="top"
              anchor={{ to: "top" }}
              className="bg-white font-normal flex flex-col gap-2 w-[320px] p-6 shadow-md rounded-md"
            >
              {resource.map((item) => {
                return (
                  <MenuItem key={item.title}>
                    <div
                      className="flex h-full text-base p-2 items-start hover:bg-blue-200 hover:rounded-md  w-full gap-3"
                      onClick={() => router.push(`${item.link}`)}
                    >
                      <Image
                        src={item.file}
                        alt={item.description}
                        className="mt-1"
                        height={24}
                        width={24}
                      />
                      <div className=" flex flex-col w-full h-full overflow-auto">
                        <p className=" font-semibold text-base">
                          {item.title}{" "}
                        </p>
                        <small className=" text-sm">{item.description} </small>
                      </div>
                    </div>
                  </MenuItem>
                );
              })}
            </MenuItems>
          </Transition>
        </Menu>

        <Link
          href={"/pricing"}
          className="text-base cursor-pointer items-center font-semibold gap-1 hidden lg:flex"
        >
          {" "}
          Pricing{" "}
        </Link>
      </div>
      <div className=" items-center justify-end h-full gap-6 lg:flex w-full hidden ">
        {user.id === 0 ? (
          <>
            <Link href={`login`} className=" text-lg font-semibold">
              {" "}
              Login{" "}
            </Link>
            <Link
              href={`/signup`}
              className=" bg-primary font-semibold px-4 py-3 shadow rounded-md text-white text-lg"
            >
              Sign up{" "}
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="text-base font-semibold p-3 ">
              {" "}
              Dashboard
            </Link>
            <PopoverComponent />
          </>
        )}
      </div>

      {/* Mobile Menu  */}
      <div className="flex items-center justify-end lg:hidden h-full w-full relative">
        <IoMdMenu className="" onClick={() => setShow(true)} />
        {show && (
          //py-6
          <section className="h-screen bg-white text-[rgb(16,24,40)] overflow-auto w-screen max-w-[500px] absolute transition-transform duration-300 ease-in-out  right-0 -top-3 transform translate-x-0">
            <div className=" h-[72px] w-full flex justify-between items-center bg-secondary p-2">
              <Link href={`/`} className="flex items-center h-full px-2">
                <Image
                  src={`/logo.png`}
                  alt="Webmaxi Logo"
                  width={145}
                  height={24}
                  className=""
                />
              </Link>
              <span
                className=" font-semibold absolute text-2xl right-2 top-6 cursor-pointer hover:bg-primary hover:text-white p-1 rounded-full transition-all duration-300"
                onClick={() => setShow(false)}
              >
                <IoClose />
              </span>
            </div>

            <div className="flex flex-col justify-between h-full w-full overflow-auto ">
              <div className="flex p-4 overflow-auto w-full flex-col transition-all duration-300 ease-in-out">
                <Link href="/" className="text-base font-semibold p-3 ">
                  {" "}
                  Home
                </Link>
                {user !== undefined && (
                  <Link
                    href="/dashboard"
                    className="text-base font-semibold p-3 "
                  >
                    {" "}
                    Dashboard
                  </Link>
                )}
                <span
                  className="text-base cursor-pointer overflow-scroll h-full items-center font-semibold p-3 flex gap-1 justify-between w-full "
                  onClick={() => {
                    navstate.current === "features"
                      ? dispatch(setCurrentState(""))
                      : dispatch(setCurrentState("features"));
                  }}
                >
                  <span className="flex w-full justify-between items-center">
                    {" "}
                    Features{" "}
                    <IoIosArrowDown
                      className={`${
                        navstate.current == "features" && "scale-y-[-1]"
                      }`}
                    />{" "}
                  </span>
                </span>
                <div className=" h-full">
                  {navstate.current === "features" && (
                    <div className="p-2 mt-4 m-2 h-full transition-all duration-300 ease-linear border rounded-lg shadow-md w-full flex flex-col overflow-auto">
                      {feature.map((item) => {
                        return (
                          <div
                            key={item.link}
                            className="flex h-full text-base p-2 items-start w-full gap-3"
                            onClick={() => router.push(`${item.link}`)}
                          >
                            <Image
                              src={item.file}
                              alt={item.description}
                              className="mt-1"
                              height={24}
                              width={24}
                            />
                            <div className=" flex flex-col w-full h-full overflow-auto">
                              <p className=" font-semibold text-base">
                                {item.title}{" "}
                              </p>
                              <p className=" text-sm">{item.description} </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                {/* <Menu>
                  <MenuButton className="inline-flex items-center gap-2 justify-between rounded-md py-1.5 px-3  font-semibold shadow-inner shadow-white/10 focus:outline-none   data-[focus]:outline-1 data-[focus]:outline-white">
                    Features
                    <MenuButton className="data-[active]:transform data-[active]:rotate-180">
                      <IoIosArrowDown />
                    </MenuButton>
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition duration-150 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-100 ease-in"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <MenuItems
                      anchor="bottom end"
                      className="w-fit z-40 bg-red-400 grid grid-cols-1 origin-top-right rounded-xl border p-1 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                      {feature.map((item) => {
                        return (
                          <MenuItem>
                            <div
                              className="flex h-full text-base p-2 items-start w-full gap-3"
                              onClick={() => router.push(`${item.link}`)}
                            >
                              <Image
                                src={item.file}
                                alt={item.description}
                                className="mt-1"
                                height={24}
                                width={24}
                              />
                              <div className=" flex flex-col w-full h-full overflow-auto">
                                <p className=" font-semibold text-base">
                                  {item.title}{" "}
                                </p>
                                <p className=" text-sm">{item.description} </p>
                              </div>
                            </div>
                          </MenuItem>
                        );
                      })}
                    </MenuItems>
                  </Transition>
                </Menu> */}

                <span
                  className="text-base overflow-auto h-full cursor-pointer items-center font-semibold p-3 gap-1 flex   justify-between w-full"
                  onClick={() => {
                    navstate.current === "resources"
                      ? dispatch(setCurrentState(""))
                      : dispatch(setCurrentState("resources"));
                  }}
                >
                  {" "}
                  Resources
                  <IoIosArrowDown
                    className={`${
                      navstate.current === "resources" && "scale-y-[-1]"
                    }`}
                  />
                </span>
                {navstate.current === "resources" && (
                  <div className="p-2 mt-4 m-2 h-full  border rounded-lg shadow-md w-full flex flex-col">
                    {resource.map((item) => {
                      return (
                        <div
                          key={item.link}
                          className="flex h-full text-base p-2 items-start w-full gap-3"
                          onClick={() => router.push(`${item.link}`)}
                        >
                          <Image
                            src={item.file}
                            alt={item.description}
                            className="mt-1"
                            height={24}
                            width={24}
                          />
                          <div className=" flex flex-col w-full">
                            <p className=" font-semibold text-base">
                              {item.title}{" "}
                            </p>
                            <p className=" text-sm">{item.description} </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <span
                  className="text-base cursor-pointer items-center font-semibold p-3"
                  onClick={() => router.push("/pricing")}
                >
                  {" "}
                  Pricing{" "}
                </span>
              </div>

              <div className="flex p-3 flex-col gap-3">
                {user === undefined ? (
                  <>
                    <FilledButton
                      title="Sign up"
                      handleClick={() => router.push("/signup")}
                    />
                    <PlainButton
                      title="Login"
                      handleClick={() => router.push("/login")}
                    />
                  </>
                ) : (
                  <PopoverComponent />
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
