"use client";

import { countries } from "@/app/component/data/countries";
import Link from "next/link";
import { Suspense } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  contactFormSchemaType,
} from "@/app/zod-schema/contactFormSchema";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import homeService from "@/services/home";


export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<contactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
  });

  const {mutate, isPending} = useMutation({
    mutationFn: homeService.sendFeedback,
    onSuccess: () => {
      toast.success("contact form submtted");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const handleSubmitContact: SubmitHandler<contactFormSchemaType> = (data) => {
    mutate(data)
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitContact)}
      className="space-y-4 flex flex-col"
    >
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="first_name"
            className="text-sm font-medium text-[#344054]"
          >
            First name
          </label>
          <input
            type="text"
            id="first_name"
            {...register("firstname")}
            placeholder="First name"
            className="border border-gray-300 rounded-md p-2 outline-none"
          />
          {errors.firstname && (
            <small className="text-red-400">{errors.firstname.message}</small>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="last_name"
            className="text-sm font-medium text-[#344054]"
          >
            Last name
          </label>
          <input
            type="text"
            id="last_name"
            {...register("lastname")}
            placeholder="Last name"
            className="border border-gray-300 rounded-md p-2 outline-none"
          />
          {errors.lastname && (
            <small className="text-red-400">{errors.lastname.message}</small>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium text-[#344054]">
          Email
        </label>

        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="name@email.com"
          className="border border-gray-300 rounded-md p-2 outline-none"
        />
        {errors.email && (
          <small className="text-red-400">{errors.email.message}</small>
        )}
      </div>

      {/* <div className="flex flex-col">
        <label
          htmlFor="phone_number"
          className="text-sm font-medium text-[#344054]"
        >
          Phone number
        </label>

        <div className="w-full inline-flex items-center">
          <select
            id="phone_number"
            {...register("phonenumber.country_code")}
            className="w-16 border-l border-y rounded-l-md p-[9px] outline-none"
          >
            <Suspense fallback={<div className="text-sm">Loading...</div>}>
              {countries.map((country, i) => (
                <option key={i} value={country.country_iso_code}>
                  {country.country_iso_code}
                </option>
              ))}
            </Suspense>
          </select>

          <input
            type="tel"
            id="phone_number"
            {...register("phonenumber.number")}
            placeholder="+1 (555) 000-0000"
            className="border-y border-r border-gray-300 rounded-r-md p-2 w-full outline-none"
          />
        </div>

        {errors.phonenumber && (
          <small className="text-red-400">{errors.phonenumber.message}</small>
        )}
      </div> */}

      <div className="flex flex-col">
        <label htmlFor="message" className="text-sm font-medium text-[#344054]">
          Message
        </label>

        <textarea
          id="message"
          {...register("message")}
          rows={6}
          className="border border-gray-300 rounded-md p-2 outline-none"
        ></textarea>
        {errors.message && (
          <small className="text-red-400"> {errors.message.message}</small>
        )}
      </div>

      <div className="flex flex-col">
        <div className="inline-flex gap-1 items-center text-sm">
          <input
            type="checkbox"
            {...register("privacy_policy")}
            id="privacy_policy"
            className="size-4"
          />
          <label htmlFor="privacy_policy">
            You agree to our <Link href="/privacy-policy">privacy policy.</Link>
          </label>
        </div>
        {errors.privacy_policy && (
          <small className="text-red-400">
            {errors.privacy_policy.message}
          </small>
        )}
      </div>
      <button type="submit" disabled={isPending}  className="text-white bg-[#1570EF] p-3 rounded-md">
        {
          isPending? "Submitting..." : "Send message"
        }
      </button>
    </form>
  );
}
