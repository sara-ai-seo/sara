import { SignupComponent } from "@/app/(auth)/signup/SignupComponent";
import { LoginComponent } from "./LoginComponent";
import style from "./css.module/bgImgStyle.module.css";

export default function SignIn() {
  return (
    <section className=" h-screen flex w-full justify-between">
      <div className="w-full lg:w-1/2 p-4 h-full">
        <main className="w-full h-full">
          <LoginComponent />
        </main>
      </div>
      <div
        className={`${style.bgImageSize} w-1/2 px-16 justify-center  flex-col items-start hidden lg:flex bg-primary rounded-tl-[80px] rounded-bl-[80px]`}
      >
        <h2 className=" text-white text-5xl 2xl:text-7xl text-start font-semibold leading-tight">
          {" "}
          Your brand's SEO <br /> can only get <br /> better here!
        </h2>
        <p className="mt-6 text-justify leading-normal 2xl:text-xl">
          {" "}
          Explore a range of automated features to boost your brand’s <br /> SEO
          and increase your revenue. No complex tools.
        </p>
      </div>
    </section>
  );
}
