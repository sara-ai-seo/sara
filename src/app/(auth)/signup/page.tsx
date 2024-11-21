import { SignupComponent } from "@/app/(auth)/signup/SignupComponent";
import bgImgSize from "./css.module/responsiveBgImgSizing.module.css";

export default function Signup() {
  return (
    <section className="h-screen flex w-full justify-between">
      <div className="w-full lg:w-1/2 p-2 h-full">
        <main className="w-full h-full">
          <SignupComponent />
        </main>
      </div>
      <div
        className={`${bgImgSize.bgImageSize} w-1/2 px-16 justify-center  flex-col items-start hidden lg:flex bg-primary rounded-tl-[80px] rounded-bl-[80px]`}
      >
        <h2 className=" text-white text-5xl 2xl:text-7xl text-start font-semibold leading-tight">
          {" "}
          Start winning <br /> your SEO game!
        </h2>
        <p className="mt-6 text-justify leading-normal 2xl:text-xl">
          {" "}
          Create your account and explore a range of automated <br /> features
          to boost your brand’s SEO. No complex tools.{" "}
        </p>
      </div>
    </section>
  );
}
