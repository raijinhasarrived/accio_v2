"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useThemeParams } from "@tma.js/sdk-react";
import { LineHeightIcon } from "@radix-ui/react-icons";

import { pageLinks } from "@/lib/constants";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";

export const OrderLinks = () => {
  const { t } = useTranslation();
  const theme = useThemeParams();

  const sheetCloseRef = React.useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = React.useState<string | null>(null);

  React.useEffect(() => {
    setPrevPathname(pathname);
    const handleRouteChange = () => {
      if (sheetCloseRef.current !== null) {
        sheetCloseRef.current.click();
      }
    };

    if (prevPathname !== null && prevPathname !== pathname) {
      handleRouteChange();
    }
  }, [pathname, prevPathname]);

  const linkStyles = {
    color: theme.buttonColor!,
    background: theme.backgroundColor!,
    borderColor: theme.buttonColor!,
  };

  const activeLinkStyles = {
    color: theme.buttonTextColor!,
    background: theme.buttonColor!,
  };

  return (
    <Sheet>
      <SheetTrigger className="w-fit rounded-sm bg-[var(--tg-theme-button-color)] p-2 text-center text-lg text-[var(--tg-theme-button-text-color)]">
        <LineHeightIcon className="h-9 w-9" />
      </SheetTrigger>

      <SheetContent
        style={{ backgroundColor: theme.backgroundColor! }}
        side="top"
        className="grid h-1/3 grid-cols-2 items-end bg-[var(--tg-background-color)] py-3"
      >
        {pageLinks.map((link) => (
          <Badge
            className="h-fit w-fit text-base"
            style={link.href === pathname ? activeLinkStyles : linkStyles}
          >
            <Link className="w-fit" id={link.value} href={link.href}>
              {link.name}
            </Link>
          </Badge>
        ))}
        <Badge
          className="h-fit w-fit text-base"
          style={"/orders" === pathname ? activeLinkStyles : linkStyles}
        >
          <Link className="w-fit" href="/find">
            {t("filter.all")}
          </Link>
        </Badge>
        <SheetClose className="hidden" ref={sheetCloseRef} />
      </SheetContent>
    </Sheet>
  );
};
