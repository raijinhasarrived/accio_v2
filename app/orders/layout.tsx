"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import { useLaunchParams, useThemeParams } from "@tma.js/sdk-react";
import { useTranslation } from "react-i18next";

import { OrderLinks } from "@/components/order-links";
import { Button } from "@/components/ui/button";

import DeniedAnim from "@/public/24 Prohibited.json";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, i18n } = useTranslation();
  const theme = useThemeParams();
  const launchParams = useLaunchParams();
  const currentLanguage = i18n.language;

  const paramList = launchParams.initDataRaw?.split("&")!;

  let chatInstance: string | undefined;

  for (const param of paramList) {
    if (param.startsWith("chat_instance=")) {
      chatInstance = param.slice("chat_instance=".length);
      break;
    }
  }

  return (
    <div className="h-full w-full bg-background p-4">
      <div className="fixed left-0 top-0 mx-auto flex w-full justify-between bg-[var(--tg-bg-color)] p-2">
        <OrderLinks />
        {currentLanguage === "ru" ? (
          <Link
            style={{
              backgroundColor: theme.buttonColor!,
              color: theme.buttonTextColor!,
            }}
            className="marquee flex w-28 items-center rounded-sm px-2 text-lg"
            href="/user"
          >
            <div className="marquee-content flex w-max items-center justify-center text-center">
              <span>{t("mainPage.user")}</span>
              <span>{t("mainPage.user")}</span>
            </div>
          </Link>
        ) : (
          <Link href="/user">
            <Button
              className="w-28 rounded-sm px-2 text-center text-lg"
              style={{
                backgroundColor: theme.buttonColor!,
                color: theme.buttonTextColor!,
              }}
            >
              {t("mainPage.user")}
            </Button>
          </Link>
        )}
        <Link href="/help">
          <Button
            style={{
              backgroundColor: theme.buttonColor!,
              color: theme.buttonTextColor!,
            }}
            className="w-28 rounded-sm p-2 text-center text-lg"
          >
            {t("mainPage.help")}
          </Button>
        </Link>
      </div>
      {chatInstance === "1490042131658129959" ? (
        children
      ) : (
        <div
          style={{ color: theme.textColor! }}
          className="flex h-screen flex-col items-center justify-center gap-3 p-3"
        >
          <Lottie
            loop={false}
            className="h-44 w-44"
            animationData={DeniedAnim}
          />
          <h1>{t("mainPage.msg")}</h1>
          <a href="https://t.me/acciolog">
            <Button style={{ backgroundColor: theme.buttonColor! }}>
              {t("mainPage.action")}
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}
