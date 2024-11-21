import React from "react";
import Loader, { LoadingState } from "./Loader";
import { BiLoader } from "react-icons/bi";
interface ButtonProps {
  className?: string;
  title: string;
  handleClick?: () => void;
  loading?: boolean;
  icon?: React.ReactNode;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
}
export default function FilledButton({
  className,
  title,
  disabled,
  handleClick,
  icon,
  loading,
  type,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} w-full flex gap-2 items-center relative rounded-lg justify-center text-base px-5 p-3 cursor-pointer bg-primary text-white font-semibold hover:bg-blue-500`}
      onClick={handleClick}
    >
      <span> {icon} </span>
      <span> {title} </span>
      <span>
        {" "}
        {loading && (
          <span className=" absolute right-2 top-1/2 -translate-y-1/2">
            {" "}
            <BiLoader className="w-full  animate-spin text-white" />{" "}
          </span>
        )}{" "}
      </span>
    </button>
  );
}

interface ButtonFilledProps {
  title: string;
  handleClick: () => void;
  loading?: boolean;
}
export function ButtonFilled({
  title,
  handleClick,
  loading,
}: ButtonFilledProps) {
  return (
    <button
      disabled={loading}
      className={`w-full flex items-center gap-2 justify-center rounded-lg text-base px-5 p-2 bg-primary text-white font-semibold hover:bg-blue-500`}
      onClick={handleClick}
    >
      {title}{" "}
      {loading && (
        <span>
          {" "}
          <BiLoader className=" animate-spin text-white" />{" "}
        </span>
      )}
    </button>
  );
}
export function ButtonOutlined({
  title,
  handleClick,
  loading,
}: ButtonFilledProps) {
  return (
    <button
      disabled={loading}
      className={`w-full flex border items-center gap-2 justify-center rounded-lg text-base px-5 p-2 text-primary font-semibold hover:bg-blue-100`}
      onClick={handleClick}
    >
      {title}{" "}
      {loading && (
        <span>
          {" "}
          <BiLoader className="w-full  animate-spin text-white" />{" "}
        </span>
      )}
    </button>
  );
}
