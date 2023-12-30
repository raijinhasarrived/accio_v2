import React from "react";
import { DisplayGate, useInitData } from "@tma.js/sdk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";

import i18n from "@/lib/i18n";
import { LottieLoader } from "@/components/ui/lottie-loader";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

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

  const initData = useInitData();

  React.useEffect(() => {
    i18n.changeLanguage(initData?.user?.languageCode);
  }, [initData]);

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={client}>
        <DisplayGate
          error={SDKProviderError}
          loading={SDKProviderLoading}
          initial={SDKInitialState}
        >
          {children}
        </DisplayGate>
      </QueryClientProvider>
    </I18nextProvider>
  );
};
