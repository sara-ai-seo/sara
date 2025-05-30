import Link from "next/link";
import Card from "../technical-seo-audit/components/Card";

export default function page() {
  return (
    <section className="flex flex-col h-full w-full p-4">
      <div className="flex flex-col  justify-center items-center py-16 space-y-3">
        <h1 className="text-[#1570EF] font-medium">Features</h1>
        <h2 className="font-bold sm:text-4xl text-3xl text-wrap text-center">
          Content analysis
        </h2>
        <p className="text-base text-[#475467] w-[900px] text-center">
          Our Content Analysis tool provides a comprehensive analysis of your
          website's content, highlighting areas for improvement to enhance
          search engine optimization (SEO) and overall user experience.
        </p>
        <div className="inline-flex gap-4 items-center justify-center">
          <Link
            href=""
            className="py-2 px-4 rounded-md bg-[#1570EF] text-white font-medium"
          >
            Get started
          </Link>
          <Link
            href="contact"
            className="py-2 px-4 rounded-md border font-medium"
          >
            Contact support
          </Link>
        </div>
      </div>

      <div className="flex flex-col h-full justify-center items-center w-full p-16 space-y-3">
        <h1 className="text-[#1570EF] font-medium">What do you gain?</h1>
        <h2 className="font-bold sm:text-4xl text-3xl text-wrap text-center">
          Improve site’s SEO through content refinement
        </h2>
        <p className="text-base text-[#475467]  text-center">
          Optimize your content for search engines and increase visibility
        </p>
      </div>

      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 w-full px-16 ">
        <Card
          imgUrl="/content-metrics.png"
          title="Content metrics"
          content="Receive an evaluation your content's SEO, word count, and overall quality."
        />
        <Card
          imgUrl="/content-recommend.png"
          title="Content recommendations"
          content="Receive suggestions for content improvement."
        />

        <Card
          imgUrl="/additional-insight.png"
          title="Additional insights"
          content="Keep track of other insights like your website’s bounce rate."
        />
      </div>

      <div className="inline-flex mt-10 flex-col justify-center items-center">
        <Link
          href={""}
          className="py-2 px-4 rounded-md bg-[#1570EF] text-white font-medium"
        >
          Get started
        </Link>
      </div>

      <div className="flex lg:flex-row flex-col  h-full justify-between items-center w-full p-16 gap-3">
        <div className="flex flex-col space-y-3 flex-wrap">
          <h2 className="font-bold sm:text-4xl text-3xl ">
            Start today
          </h2>
          <p className="text-base text-[#475467] ">
            Everything you need to boost your sites technical SEO and user
            experience
          </p>
        </div>

        <div className="inline-flex gap-4 items-center justify-center">
          <Link
            href="contact"
            className="py-2 px-4 rounded-md border font-medium text-nowrap"
          >
            Contact support
          </Link>
          <Link
            href={""}
            className="py-2 px-4 rounded-md bg-[#1570EF] text-white font-medium text-nowrap"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}
