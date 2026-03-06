export function BackgroundDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Large primary orb — top left */}
      <div className="absolute -left-40 -top-40 h-150 w-150 rounded-full bg-primary/15 blur-[120px]" />
      {/* Accent orb — top right */}
      <div className="absolute -right-20 top-[15%] h-125 w-125 rounded-full bg-accent/12 blur-[120px]" />
      {/* Primary orb — center left */}
      <div className="absolute -left-20 top-[45%] h-112.5 w-112.5 rounded-full bg-primary/10 blur-[100px]" />
      {/* Accent orb — bottom right */}
      <div className="absolute -bottom-32 -right-32 h-137.5 w-137.5 rounded-full bg-accent/12 blur-[120px]" />
      {/* Small bright accent — mid page */}
      <div className="absolute left-[60%] top-[60%] h-75 w-75 rounded-full bg-primary/8 blur-[80px]" />
    </div>
  );
}
