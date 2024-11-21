"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export function CurrentProperty() {
  const property = useSelector(
    (state: RootState) => state.property.activePropertyObj
  );
  return property;
}
