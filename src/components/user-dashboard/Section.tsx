interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: string;
}

// Shared page-width wrapper so every section lines up the same way.
export default function Section({
  children,
  id,
  className = "",
  background,
}: SectionProps) {
  return (
    <section id={id} style={{ backgroundColor: background }}>
      <div
        className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
