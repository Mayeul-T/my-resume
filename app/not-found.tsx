import Link from "next/link";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export default function NotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
            <div className="text-center">
              <h1 className="mb-2 text-6xl font-bold text-foreground">404</h1>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                Page not found
              </h2>
              <p className="text-muted-foreground">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go back home
            </Link>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
