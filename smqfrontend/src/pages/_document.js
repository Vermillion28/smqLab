import { Html, Head, Main, NextScript } from "next/document";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Theme>
        <Main />
        <NextScript />
        </Theme>
      </body>
    </Html>
  );
}
