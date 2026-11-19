import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sheila & Mark — Wedding Invitation",
  description: "Join Sheila Marie and Mark Joel for a summer wedding celebration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
