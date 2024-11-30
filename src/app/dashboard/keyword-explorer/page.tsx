"use client";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useEffect, useState } from "react";;
import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import PlainButton from "@/app/component/PlainButton";
import KeywordAnalysis from "./component/KeywordAnalysis";
import SmartKeywordFinder from "./component/SmartKeywordFinder";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import toast from "react-hot-toast";
import { CurrentProperty } from "@/app/utils/currentProperty";
import Button from "../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { KeywordServicesFetch } from "../../services/keyword_services/keyword-services";
import { getAllKeywordAnalysis } from "@/app/services/keyword_services/allKeywordAnalysis";
import Loader from "@/app/component/Loader";
import { shareOrFallback } from "@/app/utils/shareContentOrFallback";
import { FaAngleLeft } from "react-icons/fa6";
import CountrySelect from "@/components/ui/CountrySelect";
import { countrieswithflag } from "@/app/component/data/countrieswithflag";


interface CrawlingData {
  id: number;
  userId: number;
  domain: string;
  createdAt: string;
  updatedAt: string;
  crawlings: any[];
}



export default function page() {
  const [stage, setStage] = useState(1);

  const [keywords, setKeywords] = useState({
    keywords: "",
    locationCode: 0,
    locationName: "",
  });

  const [keywordIdea, setKeywordIdea] = useState({
    keywordIdea: "",
    locationCode: 0,
  });

  const tabs = [
    { title: "Keyword analysis", content: <KeywordAnalysis addNew={() => setStage(0)} /> },
    { title: "Smart keyword finder", content: <SmartKeywordFinder  addNew={() => setStage(0) }/> },
    // { title: "Keyword list", content: <KeywordList /> }
  ];

  const currentId = CurrentProperty();


  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const dKeywords = keywords.keywords.split(",").map(item => [item.trim()]);
      if (keywords.keywords === "") {
        throw new Error("Please enter keywords");
      }

      if (keywords.locationName === "") {
        // toast.error("Please select a country", { position: "top-right" });
        throw new Error("Please select the location");;
      }
      await Promise.all(
        dKeywords.map(async (itemArray) => {
          const response = await ApiCall.post(`/user/crawler/keyword/${currentId.id}`, {
            location_name: keywords.locationName,
            location_code: keywords.locationCode,
            keywords: itemArray, // Access the keyword from the wrapped array
          });
          return response;
        })
      );
    },
    onError: (error: any) => {
      toast.error(`An error occurred: ${error.response.data.message}`, {
        position: "top-right",
      });
    },
    onSuccess: () => {
      toast.success("Keyword search was successful", {
        position: "top-right",
      });
      setStage(1);
      handleClearAll()
    },
  });

  const { mutate: keywordIdeaMutate, isPending: keywordIdeaIsPending } = useMutation({
    mutationFn: async () => {
      const dKeywords = keywordIdea.keywordIdea.split(",").map(item => [item.trim()]);
      if (keywordIdea.keywordIdea === "") {
        throw new Error("Please enter keywords");
      }

      if (keywordIdea.locationCode === 0) {
        // toast.error("Please select a country", { position: "top-right" });
        throw new Error("Please select the location");
      }
      await Promise.all(
        dKeywords.map(async (itemArray) => {
          const response = await ApiCall.post(`/user/crawler/keyword/keyword-ideas/${currentId.id}`, {
            location_code: keywordIdea.locationCode,
            keywords: itemArray, // Access the keyword from the wrapped array
          });
          return response;
        })
      );
    },
    onError: (error: any) => {
      toast.error(`An error occurred: ${error.response.data.message}`, {
        position: "top-right",
      });
    },
    onSuccess: () => {
      toast.success("Keyword suggestion was successful", {
        position: "top-right",
      });
      setStage(1);
      handleClearAll()
    },
  });

  const keywordService = new KeywordServicesFetch();

  // check if there is overall keyword analysis data in order to handle stage
  const { data, isPending: isLoading } = getAllKeywordAnalysis(
    currentId.id
  ) as { data: CrawlingData; isPending: boolean };
  useEffect(() => {
    if (data?.crawlings?.length === 0) {
      setStage(0);
    }
  }, [data]);

  keywordService
    .keywordAnalysisData(currentId.id)
    .then((data) => console.log());

  const handleClearAll = () => {
    setKeywords({
      keywords: "",
      locationCode: 0,
      locationName: "",
    });
  };


  const handleCountrySelect = (selectedCountry: string) => {
    const detail = countrieswithflag.find(
      (country) => country.location_name === selectedCountry
    );
    if (detail) {
      setKeywords({
        ...keywords,
        locationCode: detail.location_code,
        locationName: selectedCountry,
      }),
        setKeywordIdea({
          ...keywordIdea,
          locationCode: detail.location_code
        })
    }
  };

  if (isLoading) {
    return (
      <div className=" w-full flex flex-col items-center justify-center">
        <div className="h-20 w-20">
          <Loader />
        </div>
      </div>
    );
  }
  return stage == 0 ? (
    // Search bar for the keywords
    <main className="grid w-full h-full items-start content-start gap-6  mb-20 overflow-auto">
      <section className={`flex flex-col gap-4 text-[#101828] `}>
        <div className={`flex items-center gap-2`}>
          <Button variant="text" onClick={() => setStage(1)} className="flex items-center gap-2"> <FaAngleLeft /> Back</Button>
          <h1 className={`font-semibold text-4xl 2xl:text-5xl`}>
            Keyword explorer
          </h1>
        </div>
        <p className={`text-lg 2xl:text-xl`}>
          Explore thousands of keywords and research smart keyword suggestions
        </p>
      </section>
      <section className="flex items-start gap-8 justify-between">
        <div className="flex flex-col gap-1 ">
          <label className=" font-medium " htmlFor="keyword">
            Enter keywords separated by commas
          </label>
          <textarea
            onChange={(e) =>
              setKeywords((prev) => ({ ...prev, keywords: e.target.value }))
            }
            rows={3}
            cols={70}
            value={keywords.keywords}
            placeholder="e.g. dog food, pet care, how to care for your dog..."
            className=" p-2 border rounded-md shadow-sm"
          ></textarea>
          <div className="flex justify-end items-center gap-6">
            <Button variant="text"
              className=" border flex items-center gap-2 rounded-md font-semibold p-2 px-3 "
              onClick={handleClearAll}
            >
              Clear all
            </Button>
          </div>
        </div>
        <div className={`flex items-center gap-6 mt-6`}>
          <CountrySelect handleCountrySelect={handleCountrySelect} data={countrieswithflag} />
          <Button onClick={() => mutate()} loading={isPending} disabled={isPending}>
            Search Keywords
          </Button>
        </div>
      </section>
      <div className="flex items-center justify-center">
        <h1 className={`text-[#101828] font-semibold text-4xl my-4 `}> OR </h1>
      </div>

      <section className="flex items-start gap-8 justify-between">
        <div className="flex flex-col gap-1 ">
          <label className=" font-medium " htmlFor="keyword">
            Enter base keywords and get keyword suggestions
          </label>
          <textarea
            onChange={(e) =>
              setKeywordIdea((prev) => ({ ...prev, keywordIdea: e.target.value }))
            }
            rows={3}
            cols={70}
            value={keywordIdea.keywordIdea}
            placeholder="e.g. dog food, pet care, how to care for your dog..."
            className=" p-2 border rounded-md shadow-sm"
          ></textarea>
        </div>
        <div className={`flex items-center gap-6 mt-6`}>
          <CountrySelect handleCountrySelect={handleCountrySelect} data={countrieswithflag} />
          <Button onClick={() => keywordIdeaMutate()} loading={keywordIdeaIsPending} disabled={keywordIdeaIsPending} >
            Search Suggestions
          </Button>
        </div>
      </section>

    </main>
  ) : stage == 1 ? (
    <main className="grid w-full h-full items-start content-start gap-6 mb-20 overflow-auto">
      <section
        className={`flex sm:flex-row flex-col sm:justify-between w-full sm:items-center gap-4 text-[#101828]`}
      >
        <h1 className={`font-semibold text-3xl  whitespace-nowrap `}>
          {" "}
          Keyword explorer
        </h1>
        <div className="flex w-full md:w-1/2 sm:items-center sm:justify-end gap-2 md:gap-4">
          <span className="inline-flex gap-2 items-center">
            <button
              onClick={() => setStage(0)}
              className="rounded-lg text-base p-2 bg-primary text-white font-semibold hover:bg-blue-500"
            >
              Update data
            </button>
          </span>
          <span className="">
            <PlainButton
              handleClick={() =>
                shareOrFallback({
                  url: "keyword-explorer",
                  title: "Check out this cool keyword explorer site!",
                  text: "Check out your website Keyword Explorer status",
                })
              }
              moreClass="text-primary bg-[#EFF8FF]"
              title="Share"
              icon={<IoCloudUploadOutline />}
            />
          </span>
          {/* <span className="p-3 rounded-md border cursor-pointer ">
            <CiSettings />
          </span> */}
        </div>
      </section>
      <section
        className={`flex min:[500px]:flex-nowrap flex-wrap w-full sm:items-center items-start gap-4 text-[#101828] `}
      >
        {/* <div className="sm:w-auto w-full">
          <ToggleMobile
            mobile={mobile}
            setMobile={setMobile}
            className="w-fit font-normal"
          />
        </div> */}

        {/* <CountryPick className="sm:w-auto w-full" /> */}
        {/* <SelectCountryInput onChange={handleSelectChange} /> */}
        {/* <SearchEnginePick className="sm:w-auto w-full" /> */}
      </section>
      <section className={``}>
        <Tab.Group>
          <Tab.List className="flex gap-4 w-full overflow-x-auto whitespace-nowrap">
            {tabs.map((tab) => {
              return (
                <span key={tab.title}>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <p
                        className={` cursor-pointer p-2 active:outline-none text-sm font-semibold border-t-0 border-l-0 border-r-0 active:border-r-none ${selected
                          ? "text-primary border-b-2 border-primary"
                          : " text-[#667085] active:border-none"
                          }`}
                      >
                        {tab.title}
                      </p>
                    )}
                  </Tab>
                </span>
              );
            })}
          </Tab.List>
          <hr className="" />
          <span className={` h-full overflow-auto`}>
            <Tab.Panels>
              {tabs.map((tab) => {
                return (
                  <div key={tab.title} className="h-full ">
                    <Tab.Panel>{tab.content}</Tab.Panel>
                  </div>
                );
              })}
            </Tab.Panels>
          </span>
        </Tab.Group>
      </section>
    </main>
  ) : (
    <span className="">Detail</span>
  );
}
