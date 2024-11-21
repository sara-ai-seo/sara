import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

interface HeaderSectionProp {
  title: string;
  description: string;
  section: string;
}

type FeaturecardProps = {
  title: string;
  icon: string;
  description: string;
  className?: string;
};

type WhyCardProps = {
  title: string;
  description: string;
  icon: string;
  cat: string;
};

export function HeaderSection({
  title,
  description,
  section,
}: HeaderSectionProp) {
  return (
    <>
      <h1 className=" text-darkPrimary text-base font-semibold"> {section} </h1>
      <h1 className="pt-3 text-4xl font-semibold"> {title} </h1>
      <p className="text-xl pt-5">{description} </p>
    </>
  );
}

export function FeatureCard({
  title,
  icon,
  description,
  className,
}: FeaturecardProps) {
  return (
    <section
      className={`${className} flex flex-col w-full sm:max-w-[384px] items-center gap-5 justify-center `}
    >
      <Image src={`${icon}`} alt="Graph " height={48} width={48} />
      <div className=" flex flex-col gap-2">
        <p className="text-center text-[#101828] text-xl font-semibold">
          {title}{" "}
        </p>
        <h2 className="text-center text-base text-[#475467] font-normal ">
          {description}{" "}
        </h2>
      </div>
    </section>
  );
}

export function WhyUseWemaxiCard({
  icon,
  title,
  description,
  cat,
}: WhyCardProps) {
  return (
    <section className=" h-96 w-72 bg-[#F9FAFB] p-4 shadow lg:p-6 flex flex-col rounded-lg justify-between">
      <div className="flex flex-col h-full">
        <Image src={`${icon}`} alt="" height={88} width={88} />
        <p className="pt-10 text-start text-[#101828] text-xl font-medium ">
          {title}
        </p>
        <p className=" pt-4 font-normal text-base">{description}</p>
      </div>
      <Link
        href={`/signup`}
        className=" pt-14 text-start text-primary flex items-center gap-2 "
      >
        Try it out <FaArrowRight />
      </Link>
    </section>
  );
}
