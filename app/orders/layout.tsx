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
          className="w-fit bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
          href="/create"
        >
          <FilePlusIcon className="h-6 w-6" />
        </Link>
        <Link
          className="w-fit bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
          href="/user"
        >
          <PersonIcon className="h-6 w-6" />
        </Link>
        <Link
          className="w-fit bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
          href="/help"
        >
          <QuestionMarkCircledIcon className="h-6 w-6" />
        </Link>
      </div>
      {children}
    </div>
  );
}
