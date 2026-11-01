import { COFFEE } from "./theme";

interface FormFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    multiline?: boolean;
    rows?: number;
    error?: string;
    autoComplete?: string;
}

const ERROR_COLOR = "#B3261E";

export default function FormField({
    id,
    label,
    value,
    onChange,
    type = "text",
    multiline = false,
    rows = 5,
    error,
    autoComplete,
}: FormFieldProps) {
    const common = {
        id,
        name: id,
        value,
        onChange,
        autoComplete,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? `${id}-error` : undefined,
        className:
            "w-full rounded-2xl bg-white px-4 py-3 text-base outline-none transition focus-visible:outline-2 focus-visible:outline-offset-1 focus:shadow-md",
        style: {
            border: `1.5px solid ${error ? ERROR_COLOR : `${COFFEE.espresso}4D`}`,
            color: COFFEE.espresso,
            outlineColor: COFFEE.caramel,
        },
    };

    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-sm font-medium"
                style={{ color: COFFEE.espresso }}
            >
                {label}
            </label>
            {multiline ? (
                <textarea {...common} rows={rows} />
            ) : (
                <input {...common} type={type} />
            )}
            {error && (
                <p id={`${id}-error`} className="mt-1.5 text-sm" style={{ color: ERROR_COLOR }}>
                    {error}
                </p>
            )}
        </div>
    );
}