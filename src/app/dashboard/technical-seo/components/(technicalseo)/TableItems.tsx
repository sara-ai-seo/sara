import { Fragment, useState } from "react";
import Image from "next/image";
import { PiCaretDown } from "react-icons/pi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import AutoModal from "@/app/component/modals/AutoModal";
import Button from "@/app/dashboard/components/ui/Button";

interface Props {
  title?: string;
  src?: string;
  description?: string;
  fix?: string;
}

export default function TableItems({ title, src, description, fix }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 ">
      {/* <Image src={`${src}`} alt={"Warning icon"} height={40} width={40} /> */}
      <div className="flex flex-col">
        <p className="text-[#101828] font-medium w-full "> {title} </p>
        {/* <div
          className=" text-[#475467] gap-1 flex items-center font-normal cursor-pointer w-full "
          // onClick={showDetail}> Description and how to fix
        >
          Description and how to fix{" "}
          <PiCaretDown onClick={() => setOpen(!open)} />
          {open && (
            <AutoModal
              closeModal={() => setOpen(false)}
              ModalBody={
                <div className="flex w-full  items-center flex-col p-4 gap-2">
                  <span className=" font-semibold text-black">
                    {" "}
                    Issue description{" "}
                  </span>
                  <hr />
                  <p className="break-words hyphens-auto"> {description}</p>
                  <span className="">
                    {" "}
                    <Button onClick={() => setOpen(false)}> Close</Button>{" "}
                  </span>
                </div>
              }
            />
          )}
        </div> */}
      </div>
    </div>
  );
}
