import React from 'react';
import Header from "./settingComponents/Heading";
import PasswordChangeForm from "./settingComponents/PasswordChanges";

export default function Security() {
  return (
    <section className={`grid gap-4 lg:gap-8`}>
      <Header title="Password" description="Update your account password here." handleSave={() => { }} />
        <PasswordChangeForm />
    </section>
  )
}
