"use client";

import React from "react";
import { useBackButton } from "@tma.js/sdk-react";
import Link from "next/link";

export default function CreatePage() {
  const backButton = useBackButton();
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    const listener = () => linkRef.current?.click();
    backButton.on("click", listener);
    backButton.show();

    return () => {
      backButton.off("click", listener);
      backButton.hide();
    };
  }, [backButton]);

  return (
    <div>
      crepate page
      <Link className="hidden" ref={linkRef} href="/orders" />
    </div>
  );
}
