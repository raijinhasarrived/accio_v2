"use client";

import Script from "next/script";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import { DisplayGate, type InitOptions, SDKProvider } from "@tma.js/sdk-react";
import { LottieLoader } from "@/components/ui/lottie-loader";
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

  interface SDKProviderErrorProps {
    error: unknown;
  }

  function SDKProviderError({ error }: SDKProviderErrorProps) {
    return (
      <div>
        Oops. Something went wrong.
        <blockquote>
          <code>
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </code>
        </blockquote>
      </div>
    );
  }

  function SDKProviderLoading() {
    return <LottieLoader />;
  }

  function SDKInitialState() {
    return <LottieLoader />;
  }

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <SDKProvider options={options}>
        <DisplayGate
          error={SDKProviderError}
          loading={SDKProviderLoading}
          initial={SDKInitialState}
        >
          <Providers>
            <body className={openSans.className}>
              {children}
              <Script
                id="googlemaps"
                type="text/javascript"
                defer
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1ePPnRQpefW7eL2E51epbJ5WKwwf-lgo&libraries=places&callback=PLACES"
              />
            </body>
          </Providers>
        </DisplayGate>
      </SDKProvider>
    </html>
  );
}
