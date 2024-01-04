"use client";

import { Button } from "@/components/ui/button";
import { useLaunchParams, useThemeParams } from "@tma.js/sdk-react";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

import DeniedAnim from "@/public/24 Prohibited.json";
import React from "react";
import { redirect } from "next/navigation";

export default function HomePage() {
  const launchParams = useLaunchParams();
  const theme = useThemeParams();
  const { t } = useTranslation();

  const paramList = launchParams.initDataRaw?.split("&")!;
  let chatInstance: string | undefined;

  for (const param of paramList) {
    if (param.startsWith("chat_instance=")) {
      chatInstance = param.slice("chat_instance=".length);
      break;
    }
  }

  React.useEffect(() => {
    if (chatInstance === "1490042131658129959") {
      redirect("/orders");
    }
  }, [chatInstance]);

  return (
    <div
      style={{ color: theme.textColor! }}
      className="flex h-screen flex-col items-center justify-center gap-3 p-3"
    >
      <Lottie loop={false} className="h-44 w-44" animationData={DeniedAnim} />
      <h1>{t("mainPage.msg")}</h1>
      <a href="https://t.me/acciolog">
        <Button style={{ backgroundColor: theme.buttonColor! }}>
          {t("mainPage.action")}
        </Button>
      </a>
    </div>
  );
}
