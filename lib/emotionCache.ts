import { createEmotionCache, EmotionCache } from "@mantine/core";
import { last } from "remeda";
//cache instance
let cache: EmotionCache | undefined;

const getInsertionPoint = () =>
  // only in production otherwide development is broken
  typeof document !== "undefined" && process.env.NODE_ENV === "production"
    ? last([
        ...(document
          .querySelector("head")
          ?.querySelectorAll<HTMLElement>(`script`) ?? []),
      ])
    : undefined;

const creatCache = () =>
  createEmotionCache({
    key: "mantine",
    insertionPoint: getInsertionPoint(),
  });

export const emCache = () => {
  console.log("= insertionPoint element = ", getInsertionPoint());
  // we create the cache instance only once so it's consistent between SSR and client side.
  if (!cache) {
    cache = creatCache();
  }

  return cache;
};
