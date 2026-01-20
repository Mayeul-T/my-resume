import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { HeaderClient } from "./HeaderClient";
import { GithubIcon } from "@/components/ui";

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
    <a
      href="https://github.com/Mayeul-T/my-resume"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
    >
      <GithubIcon className="h-5 w-5" />
      My Resume
    </a>
  );

  return <HeaderClient navItems={navItems} logo={logo} />;
}
