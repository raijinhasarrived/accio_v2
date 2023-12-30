"use client";

import React from "react";
import { useBackButton } from "@tma.js/sdk-react";

import { useRouter } from "next/navigation";

export default function CreatePage() {
  const backButton = useBackButton();

  const router = useRouter();
  React.useEffect(() => {
    const listener = () => router.push("/orders");
    backButton.on("click", listener);
    backButton.show();

    return () => {
      backButton.off("click", listener);
      backButton.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backButton]);

  return <div>crepate page</div>;
}
