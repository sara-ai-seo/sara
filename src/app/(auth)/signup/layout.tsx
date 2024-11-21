import { Metadata } from "next";

export const metadata: Metadata = {
  title: ` Webmaxi | Signup`,
  description: "Webmaxi Signup page",
};

export default function SignupLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <div className={``}>
        <div>
          {children}
        </div>
      </div>
    </html>
  );
}
