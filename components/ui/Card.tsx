interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  const baseClasses = "rounded-2xl glass p-6";
  const hoverClasses = hover
    ? "transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10 hover:shadow-lg hover:shadow-primary/5"
    : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
