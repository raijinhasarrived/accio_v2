"use client";

import Link from "next/link";
import { useThemeParams } from "@tma.js/sdk-react";
import { useTranslation } from "react-i18next";

import { OrderLinks } from "@/components/order-links";
import { Button } from "@/components/ui/button";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, i18n } = useTranslation();
  const theme = useThemeParams();

  const currentLanguage = i18n.language;

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
      {children}
    </div>
  );
}
