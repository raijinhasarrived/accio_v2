import React from "react";
import { useInitData, useThemeParams } from "@tma.js/sdk-react";
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

type OrderCard = {
  order: Order;
};

export const OrderCard = ({ order }: OrderCard) => {
  const { t } = useTranslation();

  const initData = useInitData();
  const theme = useThemeParams();

  // const isCurrentUserOwner = initData?.user?.id === order.userId;

  const shouldShowBadge =
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
          {" "}
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
        {shouldShowBadge && (
          <a href={`https://t.me/${order.owner}`} target="_blank">
            <Button
              style={{
                backgroundColor: theme.buttonColor!,
                color: theme.buttonTextColor!,
              }}
              className="text-center"
            >
              @{order.owner}
            </Button>
          </a>
        )}

        {/* {isCurrentUserOwner && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="justify-start flex gap-2 items-center" variant="secondary">
                Статус
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Вы уверены, что хотите изменить статус?</AlertDialogTitle>
                <AlertDialogDescription>
                  После изменения статуса, объяление будет перемещено из текущего списка в выбранную
                  вами.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="gap-2">
                {(path === '/uz/platform/client' || path === '/platform/client') && (
                  <>
                    <AlertDialogAction onClick={() => handleChangeStatus(order.id!, 'done')}>
                      Выполнен
                    </AlertDialogAction>
                    <AlertDialogAction onClick={() => handleChangeStatus(order.id!, 'archived')}>
                      В архив
                    </AlertDialogAction>
                  </>
                )}
                <AlertDialogCancel>Отменить</AlertDialogCancel>

                {path !== '/uz/platform/client' && path !== '/platform/client' && (
                  <AlertDialogAction onClick={() => handleChangeStatus(order.id!, 'active')}>
                    Активный
                  </AlertDialogAction>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )} */}
      </CardFooter>
    </Card>
  );
};
