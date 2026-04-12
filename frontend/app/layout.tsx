import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../src/index.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "BKJOBS",
  description: "Nen tang tim viec va tuyen dung BKJOBS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
