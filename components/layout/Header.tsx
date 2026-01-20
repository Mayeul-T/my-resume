import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { HeaderClient } from "./HeaderClient";

const navItemKeys = [
  { href: "#about", key: "about" },
  { href: "#experience", key: "experience" },
  { href: "#skills", key: "skills" },
  { href: "#education", key: "education" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
] as const;

export async function Header() {
  const t = await getTranslations("nav");

  const navItems = navItemKeys.map((item) => ({
    href: item.href,
    key: item.key,
    label: t(item.key),
  }));

  // Logo rendered server-side for faster LCP
  const logo = (
    <Link
      href="/"
      className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
    >
      Portfolio
    </Link>
  );

  return <HeaderClient navItems={navItems} logo={logo} />;
}
