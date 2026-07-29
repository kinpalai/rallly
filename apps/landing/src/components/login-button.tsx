"use client";

import { buttonVariants } from "@rallly/ui";
import Link from "next/link";
import { Trans } from "@/i18n/client/trans";
import { linkToApp } from "@/lib/linkToApp";

export function LoginButton() {
  return (
    <Link href={linkToApp()} className={buttonVariants({ variant: "primary" })}>
      <Trans i18nKey="login" defaults="Login" />
    </Link>
  );
}
