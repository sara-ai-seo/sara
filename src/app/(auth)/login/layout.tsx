import { Metadata } from "next";

export const metadata: Metadata = {
    title: ` Webmaxi | Login`,
    description: "Webmaxi Login",
  };
  
  export default function LoginLayout({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      // <html lang="en">
       
        <div className={``}>
          <div>
          {children}
          </div>
          </div>
      // </html>
    );
  }