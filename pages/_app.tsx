import "../styles/globals.css";
import "../styles/Slider.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import { ContextProvider } from "../context/ContextProvider";

import Layout from "../components/nav/Layout";

const netFlixSans = localFont({
  src: [
    { path: "./fonts/light.otf", weight: "100", style: "normal" },
    { path: "./fonts/regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/bold.otf", weight: "800", style: "normal" },
  ],
});
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${netFlixSans.className} bg-black`}>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </main>
  );
}
