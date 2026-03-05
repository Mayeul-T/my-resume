interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const baseClasses = "rounded-full px-3 py-1 text-xs font-medium";
  const variantClasses =
    variant === "default"
      ? "glass text-secondary-foreground"
      : "glass text-muted-foreground";

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}
