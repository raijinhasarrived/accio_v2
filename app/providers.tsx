import React from "react";
import { useInitData } from "@tma.js/sdk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";

import i18n from "@/lib/i18n";

export const Providers = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </I18nextProvider>
  );
};
