"use client";
import React from "react";
import EmptyState from "./components/EmptyState";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { useQuery } from "@tanstack/react-query";
import { CurrentProperty } from "@/app/utils/currentProperty";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const getState = useSelector((state: RootState) => state);
  //handle when id is undefined.

  const id = getState.property.activePropertyObj.id;

  console.log(getState.updateDataState);

  const updateDataStatus =
    getState.updateDataState.page == "content-analysis" &&
    getState.updateDataState.state === "empty";

  const { data, isError, isLoading } = useQuery({
    queryKey: ["empty-state", id],
    queryFn: async () => {
      const result = await ApiCall.get(
        `/user/crawler/content-analysis/by-tab/${id}?tab=extractedOverview`
      );
      return result.data; // Ensure the data is returned
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  if (id === undefined) {
    return <div>No project found or selected</div>;
  }

  return (
    <>
      {(data && data.project.crawlings.length === 0) || updateDataStatus ? (
        <EmptyState />
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}
