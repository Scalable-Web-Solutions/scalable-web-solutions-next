"use client";

import { useEffect, type ReactNode } from "react";

export default function ClientOnly({
  children,
  hideOnMountSelector,
}: {
  children: ReactNode;
  hideOnMountSelector?: string;
}) {
  useEffect(() => {
    if (!hideOnMountSelector) return;
    document.querySelectorAll<HTMLElement>(hideOnMountSelector).forEach((el) => {
      el.style.display = "none"; // swap to a fade class if you want a transition
    });
  }, [hideOnMountSelector]);

  return <>{children}</>;
}