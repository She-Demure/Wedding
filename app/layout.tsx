import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Everly — Wedding Invitation Studio",
  description: "Create a wedding invitation as lovely as the day itself.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
