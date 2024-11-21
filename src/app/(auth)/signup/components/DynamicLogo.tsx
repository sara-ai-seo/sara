"use client";

import EmailIcon from "@/components/svgComponents/EmailIcon";
import SuccessMarkIcon from "@/components/svgComponents/SuccessMarkIcon";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function DynamicLogo() {
  const pathname = usePathname();
  const logo = [
    { link: "/signup/email-verify", logo: <EmailIcon className="size-14" /> },
    {
      link: "/signup/email-verify/otp",
      logo: <EmailIcon className="size-14" />,
    },
    {
      link: "/signup/email-verify/verify-success",
      logo: <SuccessMarkIcon className="size-14" />,
    },
  ];

  const LogoToShow = logo.find((logo) => logo.link === pathname);
  return (
    <div className="flex items-center justify-center">
      {/* <Image
        src={`/email.png`}
        alt="Webmaxi password key"
        width={56}
        height={56}
      /> */}

      {LogoToShow ? LogoToShow.logo : null}
    </div>
  );
}
