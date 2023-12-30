"use client";

import Script from "next/script";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import { InitOptions, SDKProvider } from "@tma.js/sdk-react";
import { Providers } from "./providers";
const openSans = Open_Sans({ subsets: ["cyrillic", "latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const options: InitOptions = {
    cssVars: true,
    async: true,
  };

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <SDKProvider options={options}>
        <Providers>
          <body className={openSans.className}>
            {children}
            <Script
              id="googlemaps"
              type="text/javascript"
              src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1ePPnRQpefW7eL2E51epbJ5WKwwf-lgo&libraries=places"
            />
          </body>
        </Providers>
      </SDKProvider>
    </html>
  );
}
