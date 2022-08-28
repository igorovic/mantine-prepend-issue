import "../styles/global.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { emCache } from "../lib/emotionCache";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  // get the cache instance in the context of _app rendering
  // Note: if the cache instance is retrieved outside the _app rendering context the insertionPoint is propery identified
  const cache = emCache();
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        emotionCache={cache}
        withGlobalStyles={false}
        withNormalizeCSS={false}
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
