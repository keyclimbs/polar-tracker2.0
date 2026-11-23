import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peakday — Polar Training Dashboard",
  description: "Personal Polar wearable recovery and training analytics",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
