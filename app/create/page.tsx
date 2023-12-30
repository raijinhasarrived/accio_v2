"use client";

import React from "react";
import { useBackButton } from "@tma.js/sdk-react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function CreatePage() {
  const backButton = useBackButton();
  const pathname = usePathname();
  const router = useRouter();
  React.useEffect(() => {
    const listener = () => router.push("/orders");
    backButton.on("click", listener);
    pathname === "/orders" ? backButton.hide() : backButton.show();

    return () => {
      backButton.off("click", listener);
      backButton.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backButton]);

  console.log(pathname);

  return <div>crepate page</div>;
}
