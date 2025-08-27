import { SignupComponent } from "@/app/(auth)/signup/SignupComponent";
import { LoginComponent } from "./LoginComponent";
import style from "./css.module/bgImgStyle.module.css";
import Script from "next/script";

export default function SignIn() {
  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '774387781636205');
                fbq('track', 'PageView');
              `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=774387781636205&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
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
    </>
  );
}
