"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

interface IconButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}

export function IconButton({
  href,
  icon,
  label,
  external = true,
}: IconButtonProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-xl glass glass-hover text-muted-foreground hover:text-foreground"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={spring}
    >
      {icon}
    </motion.a>
  );
}
