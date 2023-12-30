"use client";

import React from "react";
import { useBackButton, useInitData } from "@tma.js/sdk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";

import i18n from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const initData = useInitData();

  React.useEffect(() => {
    i18n.changeLanguage(initData?.user?.languageCode);
  }, [initData]);

  const backButton = useBackButton();
  const router = useRouter();
  React.useEffect(() => {
    const listener = () => router.push("/orders");
    backButton.on("click", listener);
    pathname === "/orders" ? backButton.hide() : backButton.show();

    return () => {
      backButton.off("click", listener);
      backButton.hide();
    };
  }, [backButton, router, pathname]);

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </I18nextProvider>
  );
};
