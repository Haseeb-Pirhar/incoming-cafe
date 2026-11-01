"use client";

import { useState } from "react";
import FormField from "../FormField";
import { sendContactMessage } from "@/api/api-call/contact";
import { ACCENT } from "../theme";

type Values = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: Values = { name: "", email: "", message: "" };

function validate(v: Values): Errors {
    const errors: Errors = {};
    if (!v.name.trim()) errors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) errors.email = "Please enter a valid email address.";
    if (v.message.trim().length < 10) errors.message = "Please write at least 10 characters.";
    return errors;
}

export default function ContactForm() {
    const [values, setValues] = useState<Values>(EMPTY);
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<Status>("idle");

    const handleChange =
        (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setValues((v) => ({ ...v, [key]: e.target.value }));
            if (status !== "idle") setStatus("idle");
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        setStatus("sending");
        const ok = await sendContactMessage(values);
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
            className="space-y-5 rounded-2xl p-6 sm:p-8"
            style={{ backgroundColor: ACCENT.card, border: `1px solid ${ACCENT.ink}1A` }}
        >
            <FormField
                id="name"
                label="Your name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange("name")}
                error={errors.name}
            />
            <FormField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange("email")}
                error={errors.email}
            />
            <FormField
                id="message"
                label="Message"
                multiline
                value={values.message}
                onChange={handleChange("message")}
                error={errors.message}
            />

            <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: ACCENT.teal, outlineColor: ACCENT.teal }}
            >
                {status === "sending" ? "Sending..." : "Send message"}
            </button>

            <div role="status" aria-live="polite" className="text-sm">
                {status === "sent" && (
                    <p style={{ color: ACCENT.tealDark }}>Thanks, your message has been sent.</p>
                )}
                {status === "error" && (
                    <p style={{ color: "#B3261E" }}>
                        Sorry, we could not send your message. Please visit us in store instead.
                    </p>
                )}
            </div>
        </form>
    );
}