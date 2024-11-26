import Image from "next/image";
import ContactForm from "./components/ContactForm";

export default function page() {
  return (
    <section className="flex flex-col h-full lg:w-[80%] mx-auto w-full p-4 mt-10">
      <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-4">
        <div className="flex flex-col sm:p-8 p-0">
          <h1 className="font-bold text-3xl">Get in touch</h1>
          <p className="text-[#475467] mt-3">
            Our friendly team would love to hear from you.
          </p>
          <div className="mt-5 ">
            <ContactForm />
          </div>
        </div>
        <div className="block h-[700px] md:h-auto relative">
          <Image
            src={"/contactHeroBg.png"}
            alt=""
            fill
            className="md:object-contain object-cover"
          />
        </div>
      </div>
    </section>
  );
}
