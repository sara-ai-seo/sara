"use client";
import Link from "next/link";
import Logo from "../../../../../public/footer/logo.svg";
import { useState } from "react";
import { currentYear } from "@/app/utils/currenYear";
import Image from "next/image";

export default function TempFooter() {
  const [email, setEmail] = useState("");

  return (
    <div className="grid px-4 py-12 bg-darkPrimary text-white w-full justify-items-center">
      <div className="flex flex-col items-center justify-center gap-6">
        {/* <Logo /> */}
        <Image src={Logo} alt="Logo" />
        <span className=""> Your website’s success starts with us!</span>
      </div>
      <div className="flex items-center justify-center gap-8 mt-8 flex-wrap">
        <Link href={`/features`} className=" font-semibold">
          Features
        </Link>
        <Link href={`/pricing`} className=" font-semibold">
          Pricing
        </Link>
        <Link href={`/help`} className=" font-semibold">
          Help
        </Link>
        <Link href={`/contact`} className=" font-semibold">
          Contact Us
        </Link>
        <Link href={`/terms`} className=" font-semibold">
          Terms and Conditions
        </Link>
        <Link href={`/`} className=" font-semibold">
          Privacy Policy
        </Link>
      </div>
      <hr className="w-full my-8 md:my-16" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between w-full">
        <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto ">
          {/* <input type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} className="p-2 rounded-md w-full md:w-auto" /> */}
          <input
            type="text"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="p-2 rounded-md w-full md:w-auto text-black"
          />
          <button
            className="text-white p-2 rounded-md bg-[#1570EF] font-semibold w-full md:w-auto"
            onClick={() => alert("Thanks for subscribing")}
          >
            {" "}
            Join waitlist
          </button>
        </div>

        <p className={` text-[#F2F4F7] text-base font-normal w-full md:w-auto`}>
          {" "}
          &#169; {currentYear()} Webmaxi. All rights reserved.{" "}
        </p>
      </div>
    </div>
  );
}
