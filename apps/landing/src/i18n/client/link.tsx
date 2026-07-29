"use client";

import { defaultLocale } from "@rallly/languages";
import Link from "next/link";
import { useParams } from "next/navigation";

export const LinkBase = ({
  href,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
}) => {
  // The route segment, not i18next's resolved language: a locale without its
  // own resources (en-GB) resolves to en, which would point every link at
  // another locale's pages.
  const params = useParams<{ locale?: string }>();
  const locale =
    !params.locale || params.locale === defaultLocale
      ? ""
      : `/${params.locale}`;
  const newHref = href.startsWith("/") ? `${locale}${href}` : href;

  return <Link href={newHref} {...props} />;
};
