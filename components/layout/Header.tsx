import { getTranslations } from "next-intl/server";
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

  return <HeaderClient navItems={navItems} />;
}
