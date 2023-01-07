import "../styles/globals.css";
import "../styles/Slider.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";

const netFlixSans = localFont({
  src: [
    { path: "./light.otf", weight: "100", style: "normal" },
    { path: "./regular.otf", weight: "400", style: "normal" },
    { path: "./medium.otf", weight: "500", style: "normal" },
    { path: "./bold.otf", weight: "800", style: "normal" },
  ],
});
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={netFlixSans.className}>
      <Component {...pageProps} />
    </main>
  );
}
