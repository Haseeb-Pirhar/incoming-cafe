import { COFFEE } from "../theme";

interface PriceListProps {
    bands: string[];
    suffix?: string;
}

// Price bands ek ke neeche ek, aakhir me "per person".
export default function PriceList({ bands, suffix = "per person" }: PriceListProps) {
    return (
        <div>
            <ul className="space-y-1">
                {bands.map((b) => (
                    <li key={b} className="font-medium" style={{ color: COFFEE.espresso }}>
                        {b}
                    </li>
                ))}
            </ul>
            <p className="mt-2 text-xs" style={{ color: `${COFFEE.espresso}99` }}>
                {suffix}
            </p>
        </div>
    );
}