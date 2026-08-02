import "@/styles/globals.css";
import StructuredData from "@/components/StructuredData";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <StructuredData />
      <Component {...pageProps} />
      <CookieConsent />
    </>
  );
}
