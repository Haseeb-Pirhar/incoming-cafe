"use client";

import { useState } from "react";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import FormField from "../FormField";
import { sendBooking } from "@/api/api-call/booking";
import { COFFEE, FONT } from "../theme";

type Values = {
    name: string;
    email: string;
    date: string;
    time: string;
    people: string;
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: Values = { name: "", email: "", date: "", time: "", people: "2" };
const PEOPLE = Array.from({ length: 10 }, (_, i) => i + 1);

const todayLocal = () => {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

function validate(v: Values): Errors {
    const errors: Errors = {};
    if (!v.name.trim()) errors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim()))
        errors.email = "Please enter a valid email address.";
    if (!v.date) errors.date = "Pick a date.";
    else if (v.date < todayLocal()) errors.date = "Date can't be in the past.";
    if (!v.time) errors.time = "Pick a time.";
    return errors;
}

export default function BookingForm() {
    const [values, setValues] = useState<Values>(EMPTY);
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<Status>("idle");

    const handleChange =
        (key: keyof Values) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setValues((v) => ({ ...v, [key]: e.target.value }));
                if (status !== "idle") setStatus("idle");
            };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        setStatus("sending");
        const ok = await sendBooking({ ...values, people: Number(values.people) });
        if (ok) {
            setValues(EMPTY);
            setStatus("sent");
        } else {
            setStatus("error");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-3 rounded-3xl p-5 shadow-2xl [&_input]:!px-3 [&_input]:!py-2 [&_input]:!text-sm [&_label]:!mb-1 [&_label]:!text-xs"
            style={{
                backgroundColor: COFFEE.cream,
                border: `1px solid ${COFFEE.espresso}1A`,
            }}
        >
            <h2
                className="pr-10 text-2xl font-semibold"
                style={{ color: COFFEE.espresso, fontFamily: FONT.display }}
            >
                Book a table
            </h2>

            <FormField
                id="book-name"
                label="Your name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange("name")}
                error={errors.name}
            />
            <FormField
                id="book-email"
                label="Email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange("email")}
                error={errors.email}
            />

            <div className="grid grid-cols-3 gap-2">
                <FormField
                    id="book-date"
                    label="Date"
                    type="date"
                    value={values.date}
                    onChange={handleChange("date")}
                    error={errors.date}
                />
                <FormField
                    id="book-time"
                    label="Time"
                    type="time"
                    value={values.time}
                    onChange={handleChange("time")}
                    error={errors.time}
                />
                <div>
                    <label
                        htmlFor="book-people"
                        className="mb-1 block text-xs font-medium"
                        style={{ color: COFFEE.espresso }}
                    >
                        Guests
                    </label>
                    <select
                        id="book-people"
                        value={values.people}
                        onChange={(e) => {
                            setValues((v) => ({ ...v, people: e.target.value }));
                            if (status !== "idle") setStatus("idle");
                        }}
                        className="w-full rounded-2xl bg-white px-2 py-2 text-sm outline-none transition focus-visible:outline-2 focus-visible:outline-offset-1 focus:shadow-md"
                        style={{
                            border: `1.5px solid ${COFFEE.espresso}4D`,
                            color: COFFEE.espresso,
                            outlineColor: COFFEE.caramel,
                        }}
                    >
                        {PEOPLE.map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={status === "sending"}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: COFFEE.caramel, outlineColor: COFFEE.espresso }}
            >
                <CalendarCheck
                    size={18}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:scale-110"
                />
                {status === "sending" ? "Reserving..." : "Reserve now"}
            </button>

            <div role="status" aria-live="polite" className="text-sm empty:hidden">
                {status === "sent" && (
                    <p
                        className="flex items-center gap-2 font-medium"
                        style={{ color: COFFEE.mocha }}
                    >
                        <CheckCircle2 size={18} aria-hidden />
                        Thanks, we got your request. We will confirm by email.
                    </p>
                )}
                {status === "error" && (
                    <p style={{ color: "#B3261E" }}>
                        Sorry, we could not send your booking. Please visit or contact us instead.
                    </p>
                )}
            </div>
        </form>
    );
}