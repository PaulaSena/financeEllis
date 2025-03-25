import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "../app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Navbar from "./_components/navbar";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Finance Ellis",
  description:
    "A Finance Ellis AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer insights personalizados, facilitando o controle do seu orçamento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${mulish.className} dark antialiased`}>
        {/*<h1>Layout</h1>
        <h2>Benvindo</h2>*/}

        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <Navbar />

          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
