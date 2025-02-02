"use client";
import {
  Menu,
  MenuItem,
  MenuItems,
  Transition,
  MenuButton,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { PropertyType } from "@/types/PropertyType";
import { useDispatch } from "react-redux";
import {
  activePropertyType,
  setActiveProperty,
  setActivePropertyObj,
  setAllProperty,
} from "@/redux/features/propertySlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ApiCall from "../utils/apicalls/axiosInterceptor";
import { MdOutlineDeleteOutline } from "react-icons/md";
import DeleteProject from "./modals/DeleteProject";
import toast from "react-hot-toast";

export default function DropdownMenu() {
  const property = useSelector(
    (state: RootState) => state.property.allProperty
  );
  const activePropertyObj = useSelector(
    (state: RootState) => state.property.activePropertyObj
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, isError, isPending, isSuccess } = useQuery({
    queryKey: ["all_property"],
    queryFn: async () => {
      const response = await ApiCall.get(`/user/project`);
      dispatch(setAllProperty(response.data.projects));
      return response;
    },
    // Add these options to ensure proper updates
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  async function handleProjectDelete(id: number) {
    try {
      const project = await ApiCall.delete(`/user/project/${id}`);
      if (project.status === 204) {
        // If the deleted project was active, reset it
        if (activePropertyObj.id === id) {
          dispatch(setActivePropertyObj({}));
        }
  
        // Fetch the updated data immediately
        const updatedData = await ApiCall.get(`/user/project`);
        dispatch(setAllProperty(updatedData.data.projects));
  
        // Invalidate the query to ensure cache is updated
        await queryClient.invalidateQueries({ queryKey: ["all_property"] });
  
        toast.success("Project deleted successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      // ... error handling remains the same
    }
  }

  return (
    <div className="text-right">
      <Menu
        as="div"
        className="xl:min-w-[300px] lg:w-[200px] min-[375px]:w-[300px] w-[250px] relative inline-block text-left"
      >
        <MenuButton className="inline-flex w-full justify-between rounded-lg text-black p-3 text-sm font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          {(data?.data?.projects?.length ?? []) > 0 ? (
            activePropertyObj.domain
          ) : (
            <p className="text-gray-600">{`Domain name`}</p>
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
            <span className="px-1 py-1">
              {property.map((prop: activePropertyType) => (
                <MenuItem key={prop.domain ?? ""}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm justify-between`}
                      onClick={() => dispatch(setActivePropertyObj(prop))}
                    >
                      <span className="">{prop.domain}</span>
                      <span
                        className="flex group cursor-pointer text-gray-500 items-center rounded-full p-2 hover:bg-gray-200 group-hover:text-gray-400 justify-self-end"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        title={`Delete`}
                      >
                        <DeleteProject
                          projectId={prop.id}
                          handleDelete={() => handleProjectDelete(prop.id)}
                          project={prop.domain}
                        />
                      </span>
                    </button>
                  )}
                </MenuItem>
              ))}
            </span>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}