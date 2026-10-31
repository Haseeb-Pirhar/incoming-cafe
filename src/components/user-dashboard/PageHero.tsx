import { ACCENT, FONT } from "./theme";

interface PageHeroProps {
  title: string;
  description?: string;
}

// Header strip for inner pages (Menu, About, Contact).
export default function PageHero({ title, description }: PageHeroProps) {
  return (
    <section style={{ backgroundColor: ACCENT.paper }}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1
          className="text-4xl font-semibold sm:text-5xl"
          style={{ color: ACCENT.ink, fontFamily: FONT.display }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="mt-4 max-w-xl text-lg leading-relaxed"
            style={{ color: `${ACCENT.ink}CC` }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
