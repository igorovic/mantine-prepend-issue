# Place your emtion style in the desired spot

`@emotion/cache@11.6.0` has deprecated the option `prepend` in favor of `insertionPoint`. [link](https://newreleases.io/project/github/emotion-js/emotion/release/@emotion%2Fcache@11.6.0)

When I tested `insertionPoint` option in a Next.js app with the [mantine](https://mantine.dev/) UI library the behavior was not consistent between `development` and `production` mode.

In `development` everything seemed fine. However in `production` mantine style where prepend to the head. Since I use a `global.css` stylesheet to normalize styles it was loaded after the mantine style. Hence my normalization style where overriding mantine styles and the button was transparent in production.

![btn transparent example](https://raw.githubusercontent.com/igorovic/mantine-prepend-issue/main/public/btn1.gif)

Eventually, after many trials I was able to make it work. _The issue seems related to the hydration process_.

The tipping point of the solution was to call `createEmotionCache` inside the rendering context of `_app.tsx`.

```tsx
export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  // get the cache instance in the context of _app rendering
  // Note: if the cache instance is retrieved outside the _app rendering context the insertionPoint is propery identified
  const cache = emCache();
  return (
    <>
      <Head>
```

## Emtion cache creation function

```ts
// lib/emotionCache.ts
import { createEmotionCache, EmotionCache } from "@mantine/core";
import { last } from "remeda";
//cache instance
let cache: EmotionCache | undefined;

const getInsertionPoint = () =>
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
```

## Notes

I did not spend much time testing this implementation and maybe I am missing something. Any help, feedback will be appreciated.

## References

- [mantine SSR cache](https://mantine.dev/guides/ssr/)
- [https://github.com/mantinedev/mantine/issues/2119](https://github.com/mantinedev/mantine/issues/2119)
- [https://github.com/emotion-js/emotion/issues/2803](https://github.com/emotion-js/emotion/issues/2803)
- [https://github.com/emotion-js/emotion/issues/2790](https://github.com/emotion-js/emotion/issues/2790)
