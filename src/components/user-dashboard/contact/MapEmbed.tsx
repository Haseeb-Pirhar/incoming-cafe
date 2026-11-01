import { CAFE } from "@/constants/cafe";
import { ACCENT } from "../theme";

export default function MapEmbed() {
    const query = encodeURIComponent(
        `${CAFE.name}, ${CAFE.address.line1}, ${CAFE.address.line2}`,
    );

    return (
        <iframe
            title={`Map showing ${CAFE.name}`}
            src={`https://www.google.com/maps?q=${query}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full rounded-2xl sm:h-96"
            style={{ border: `1px solid ${ACCENT.ink}1A` }}
        />
    );
}