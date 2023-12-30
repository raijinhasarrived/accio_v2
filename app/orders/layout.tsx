"use client";

import Link from "next/link";

import { useThemeParams } from "@tma.js/sdk-react";
import { useTranslation } from "react-i18next";
import { PersonIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";

import { OrderLinks } from "@/components/order-links";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full bg-background p-4">
      <div className="fixed left-0 top-0 mx-auto flex w-full justify-between bg-[var(--tg-background-color)] p-2">
        <OrderLinks />
        <Link className="w-fit" href="/user">
          <PersonIcon />
        </Link>
        <Link className="w-fit" href="/help">
          <QuestionMarkCircledIcon />
        </Link>
      </div>
      {children}
    </div>
  );
}
