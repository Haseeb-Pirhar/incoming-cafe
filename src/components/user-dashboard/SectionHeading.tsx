import { ACCENT, FONT } from "./theme";

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <h2
        className="text-3xl font-semibold sm:text-4xl"
        style={{ color: ACCENT.ink, fontFamily: FONT.display }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 max-w-xl text-base leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
          style={{ color: `${ACCENT.ink}B3` }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
