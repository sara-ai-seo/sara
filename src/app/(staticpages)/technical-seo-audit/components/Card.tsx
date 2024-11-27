import Image from "next/image";

interface CardProps {
  imgUrl: string;
  title: string;
  content: string;
}
export default function Card({ content, imgUrl, title }: CardProps) {
  return (
    <section className="flex flex-col w-full">
      <div className="sm:h-72 h-[550px] sm:w-[384px] w-full relative flex flex-col">
        <Image src={imgUrl} alt="" fill className="object-cover" />
      </div>

      <div className="flex flex-col lg:pl-8 mt-3 space-y-2">
        <h1 className="font-bold">{title}</h1>
        <p className="text-sm text-gray-900">{content}</p>
      </div>
    </section>
  );
}

// xl:h-72 lg:h-56 sm:h-72 h-[550px]
