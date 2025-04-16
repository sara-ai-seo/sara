import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";


export default function Features() {
  return (
    <div className="h-screen w-full pt-32 px-4">
      <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
        {/* <Disclosure as="div" className="p-6" defaultOpen={true}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
              What is your refund policy?
            </span>
            <FaChevronDown className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
          </DisclosureButton>
          <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
            If you're unhappy with your purchase, we'll refund you in full.
          </DisclosurePanel>
        </Disclosure> */}
        <Disclosure as="div" className="p-6">
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
              Do you offer technical support?
            </span>
            <FaChevronDown className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
          </DisclosureButton>
          <DisclosurePanel className="mt-2 text-sm/5 text-white/50">No.</DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  )
}