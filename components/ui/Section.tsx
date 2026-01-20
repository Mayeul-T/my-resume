interface SectionProps {
  id: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, title, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 px-6 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {title && (
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-foreground md:text-4xl animate-on-scroll-css">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
