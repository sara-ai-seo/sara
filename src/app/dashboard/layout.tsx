"use client";
import { useEffect, useState } from "react";
import { BsLightningCharge } from "react-icons/bs";
import { CiSearch, CiSettings } from "react-icons/ci";
import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import { RxDashboard, RxDoubleArrowLeft } from "react-icons/rx";
import { BsActivity } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import {
  FiKey,
  FiMessageSquare,
  FiCheckSquare,
  FiBarChart2,
} from "react-icons/fi";
import { HiOutlineSupport } from "react-icons/hi";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setModal } from "@/redux/features/modalstates";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MainModal from "../component/modals/MainModal";
import AddProject from "./components/AddProject";
import ApiCall from "../utils/apicalls/axiosInterceptor";
import { PropertyType } from "@/types/PropertyType";
import { fetchPerformanceSuccess } from "@/redux/features/performanceMetric slice";
import {
  setActiveProperty,
  setActivePropertyObj,
  setAllProperty,
} from "@/redux/features/propertySlice";
import DashboardOverviewPlaceholder from "./components/DashboardOverviewPlaceholder";
import DropdownMenu from "../component/Dropdown";
import UserProfile from "./components/UserProfile";
import { removeTrailingSlash } from "../utils/RemoveSlash";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader, { LoaderPulse } from "../component/Loader";
import { isAllOf } from "@reduxjs/toolkit";
import { PopoverComponent } from "./components/ui/PopOver";
// import CheckUserType from "./components/CheckUserType";
import Button from "./components/ui/Button";
import AutoModal from "../component/modals/AutoModal";
import Error from "next/error";
import FullpageLoader, { LoadingComp } from "../component/FullpageLoader";
import { FiPlus } from "react-icons/fi";
import { RiSearchLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AccountAvatarDropDown } from "./components/ui/AccountAvatarDropdown";

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  const [fullWidth, setFullWidth] = useState(false);
  // const [property, setProperty] = useState<PropertyType[]>([]);
  const [err, _setErr] = useState({ status: false, msg: "" });
  const [isloading, _setisLoading] = useState(false);
  // const [show, setShow] = useState(false);
  const [showOneProject, setShowOneProject] = useState(false);

  const menus = [
    { title: "Dashboard", icon: <RxDashboard />, link: "/dashboard" },
    {
      title: "Technical SEO",
      icon: <BsActivity />,
      link: "/dashboard/technical-seo",
    },
    {
      title: "Rank tracker",
      icon: <FiBarChart2 />,
      link: "/dashboard/rank-tracker",
    },
    {
      title: "Keyword explorer",
      icon: <FiKey />,
      link: "/dashboard/keyword-explorer",
    },
    {
      title: "Content analysis",
      icon: <FaRegFileAlt />,
      link: "/dashboard/content-analysis",
    },
    {
      title: "Competitor analysis",
      icon: <FiUsers />,
      link: "/dashboard/competitor-analysis",
    },
    {
      title: "Link building",
      icon: <IoIosLink />,
      link: "/dashboard/link-building",
    },
    {
      title: "Optimization plans",
      icon: <FiCheckSquare />,
      link: "/dashboard/optimization-plans",
    },
  ];

  const othermenu = [
    {
      title: "Feedback",
      icon: <FiMessageSquare />,
      link: "/dashboard/feedback",
    },
    {
      title: "Support",
      icon: <HiOutlineSupport />,
      link: "/dashboard/support",
    },
    { title: "Support", icon: <CiSettings />, link: "/dashboard/settings" },
  ];

  const pathname = usePathname();
  const router = useRouter();

  const isActive = (link: string) => {
    // const currentPath = pathname.split('/')[1];
    if (link === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(link);
  };

  const modalState = useSelector(
    (state: RootState) => state.currentModal.currentModal
  );
  const activeProperty = useSelector(
    (state: RootState) => state.property.activeProperty
  );
  const activePropertyObj = useSelector(
    (state: RootState) => state.property.activePropertyObj
  );
  const property = useSelector(
    (state: RootState) => state.property.allProperty
  );
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);
  const loading = useSelector((state: RootState) => state.loading.loading);

  // console.log("PROPERTY",activePropertyObj )
  const { data: dashboardData, isSuccess } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      // const response = await ApiCall.get("/crawl/overall", {
      //   params: {
      //     url: removeTrailingSlash(activeProperty),
      //     limit: 100,
      //   },
      // });
      const response = await ApiCall.get(
        `user/project/${activePropertyObj.id}`
      );

      return response.data[0];
    },
  });

  // console.log("DD", property)

  // useEffect(() => {
  //   if (!token) {
  //     router.push("/login");
  //   }
  // }, [token, router]);

  const dispatch = useDispatch();

  const getProjects = async () => {
    try {
      const res = await ApiCall.get("/user/project");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (res.data.projects.length === 0) {
        dispatch(setActiveProperty(""));
        dispatch(setActivePropertyObj(""));
        //  console.log("RES", res.data.projects)
        return;
      }
      if (res.status === 200) {
        dispatch(setAllProperty(res.data.projects));
        // console.log("RES", res.data.projects);
        activeProperty.length < 1 &&
          dispatch(
            setActiveProperty(removeTrailingSlash(res.data[0]?.projects.domain))
          );

        activePropertyObj.domain.length < 1 &&
          dispatch(setActivePropertyObj(res.data[0]?.projects));
        return res.data;
      }
    } catch (err: any) {
      console.error("Error fetching projects:", err?.response?.status ?? "");
      if (err?.response?.status === 401) {
        router.push("/login");
      }
      return [];
    }
  };

  const fetchDashboardData = async () => {
    const response = await ApiCall.get(`user/project/${activePropertyObj?.id}`);

    dispatch(fetchPerformanceSuccess(response?.data));
  };
  useEffect(() => {
    const fetchProjects = async () => {
      getProjects();
    };
    fetchProjects();
    activeProperty.length ? fetchDashboardData() : "";
  }, [activeProperty]);

  const handleRoutes = (e: { preventDefault: () => void }, link: string) => {
    // if (link !== "/dashboard" && user.account_type !== "paid") {
    //   e.preventDefault();
    //   setShow(true);
    // } else {
    window.location.href = link;
    // }
  };

  // function closeModal() {
  //   setShow(false);
  // }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  function openProjectModal() {
    dispatch(setModal("addProject"));
  }
  // console.log("PL", property)
  return (
    <>
      <div>
        {modalState === "addProject" && (
          <MainModal
            closeModal={() => dispatch(setModal(""))}
            ModalBody={AddProject}
          />
        )}
        {/* {show && (
          <AutoModal
            closeModal={() => setShow(false)}
            ModalBody={<CheckUserType close={closeModal} />}
          />
        )} */}
        {/* {showOneProject && (
          <AutoModal
            closeModal={() => setShowOneProject(false)}
            ModalBody={
              <CheckUserType
                close={() => setShowOneProject(false)}
                description="Subscribe to be able to add more projects"
              />
            }
          />
        )} */}

        <main className={`h-screen w-full flex overflow-clip`}>
          {/* drawer... */}

          <section
            style={{ width: fullWidth ? "300px" : "60px" }}
            className={`bg-darkPrimary hidden p-4 h-screen overflow-clip z-40 lg:flex flex-col justify-between  relative transition-all duration-300 ease-in-out`}
          >
            <div
              className="absolute right-0 z-50 top-12 p-1.5 bg-white border shadow-md rounded-md cursor-pointer"
              onClick={() => setFullWidth(!fullWidth)}
            >
              <RxDoubleArrowLeft
                className={`${
                  !fullWidth && "scale-x-[-1]"
                } duration-300 transition-all ease-out`}
              />
            </div>

            <div className="grid ">
              <Link href={`/`}>
                <Image
                  src={`${
                    fullWidth ? "/home/white-logo.png" : "/home/mobile-logo.png"
                  }`}
                  className=" pt-2"
                  alt="Webmaxi Logo"
                  height={24}
                  width={124}
                />
              </Link>

              <div className="grid gap-2 mt-12">
                {menus.map((menu) => {
                  return (
                    <a
                      key={menu.link}
                      onClick={(e) => handleRoutes(e, menu.link)}
                      href={`${menu.link}`}
                      className={` ${
                        isActive(menu.link) ? " text-white bg-[#1570EF]" : ""
                      }  hover:text-white hover:scale-105 transition-all duration-300 ease-in-out p-2 rounded-md flex  text-[#84CAFF] items-center gap-2`}
                    >
                      {menu.icon}
                      {fullWidth && menu.title}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-4">
              {othermenu.map((menu) => {
                return (
                  <a
                    onClick={(e) => handleRoutes(e, menu.link)}
                    key={menu.link}
                    href={`${menu.link}`}
                    className={`flex  ${
                      isActive(menu.link) ? " text-white bg-[#1570EF]" : ""
                    } hover:text-white hover:scale-105 transition-all duration-300 ease-in-out text-[#84CAFF] items-center gap-2`}
                  >
                    {menu.icon}
                    {fullWidth && menu.title}
                  </a>
                );
              })}
            </div>
          </section>

          <section className={`w-full h-screen `}>
            <div className="flex md:px-8 lg:hidden items-center justify-between w-full p-2 md:p-4">
              <Image
                src={`/logo.png`}
                className="pt-2"
                alt="Webmaxi Logo"
                height={24}
                width={124}
              />
              <IoMdMenu className="text-3xl" />
            </div>
            <hr className="w-full mt-1 flex md:hidden" />

            <div className="flex z-0 w-full gap-2 p-2  md:px-8 justify-between items-center h-16">
              <div className="flex gap-2 w-full items-center lg:w-auto ">
                <DropdownMenu />
                <div className="">
                  {/* <div className="w-full"> */}
                  <Button
                    className="xl:w-[140px] rounded-lg flex items-center gap-4 py-3 bg-primary text-white font-semibold"
                    onClick={openProjectModal}
                  >
                    <FiPlus className="" />
                    <span className={`hidden sm:flex text-sm `}>
                      {" "}
                      Add project{" "}
                    </span>
                  </Button>
                  {/* </div> */}

                  {/* {JSON.stringify(property)} */}
                  {/* {JSON.stringify(activeProperty)} */}
                  {/* {JSON.stringify(activePropertyObj)} */}
                  {/* {JSON.stringify(dashboardData)} */}
                </div>
              </div>
              <div className="lg:flex w-full justify-end hidden">
                <div className="flex items-center justify-end w-full gap-4">
                  <Link
                    href={"/pricing"}
                    className=" cursor-pointer gap-2 border rounded-lg  border-[#D0D5DD] 2xl:text-base text-sm p-3 flex items-center text-[#344054] font-semibold"
                  >
                    <BsLightningCharge /> Upgrade now
                  </Link>
                  <RiSearchLine className="size-10 hover:bg-gray-200 rounded-md p-2 cursor-pointer" />
                  <IoIosNotificationsOutline className="size-10 hover:bg-gray-200 rounded-md p-2 cursor-pointer" />
                  {/* <PopoverComponent /> */}
                  <AccountAvatarDropDown />
                </div>
              </div>
            </div>
            <hr className="w-full  hidden md:flex " />
            {/* {isloading ? (
              <LoaderPulse />
            ) : property.length < 1 || dashboardData === undefined ? (
              <DashboardOverviewPlaceholder />
            ) : (
              <div className=" w-full h-full overflow-auto p-2 md:p-8">
                {children}
              </div>
            )} */}
            <div className=" w-full h-full overflow-auto p-2 md:p-8">
              {property?.length < 1 ? (
                <DashboardOverviewPlaceholder />
              ) : (
                children
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

// Dayvid4444@ dayvid4444@admires.store
