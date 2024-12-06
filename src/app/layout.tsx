import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import APpProvider from "@/redux/features/provider";
import TanstackProvider from "./providers/TanstackProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: ` Webmaxi | Home`,
  description: "Webmaxi for SEO improvement ",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`className.Inter`}>
        <TanstackProvider>
          <APpProvider>
            <Toaster />
            {children}
          </APpProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
