'use client'
import dynamic from 'next/dynamic';

const BackToLogin = dynamic(() => import('@/app/(auth)/password/BackToLogin'), { ssr: false });
const TitleAndDescription = dynamic(() => import('@/app/component/TitleAndDescription'), { ssr: false });
const OtpInput = dynamic(() => import('./OtpInput'), { ssr: false });

export default function Page() {
  const email = typeof window !== 'undefined' ? localStorage.getItem("userEmail") : false;
  const desc = <span> We sent an OTP code to <b>{email} </b> </span>;

  return (
    <main className="w-full flex flex-col justify-center items-center gap-4 ">
      <TitleAndDescription title='Check your email' description={desc} />
      <OtpInput />
      <BackToLogin />
    </main>
  );
}
