import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Edu_VIC_WA_NT_Beginner as EduVIC } from "next/font/google";
import { Grey_Qo as GreyQo } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });
const eduVIC = EduVIC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-edu-vic",
});
const greyQo = GreyQo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-grey-qo",
});

export const metadata: Metadata = {
  title: "Spider",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.className} ${eduVIC.variable} ${greyQo.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <NextTopLoader
              showSpinner={false}
              color="linear-gradient(to right, yellow, red, blue)"
            />
            {/* <UserProvider> */}
            <main>{children}</main>
            {/* </UserProvider> */}
          </TooltipProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
