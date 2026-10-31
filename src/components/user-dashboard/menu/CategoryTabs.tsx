"use client";

interface Option {
  key: string;
  label: string;
}

interface CategoryTabsProps {
  options: Option[];
  active: string;
  onChange: (key: string) => void;
}

// Filter pills, styled for the dark menu board.
export default function CategoryTabs({
  options,
  active,
  onChange,
}: CategoryTabsProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Menu categories"
    >
      {options.map((o) => {
        const isActive = o.key === active;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            aria-pressed={isActive}
            className="rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={
              isActive
                ? {
                    backgroundColor: "#fff",
                    color: "#1E2B2D",
                    border: "1.5px solid #fff",
                  }
                : {
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "1.5px solid rgba(255,255,255,0.4)",
                  }
            }
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
