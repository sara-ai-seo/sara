"use client";
import {
  Menu,
  MenuItem,
  MenuItems,
  Transition,
  MenuButton,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { PropertyType } from "@/types/PropertyType";
import { useDispatch } from "react-redux";
import {
  activePropertyType,
  setActiveProperty,
  setActivePropertyObj,
} from "@/redux/features/propertySlice";
import { useQuery } from "@tanstack/react-query";
import ApiCall from "../utils/apicalls/axiosInterceptor";

export default function DropdownMenu() {
  const property = useSelector(
    (state: RootState) => state.property.allProperty
  );

  const activeProperty = useSelector(
    (state: RootState) => state.property.activeProperty
  );
  const activePropertyObj = useSelector(
    (state: RootState) => state.property.activePropertyObj
  );
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  // console.log("activeProperty",activeProperty)

  const { data, isError, isPending, isSuccess } = useQuery({
    queryKey: ["all_property"],
    queryFn: async () => {
      return ApiCall.get(`/user/project`);
    },
  });

  // console.log("DATA:",data?.data.projects)

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return null;
  // }
  return (
    <div className="text-right">
      <Menu
        as="div"
        className=" xl:min-w-[300px] lg:w-[200px] min-[375px]:w-[300px] w-[250px] relative inline-block text-left"
      >
        <MenuButton className="inline-flex w-full justify-between rounded-lg text-black p-3 text-sm font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          {/* { property && property.activeProperty?.length < 1 ? "Domain name" : property.activeProperty} */}
          {(data?.data?.projects?.length ?? []) > 0 ? (
            activePropertyObj.domain
          ) : (
            <p className="text-gray-600"> {`Domain name`} </p>
          )}

          <IoChevronDownOutline
            className="-mr-1 ml-2 h-5 w-5 text-black"
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
          <MenuItems className="absolute z-50 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <span className="px-1 py-1 ">
              {/* {JSON.stringify(property)} */}
              {property.map((prop: activePropertyType) => {
                return (
                  <MenuItem key={prop.domain ?? ""}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-primary text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => dispatch(setActivePropertyObj(prop))}
                      >
                        {prop.domain}
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
