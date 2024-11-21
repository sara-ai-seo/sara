import { IoSearchOutline } from "react-icons/io5";
import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { Select } from "@headlessui/react";
import {countries} from "../../component/data/countries";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  wrapperClassName?: string;
  isShowLabel?: boolean;
  labelName?: string;
  onChange?: any
}

interface InputAndCountryFlagProps
  extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  wrapperClassName?: string;
  isShowLabel?: boolean;
  labelName?: string;
}

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  wrapperClassName?: string;
  isShowLabel?: boolean;
  labelName?: string;
  rows?: number;
  cols?: number;
}

export default function Input({
  className,
  wrapperClassName,
  isShowLabel,
  labelName,
  ...props
}: InputProps) {
  return (
    <span className={`flex flex-col ${wrapperClassName}`}>
      {isShowLabel && <label htmlFor="">{labelName}</label>}
      <div className="relative">
        <input
          {...props}
          className={twMerge(
            `rounded-md h-11 w-full px-3 active:border active:border-[#D1E9FF] focus:border-[#D1E9FF]  outline-none border-2 border-gray-200 ${
              props.type === "search" && "placeholder:pl-4"
            }  peer`,
            className
          )}
        />
        {props.type === "search" && (
          <IoSearchOutline className="absolute left-2 top-3 text-xl text-gray-400 peer-focus:hidden" />
        )}
      </div>
    </span>
  );
}




export function TextArea({
  className,
  wrapperClassName,
  isShowLabel,
  labelName,
  rows = 4,
  cols = 30,
  ...props
}: TextAreaProps) {
  return (
    <span className={`flex flex-col ${wrapperClassName}`}>
      {isShowLabel && <label htmlFor="">{labelName}</label>}
      <div className="relative">
        <textarea
          {...props}
          rows={rows}
          cols={cols}
          className={twMerge(
            `rounded-md p-3 resize-none active:border active:border-[#D1E9FF] focus:border-[#D1E9FF] outline-none border-2 border-gray-200 peer`,
            className
          )}
        />
      </div>
    </span>
  );
}

export function InputAndCountryFlag({
  className,
  wrapperClassName,
  isShowLabel,
  labelName,
  ...props
}: InputProps) {
  return (
    <span className={`flex flex-col ${wrapperClassName}`}>
      {isShowLabel && <label htmlFor="">{labelName}</label>}
      <div className="relative flex">
        <div className="inline-flex items-center px-1 border-2 border-gray-400 rounded-l-md border-r-0">
          <LiaFlagUsaSolid className="text-xl" />

          <select name="" id="" className="outline-none">
            <option value="">NGN</option>
            <option value="">USA</option>
            <option value="">UK</option>
          </select>
        </div>
        <input
          {...props}
          className={twMerge(
            `rounded-r-md h-11 w-full px-3 active:border active:border-[#86D1E9FF198F] focus:border-[#D1E9FF]  outline-none border-2 border-gray-400 ${
              props.type === "search" && "placeholder:pl-4"
            }  peer`,
            className
          )}
        />
        {props.type === "search" && (
          <IoSearchOutline className="absolute left-2 top-3 text-xl text-gray-400 peer-focus:hidden" />
        )}
      </div>
    </span>
  );
}




export function SelectCountryInput({
  className,
  wrapperClassName,
  isShowLabel,
  labelName,
  onChange,
  ...props
}: InputProps) {
  
  return (
    <span className={`flex flex-col ${wrapperClassName}`}>
      {isShowLabel && <label htmlFor="">{labelName}</label>}
      <div className="relative">
        <Select
        onChange={onChange}
          className={twMerge(
            `rounded-md h-11 w-full px-3 active:border active:border-[#D1E9FF] focus:border-[#D1E9FF]  outline-none border-2 border-gray-200 ${
              props.type === "search" && "placeholder:pl-4"
            }  peer`,
            className
          )}>
            {
              countries.map((country,i)=> {
             return   <option key={i} value={i}> {country.location_name} </option>
              })
            }
          </Select>
        </div>
        </span>)
}