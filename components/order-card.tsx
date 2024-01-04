"use client";

import React from "react";
import {
  useInitData,
  usePopup,
  useThemeParams,
  useUtils,
} from "@tma.js/sdk-react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import { pageLinks } from "@/lib/constants";
import { OrderDetails } from "@/components/ui/order-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabase";
import { useQueryClient } from "@tanstack/react-query";

type OrderCard = {
  order: Order;
};

export const OrderCard = ({ order }: OrderCard) => {
  const { t } = useTranslation();
  const utils = useUtils();
  const popup = usePopup();

  utils.openTelegramLink;
  const initData = useInitData();
  const theme = useThemeParams();

  const handleDelete = async () => {
    const result = await popup.open({
      title: `${order.owner}`,
      message: `${t("orderCard.delete")}`,
      buttons: [
        { type: "cancel" },
        {
          type: "destructive",
          text: `${t("orderForm.yes")}`,
          id: "order-delete",
        },
      ],
    });

    if (result === "order-delete") {
      try {
        const { status } = await supabase
          .from("orders")
          .delete()
          .eq("id", order.id);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const queryClient = useQueryClient();
        queryClient.invalidateQueries(["orders"]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const isCurrentUserOwner = initData?.user?.id === order.userId;

  const shouldShowLink =
    order.owner !== undefined && order.owner !== initData?.user?.username;

  const matchedPageLink = pageLinks.find((link) => link.value === order.cargo);
  const orderCargo = matchedPageLink?.name;

  return (
    <Card
      style={{
        borderColor: theme.buttonColor!,
      }}
      className="flex w-[260px] flex-col justify-between"
    >
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col items-center space-x-1 text-sm text-black">
            <p className="text-center font-medium">{order.from}</p>
            <ChevronDownIcon className="h-4 w-4" />
            <p className="text-center font-semibold">{order.to}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mb-auto flex flex-col gap-3">
        {order.roundtrip && (
          <Badge className={`w-fit select-none`}>
            {t("orderCard.roundtrip")} <CheckIcon />
          </Badge>
        )}

        <Badge className="w-fit select-none">
          {order.price} {order.curr}
        </Badge>
        <div className="flex gap-2">
          <Badge className="w-fit select-none">{orderCargo}</Badge>
          {order.prepayment && (
            <Badge className={`w-fit select-none`}>
              {t("orderCard.prepayment")} <CheckIcon />
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <OrderDetails details={order.details!} />
        {shouldShowLink && (
          <Button
            onClick={() =>
              utils.openTelegramLink(`https://t.me/${order.owner}`)
            }
            style={{
              backgroundColor: theme.buttonColor!,
              color: theme.buttonTextColor!,
            }}
            className="text-center"
          >
            @{order.owner}
          </Button>
        )}
        {!shouldShowLink && (
          <Button
            onClick={handleDelete}
            className="bg-[var(--tg-theme-destructive-text-color)] p-2"
          >
            {t("orderCard.delete")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
