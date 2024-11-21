"use client";

import EmailIcon from "@/components/svgComponents/EmailIcon";
import ForgetPAsswordIcon from "@/components/svgComponents/ForgetPAsswordIcon";
import LockIcon from "@/components/svgComponents/LockIcon";
import SuccessMarkIcon from "@/components/svgComponents/SuccessMarkIcon";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function DynamicLogo() {
  const pathname = usePathname();

  const logo = [
    { link: "/password", logo: <ForgetPAsswordIcon className="size-14" /> },
    { link: "/password/email-sent", logo: <EmailIcon className="size-14" /> },
    { link: "/password/set-password", logo: <LockIcon className="size-14" /> },
    {
      link: "/password/reset-success",
      logo: <SuccessMarkIcon className="size-14" />,
    },
  ];

  const LogoToShow = logo.find((logo) => logo.link === pathname);

  return (
    <div className="flex items-center justify-center">
      {/* <Image
        src={`/key.png`}
        alt="Webmaxi password key"
        width={56}
        height={56}
      /> */}

      {LogoToShow ? LogoToShow.logo : null}
    </div>
  );
}
