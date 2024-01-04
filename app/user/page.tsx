"use client";

import React from "react";
import Lottie from "lottie-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useBackButton, useInitData } from "@tma.js/sdk-react";

import { LottieLoader } from "@/components/ui/lottie-loader";
import { getUserOrders } from "@/supabase/orders";

import cross from "@/public/11 Cross Mark.json";
import { OrderCard } from "@/components/order-card";

export default function UserPage() {
  const initData = useInitData();
  const backButton = useBackButton();
  const router = useRouter();
  const userId = initData?.user?.id;

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
  const {
    data: orders,
    isLoading,
    isSuccess,
  } = useQuery(["user-orders"], async () => {
    return await getUserOrders(userId!);
  });

  if (isLoading) {
    return <LottieLoader />;
  }

  if (!isSuccess || orders === undefined) {
    return (
      <div className="h-screen items-center justify-center p-4">
        <h1>У вас пока нет объявлений</h1>
        <Lottie className="h-52 w-52" animationData={cross} />
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-fit grid-cols-1 content-center gap-4 py-4 sm:w-full">
      {orders &&
        orders.map((order) => <OrderCard key={order.id} order={order} />)}
    </div>
  );
}
