import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-center px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} My Resume. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
