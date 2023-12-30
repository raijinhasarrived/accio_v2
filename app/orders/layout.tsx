"use client";

import Link from "next/link";

import {
  PersonIcon,
  QuestionMarkCircledIcon,
  FilePlusIcon,
} from "@radix-ui/react-icons";

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
        <Link
          className="w-fit rounded-sm bg-[var(--tg-theme-button-color)] p-2 text-center text-lg text-[var(--tg-theme-button-text-color)]"
          href="/create"
        >
          <FilePlusIcon className="h-9 w-9" />
        </Link>
        <Link
          className="w-fit rounded-sm bg-[var(--tg-theme-button-color)] p-2 text-center text-lg text-[var(--tg-theme-button-text-color)]"
          href="/user"
        >
          <PersonIcon className="h-9 w-9" />
        </Link>
        <Link
          className="w-fit rounded-sm bg-[var(--tg-theme-button-color)] p-2 text-center text-lg text-[var(--tg-theme-button-text-color)]"
          href="/help"
        >
          <QuestionMarkCircledIcon className="h-9 w-9" />
        </Link>
      </div>
      {children}
    </div>
  );
}
