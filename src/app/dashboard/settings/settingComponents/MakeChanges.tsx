"use client";

import React, { useState } from "react";
import { Label } from '@/components/ui/label';
import CountrySelect from "@/components/ui/CountrySelect";
import { countrieswithflag } from "@/app/component/data/countrieswithflag";
import SearchEnginePick from "@/app/dashboard/rank-tracker/components/SearchEnginePick";

export default function MakeChanges() {
  const [data, setData] = useState({
    country: '',
    searchEngine: ''
  });

  const handleCountrySelect = (selectedCountry: string) => {
    setData((prev) => ({ ...prev, country: selectedCountry }));
  };

  const handleSearchEngineSelect = (selectedSearchEngine: string) => {
    setData((prev) => ({ ...prev, searchEngine: selectedSearchEngine }));
  };

  return (
    <div className="grid gap-2 lg:gap-4">
      <div className="flex gap-4 lg:gap-12 items-center w-full lg:w-1/2 justify-between">
        <Label htmlFor="location" className="font-semibold">Country</Label>
        <CountrySelect
          handleCountrySelect={handleCountrySelect}
          data={countrieswithflag}
        />
      </div>
      <div className="flex gap-4 lg:gap-12 items-center w-full lg:w-1/2 justify-between">
        <Label htmlFor="location" className="font-semibold">Search Engine</Label>
        <SearchEnginePick onEngineChange={handleSearchEngineSelect} />
  
  </div>
    </div>
  );
}




