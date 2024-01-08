"use client";

import React from "react";

import Lottie from "lottie-react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import eyes from "@/public/17 Eyes.json";
import cross from "@/public/11 Cross Mark.json";
import { getNextOrders } from "@/supabase/orders";

import { OrderCard } from "@/components/order-card";
import { LottieLoader } from "@/components/ui/lottie-loader";

export default function Orders() {
  const { ref, inView } = useInView();

  const {
    data: orders,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["orders"],
    async ({ pageParam }) => {
      const { from, to } = pageParam || {};

      const res = await getNextOrders(from, to);

      return res.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length > 0) {
          let from = allPages.length * 4 + 1;
          let to = from + lastPage.length;

          return { from, to };
        }
        return undefined;
      },
    },
  );

  const handleFetchNextPage = React.useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  React.useEffect(() => {
    if (inView) {
      handleFetchNextPage();
    }
  }, [inView, handleFetchNextPage]);

  if (isLoading) {
    return <LottieLoader />;
  }

  if (!isSuccess || orders === undefined) {
    return <Lottie className="h-52 w-52" animationData={cross} />;
  }

  return (
    <div className="mt-14 md:mt-0">
      <div className="mx-auto grid w-fit grid-cols-1 content-center gap-4 sm:w-full">
        {orders &&
          orders.pages.map((order) =>
            order.map((order) => <OrderCard key={order.id} order={order} />),
          )}
        <button
          className="flex items-center justify-center"
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <Lottie loop={false} className="h-44 w-44" animationData={eyes} />
          ) : hasNextPage ? (
            "Load Newer"
          ) : (
            <Lottie loop={false} className="h-44 w-44" animationData={cross} />
          )}
        </button>
      </div>
    </div>
  );
}
