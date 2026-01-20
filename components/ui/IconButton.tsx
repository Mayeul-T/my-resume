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
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-normal hover:scale-110 hover:bg-secondary hover:text-foreground"
    >
      {icon}
    </a>
  );
}
