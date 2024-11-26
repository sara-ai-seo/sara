"use client";
import TitleShareSettingTop from "@/app/component/TitleShareSettingTop";
import SearchEnginePick from "../rank-tracker/components/SearchEnginePick";
import { Fragment, useState } from "react";
import KeywordGap, { KeywordGapType } from "./components/KeywordGap";
import LinkGap from "./components/LinkGap";
import { Tab, TabPanels, TabGroup, TabList, TabPanel } from "@headlessui/react";
import toast from "react-hot-toast";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { removeTrailingSlash } from "@/app/utils/RemoveSlash";
import { trimDomain } from "@/app/utils/trimDomain";
import { useMutation } from "@tanstack/react-query";
import { keywordGapData } from "./components/competitorAnalysis";
import { CurrentProperty } from "@/app/utils/currentProperty";
import CountrySelect from "@/components/ui/CountrySelect";
import { countrieswithflag } from "@/app/component/data/countrieswithflag";
import Button from "../components/ui/Button";
import { shareOrFallback } from "@/app/utils/shareContentOrFallback";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";

interface competitorDomains {
  target: string;
  target1: string;
  location_code: number | null;
  language_code: string;
}
export default function page() {
  const { data } = keywordGapData();
  const [stage, setStage] = useState(
    data?.project?.crawlings?.length === 0 ? 0 : 1
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [competitorDomains, setCompetitorDomains] = useState<competitorDomains>(
    {
      target: "",
      target1: "",
      location_code: null,
      language_code: "",
    }
  );

  const currentRoute: KeywordGapType[] =
    data?.project?.crawlings[0]?.crawlingData[0]?.data?.items;
  const prevRoute: KeywordGapType[] =
    data?.project?.crawlings[1]?.crawlingData[0]?.data?.items;

  function addNew() {
    setStage(0);
  }
  const tabs = [
    {
      title: "Keyword gap",
      content: (
        <KeywordGap
          setStage={addNew}
          data={currentRoute ?? []}
          prev={prevRoute ?? []}
        />
      ),
    },
    { title: "Link gap", content: <LinkGap /> },
  ];

  const property = CurrentProperty();

  const { target1, target, location_code, language_code } = competitorDomains;

  const payload = [
    {
      target: removeTrailingSlash(target),
      target1: removeTrailingSlash(target1),
      location_code: location_code,
      language_code: language_code,
    },
  ];

  

  const mutate = useMutation({
    mutationKey: ["crawlCompetitors"],
    mutationFn: async () => {
      if (target === "") {
        setErrorMessage("Please select a competitor");
        throw new Error(errorMessage);
      }
      if (target1 === "") {
        setErrorMessage("Please select second competitor");
        throw new Error(errorMessage);
      }
      if (location_code === null) {
        // toast.error("Please select a country");
        setErrorMessage("Please select a country");
        throw new Error("Please select a country");
      }
      if (language_code === "") {
        // toast.error("Please select a country");
        setErrorMessage("Please select a country");
        throw new Error("Please select a country");
      }
      
     

      if (!property.id) {
        toast.error("project(url) must be selected");
        throw new Error("Select a property");
      }
      try {
        const response = ApiCall.post(
          `/user/crawler/competitor-analysis/${property?.id}`,
          payload
        );
        return response;
      } catch (error: any) {
        toast.error(error);
        console.log(error);
      }
    },
    onSuccess: () => {
      toast.success("Crawl Completed!");
      setStage(1);
    },
    onError: (error: any) => {
      console.error("Error during mutation:", error.response.data.message);
      toast.error(error.response.data.message);
      // throw new Error(error.response.data.message)
    },
  });

  function handleCrawl() {
    mutate.mutate();
  }

  const handleCountrySelect = (selectedCountry: string) => {
    const detail = countrieswithflag.find(
      (country) => country.location_name === selectedCountry
    );
    if (detail) {
      setCompetitorDomains({
        ...competitorDomains,
        location_code: detail.location_code,
        language_code: detail.available_languages[0].language_code,
      });
    }
  };

  // console.log("LOC", competitorDomains)
  return (
    <div className="w-full flex flex-col ">
      {stage === 1 ? (
        <main className="grid w-full h-full items-start content-start gap-6 ">
          <section
            className={`flex justify-between w-full items-center gap-4 text-[#101828] `}
          >
            <div className="flex">
              <h1 className={`font-semibold text-4xl 2xl:text-5xl `}>
                {" "}
                Competitor Analysis
              </h1>
            </div>
            <div className="flex w-fit  items-center justify-end gap-2 md:gap-4 ">
              <span className="">
                {/* <button
            onClick={updateData}
            className="rounded-lg text-base p-2 bg-primary text-white font-semibold hover:bg-blue-500"
          >
            Update data
          </button> */}
              </span>
              <span className="">
                {/* <PlainButton
            moreClass="text-primary bg-[#EFF8FF]"
            title="Share"
            icon={<IoCloudUploadOutline />}
            handleClick={() =>
              shareOrFallback({
                url: "http://localhost:3000/dashboard/content-analysis",
                title: "Content Analysis",
                text: "content analysis",
              })
            }
          /> */}
                <Button
                  className="flex items-center gap-2"
                  onClick={() => {
                    shareOrFallback({
                      url: "competition-analysis",
                      title: "Content Analysis",
                      text: "content analysis",
                    });
                  }}
                >
                  <IoCloudUploadOutline /> <span> Share </span>
                </Button>
              </span>
              {/* <span className="p-3 rounded-md border cursor-pointer ">
          <CiSettings />
        </span> */}
            </div>
          </section>

          <section className={`flex items-center gap-3`}>
            {/* <ToggleMobile mobile={mobile} setMobile={handleToggleMobile} /> */}
            {/* <CountryPick /> */}
            {/* <SelectCountryInput onChange={handleSelectChange} /> */}
            {/* <CountrySelect data={countrieswithflag} handleCountrySelect={handleCountrySelect} />
            <SearchEnginePick /> */}
          </section>
          <section className={``}>
            <TabGroup>
              <TabList className="flex gap-4 w-full">
                {tabs.map((tab) => {
                  return (
                    <div key={tab.title}>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <p
                            className={` cursor-pointer p-2 active:outline-none text-sm font-semibold border-t-0 border-l-0 border-r-0 active:border-r-none ${
                              selected
                                ? "text-primary border-b-2 border-primary"
                                : " text-[#667085] active:border-none"
                            }`}
                          >
                            {tab.title}
                          </p>
                        )}
                      </Tab>
                    </div>
                  );
                })}
              </TabList>
              <hr className="w-full" />
              <div className={` h-full w-full overflow-auto`}>
                <TabPanels>
                  {tabs.map((tab) => {
                    return (
                      <div key={tab.title} className="h-full ">
                        <TabPanel>{tab.content}</TabPanel>
                      </div>
                    );
                  })}
                </TabPanels>
              </div>
            </TabGroup>
          </section>
        </main>
      ) : (
        <section
          className={`h-full  grid col-span-1 lg:col-span-3 gap-6 mt-6 mb-20 
       `}
        >
          <div className="flex gap-3">
            {data?.project?.crawlings?.length > 0 && (
              <Button
                className="flex items-center gap-2"
                onClick={() => setStage(1)}
              >
                <IoIosArrowRoundBack /> <span> Back</span>
              </Button>
            )}
            <h1 className={`font-semibold text-4xl 2xl:text-5xl `}>
              {" "}
              Competitor Analysis
            </h1>
          </div>
          {/* <h1
            className={`font-semibold min-[425px]:text-4xl 2xl:text-5xl text-3xl `}
          >
            Competitor analysis
          </h1> */}
          <p className="text-[#101828] font-medium text-lg 2xl:text-xl min-[425px]:w-auto min-[356px]:w-[375px] w-[320px]">
            Research your online competitors and improve your SEO
          </p>
          <div className="flex flex-col ">
            <p className="text-sm text-[#344054] font-medium my-2  min-[425px]:w-auto min-[375px]:w-[375px] w-[310px]">
              Enter two competitor domains and start analyzing
            </p>
            <div className="flex flex-col gap-3 sm:w-[80%] lg:w-[727px] w-[92%]">
              <input
                type="text"
                onChange={(e) =>
                  setCompetitorDomains({
                    ...competitorDomains,
                    target: e.target.value,
                  })
                }
                className="py-5 p-3 focus:outline-none focus:shadow-sm focus:border-secondary rounded-md border  w-full"
                placeholder="e.g domain1.com"
              />
              <input
                type="text"
                onChange={(e) =>
                  setCompetitorDomains({
                    ...competitorDomains,
                    target1: e.target.value,
                  })
                }
                className="py-5 p-3 focus:outline-none focus:shadow-sm focus:border-secondary rounded-md border w-full"
                placeholder="e.g domain2.com"
              />
              <div className="flex flex-col min-[425px]:flex-row sm:items-center items-start gap-4 sm:gap-8 w-full">
                <CountrySelect
                  data={countrieswithflag}
                  handleCountrySelect={handleCountrySelect}
                />
                <span className="w-full min-[425px]:w-auto ">
                  <Button
                    variant="primary"
                    onClick={handleCrawl}
                    loading={mutate.isPending}
                    disabled={mutate.isPending}
                    className="whitespace-nowrap w-full"
                  >
                    Analyze competitors
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
