"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/utils/cn";

interface NavItem {
  href: string;
  key: string;
  label: string;
}

interface HeaderClientProps {
  navItems: NavItem[];
}

export function HeaderClient({ navItems }: HeaderClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? "md:bg-background/80 md:dark:bg-background/70 md:shadow-lg md:shadow-black/3 md:backdrop-blur-2xl md:dark:shadow-black/20"
          : "bg-transparent",
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-end px-6">
        {/* Desktop Navigation - truly centered */}
        <nav className="absolute inset-x-0 hidden justify-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-muted-foreground hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />

          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            size="small"
            shape="square"
            className="relative z-10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={2} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2} />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            className="glass-frost border-border mx-6 mb-6 rounded-lg border-t md:hidden"
            style={{ transformOrigin: "calc(100% - 28px) 0px" }}
            initial={{ scale: 0, y: -16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -16 }}
            transition={{
              y: { duration: 0.15, ease: "easeOut" },
              scale: {
                type: "spring",
                damping: 22,
                stiffness: 300,
              },
            }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="cursor-pointer text-muted-foreground hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-white/20 dark:hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
