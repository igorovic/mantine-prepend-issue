# Place your emtion style in the desired spot

`@emotion/cache@11.6.0` has deprecated the option `prepend` in favor of `insertionPoint`. [link](https://newreleases.io/project/github/emotion-js/emotion/release/@emotion%2Fcache@11.6.0)

When I tested `insertionPoint` option in a Next.js app with the [mantine](https://mantine.dev/) UI library the behavior was not consistent between `development` and `production` mode.

In `development` everything seemed fine. However in `production` mantine style where prepend to the head. Since I use a `global.css` stylesheet to normalize styles it was loaded after the mantine style. Hence my normalization style where overriding mantine styles and the button was transparent in production.

![btn transparent example]()

Eventually, after many trials I was able to make it work. Here is how.

## References

- [mantine SSR cache](https://mantine.dev/guides/ssr/)
