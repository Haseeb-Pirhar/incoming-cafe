"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import FormField from "../FormField";
import { sendContactMessage } from "@/api/api-call/contact";
import { COFFEE, FONT } from "../theme";

type Values = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: Values = { name: "", email: "", message: "" };

function validate(v: Values): Errors {
    const errors: Errors = {};
    if (!v.name.trim()) errors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim()))
        errors.email = "Please enter a valid email address.";
    if (v.message.trim().length < 10) errors.message = "Please write at least 10 characters.";
    return errors;
}

export default function ContactForm() {
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
            className="space-y-5 rounded-3xl p-6 shadow-xl sm:p-8"
            style={{
                backgroundColor: COFFEE.cream,
                border: `1px solid ${COFFEE.espresso}1A`,
            }}
        >
            <h2
                className="text-3xl font-semibold"
                style={{ color: COFFEE.espresso, fontFamily: FONT.display }}
            >
                Send us a message
            </h2>

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
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#4B3A2B] hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: COFFEE.espresso, outlineColor: COFFEE.espresso }}
            >
                {status === "sending" ? "Sending..." : "Send message"}
                <Send
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
            </button>

            <div role="status" aria-live="polite" className="text-sm">
                {status === "sent" && (
                    <p
                        className="flex items-center gap-2 font-medium"
                        style={{ color: COFFEE.mocha }}
                    >
                        <CheckCircle2 size={18} aria-hidden />
                        Thanks, your message has been sent.
                    </p>
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