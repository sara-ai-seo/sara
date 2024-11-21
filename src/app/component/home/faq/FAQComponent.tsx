'use client'
import React, { useState } from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline } from "react-icons/md";



const faqs = [
    {
        title: 'What makes Webmaxi SEO services unique?',
        description: "Webmaxi stands out through its innovative use of artificial intelligence in SEO analysis. Our advanced algorithms provide unparalleled insights, ensuring a tailored and effective approach to optimize your website's performance.", id: 1
    },
    {
        title: 'What is the significance of conducting an AI-based Technical SEO Audit for my website?',
        description: "Webmaxi stands out through its innovative use of artificial intelligence in SEO analysis. Our advanced algorithms provide unparalleled insights, ensuring a tailored and effective approach to optimize your website's performance.", id: 2
    },
    {
        title: 'How does Smart Keyword Research contribute to better search engine rankings?',
        description: "Webmaxi stands out through its innovative use of artificial intelligence in SEO analysis. Our advanced algorithms provide unparalleled insights, ensuring a tailored and effective approach to optimize your website's performance.", id: 3
    },
    {
        title: 'How can Competitor Analysis impact my SEO strategy and keyword targeting?',
        description: "Webmaxi stands out through its innovative use of artificial intelligence in SEO analysis. Our advanced algorithms provide unparalleled insights, ensuring a tailored and effective approach to optimize your website's performance.", id: 4
    },
    {
        title: 'Can you explain the role of the Prioritized Recommendation Plan in SEO optimization?',
        description: "Webmaxi stands out through its innovative use of artificial intelligence in SEO analysis. Our advanced algorithms provide unparalleled insights, ensuring a tailored and effective approach to optimize your website's performance.", id: 5
    },
    {
        title: 'How does the Automatic Ranking Tracker keep me informed about keyword performance in real-time?',
        description: "Webmaxi stands out through its innovative use of artificial intelligence in SEO analysis. Our advanced algorithms provide unparalleled insights, ensuring a tailored and effective approach to optimize your website's performance.", id: 6
    },
]

interface Props {
    title: string;
    description: string;
}
export default function FAQComponent() {
    const [current, setCurrent] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setCurrent((prev: number | null) => (prev === id ? null : id));
  };

  return (
    <div className="h-full w-full transition-[heigth] duration-300 ease-in justify-center gap-8 pt-14 flex flex-col max-w-[600px]">
      {faqs.map((item) => (
        <div key={item.id} className="flex transition-all duration-700 ease-in-out flex-col gap-2 w-full">
          <div className="flex w-full gap-3 justify-between items-start">
            <p className="text-[#101828] font-semibold text-lg">{item.title}</p>
            <span className="mt-2 cursor-pointer" onClick={() => handleClick(item.id)}>
              {item.id === current ? (
                <MdRemoveCircleOutline className="text-primary" />
              ) : (
                <MdAddCircleOutline className="text-primary" />
              )}
            </span>
          </div>
          {item.id === current && (
            <div className="transition-all max-h-[200px] overflow-hidden">
              <p className="text-[#475467] text-base font-normal">{item.description}</p>
            </div>
          )}
          { item.id !== faqs.length && <hr /> }
        </div>
      ))}
    </div>
  );
}
