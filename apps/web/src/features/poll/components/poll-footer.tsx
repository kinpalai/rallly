"use client";
import { posthog } from "@rallly/posthog/client";
import Link from "next/link";
import { useBranding } from "@/features/branding/client";
import { usePoll } from "@/features/poll/client";
import { Trans } from "@/i18n/client";

export function PollFooter() {
  const { hideAttribution } = useBranding();
  const poll = usePoll();

  if (hideAttribution) {
    return null;
  }

  return (
    <div className="py-6 text-center text-muted-foreground text-sm">
      <Trans
        defaults="Powered by <a>{name}</a>"
        i18nKey="poweredByKinpal"
        values={{ name: "kinpal.com" }}
        components={{
          a: (
            <Link
              prefetch={false}
              className="rounded-none border-b border-b-gray-500 font-semibold hover:text-primary"
              href="https://kinpal.com"
            />
          ),
        }}
      />
    </div>
  );
}
