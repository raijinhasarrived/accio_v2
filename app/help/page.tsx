"use client";

import React from "react";
import { useBackButton, useThemeParams, useUtils } from "@tma.js/sdk-react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function HelpPage() {
  const backButton = useBackButton();
  const router = useRouter();
  const theme = useThemeParams();
  const { t } = useTranslation();
  const utils = useUtils();

  React.useEffect(() => {
    const listener = () => router.push("/orders");
    backButton.on("click", listener);
    backButton.show();

    return () => {
      backButton.off("click", listener);
      backButton.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{ color: theme.textColor! }}
      className="flex h-screen flex-col p-4"
    >
      <p className="text-left">{t("help.about")}</p>
      <p className="mt-10">{t("help.feedback")}</p>

      <Button
        onClick={() => utils.openTelegramLink(`https://t.me/egoaccio`)}
        style={{
          backgroundColor: theme.buttonColor!,
          color: theme.buttonTextColor!,
        }}
        className="text-center"
      >
        @egoaccio
      </Button>
    </div>
  );
}
