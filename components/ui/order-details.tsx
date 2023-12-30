"use client";

import { usePopup, useThemeParams } from "@tma.js/sdk-react";
import { Button } from "./button";
import { useTranslation } from "react-i18next";

type OrderDeatailsProps = {
  details: string;
};

export const OrderDetails = ({ details }: OrderDeatailsProps) => {
  const popup = usePopup();
  const theme = useThemeParams();
  const { t } = useTranslation();

  const handleShowPopup = () => {
    popup.open({
      title: t("orderForm.more"),
      message: details,
    });
  };
  return (
    <Button
      className={`text-black ${details.length < 1 && "hidden"} text-center`}
      variant="outline"
      style={{ borderColor: theme.buttonColor! }}
      onClick={handleShowPopup}
    >
      {t("orderForm.more")}
    </Button>
  );
};
