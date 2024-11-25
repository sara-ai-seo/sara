"use client";
import { CiSearch } from "react-icons/ci";

export default function SearchInput() {
  return (
    <section className="inline-flex relative">
      <input
        type="search"
        name=""
        placeholder="Search"
        className="border-2 border-gray-300 peer rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 placeholder:pl-5 placeholder:focus:pl-2"
      />
      <CiSearch className="absolute left-4 top-3 text-xl peer-focus:hidden" />
    </section>
  );
}
