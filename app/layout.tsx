import "@/app/globals.css";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={outfit.variable}>
      <body className={`min-h-screen bg-background text-foreground antialiased ${outfit.className}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
