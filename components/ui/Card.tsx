interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  const baseClasses = "rounded-2xl border border-border bg-card p-6";
  const hoverClasses = hover
    ? "transition-all duration-normal hover:border-primary/50 hover:shadow-lg"
    : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
