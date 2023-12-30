"use client";

import React from "react";
import { useBackButton } from "@tma.js/sdk-react";
import { redirect } from "next/navigation";

export default function CreatePage() {
  const backButton = useBackButton();

  React.useEffect(() => {
    const listener = () => redirect("/orders");
    backButton.on("click", listener);
    backButton.show();

    return () => {
      backButton.off("click", listener);
      backButton.hide();
    };
  }, [backButton]);

  return <div>page</div>;
}
