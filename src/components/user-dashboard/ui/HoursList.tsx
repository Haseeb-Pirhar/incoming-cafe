import { Fragment } from "react";
import { COFFEE } from "../theme";

interface HoursListProps {
    hours: { days: string; time: string }[];
}

// Opening hours ko aligned rows me dikhata hai. Closed wala din halka dikhta hai.
export default function HoursList({ hours }: HoursListProps) {
    return (
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5">
            {hours.map((h) => {
                const closed = h.time.toLowerCase() === "closed";
                return (
                    <Fragment key={h.days}>
                        <dt className="font-medium" style={{ color: COFFEE.espresso }}>
                            {h.days}
                        </dt>
                        <dd style={{ color: closed ? `${COFFEE.espresso}80` : undefined }}>
                            {h.time}
                        </dd>
                    </Fragment>
                );
            })}
        </dl>
    );
}