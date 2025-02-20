"use client"
import PageTitle from "@/app/component/PageTitle";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Fragment } from 'react';
import Profile  from './Profile'; 
import Preferences from "./Preferences";
import Security from "./Security";


export default function SettingsLayout() {

    const tabs = [
        { title: "Profile", content: <Profile /> },
        { title: "Preferences", content: <Preferences /> },
        { title: "Security", content: <Security /> }
    ]
    return (
        <section className={`my-8 mx-4 lg:my-12 lg:mx-20 grid gap-4 lg:gap-8`}>
            <PageTitle title="Settings" />



            <TabGroup>
                <TabList className="flex gap-4 w-full border-b ">
                    {
                        tabs.map((tab) => {
                            return (
                                <Tab key={tab.title} as={Fragment}>
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
                            )
                        })
                    }

                </  TabList>
                <TabPanels>
                    {
                        tabs.map((tab) => {
                            return (
                                <TabPanel key={tab.title}>
                                    {tab.content}
                                </TabPanel>
                            )
                        })
                    }
                </TabPanels>
            </TabGroup>



        </section>
    )

}