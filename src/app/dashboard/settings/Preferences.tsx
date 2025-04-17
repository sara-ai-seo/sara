import React from 'react';
import Heading from "./settingComponents/Heading";
import MakeChanges from "./settingComponents/MakeChanges";

export default function Preferences() {
  return (
    <section className={`grid gap-4 lg:gap-8`}>
      <Heading title="Your options" description="Update your location and search engine here." handleSave={() => { }}>
        {/* Add any child content here */}
        <p>Customize your preferences below.</p>
      </Heading>
      <MakeChanges />
    </section>
  )
}
