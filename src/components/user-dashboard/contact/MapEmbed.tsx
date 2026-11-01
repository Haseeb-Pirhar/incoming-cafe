import { CAFE } from "@/constants/cafe";
import { COFFEE } from "../theme";

export default function MapEmbed() {
    const query = encodeURIComponent(
        `${CAFE.name}, ${CAFE.address.line1}, ${CAFE.address.line2}`,
    );

    return (
        <div
            className="overflow-hidden rounded-3xl"
            style={{ boxShadow: `10px 12px 0 ${COFFEE.caramel}` }}
        >
            <iframe
                title={`Map showing ${CAFE.name}`}
                src={`https://www.google.com/maps?q=${query}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-80 w-full sm:h-96"
                style={{ border: 0 }}
            />
        </div>
    );
}