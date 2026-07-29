import { absoluteUrl } from "@rallly/utils/absolute-url";
import type { MetadataRoute } from "next";
import {
  getAlternateLanguages,
  getPostAlternateLanguages,
} from "@/lib/alternates";
import { getAllPosts, getPostLocales } from "@/lib/api";

const seoPages = [
  "/best-doodle-alternative",
  "/free-scheduling-poll",
  "/when2meet-alternative",
];

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts(["slug", "date", "updated"]);

  return [
    {
      url: absoluteUrl(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: getAlternateLanguages("/"),
      },
    },
    {
      url: absoluteUrl("/pricing"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: getAlternateLanguages("/pricing"),
      },
    },
    ...seoPages.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: getAlternateLanguages(path),
      },
    })),
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: getAlternateLanguages("/blog"),
      },
    },
    ...posts.flatMap((post) => {
      const translatedLocales = getPostLocales(post.slug);
      const entry = {
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: "yearly" as const,
        priority: 0.7,
      };
      if (translatedLocales.length === 0) {
        return [{ ...entry, url: absoluteUrl(`/blog/${post.slug}`) }];
      }
      const languages = getPostAlternateLanguages({
        slug: post.slug,
        translatedLocales,
      });
      return ["en", ...translatedLocales].map((locale) => ({
        ...entry,
        url: languages[locale] as string,
        alternates: { languages },
      }));
    }),
  ];
}
