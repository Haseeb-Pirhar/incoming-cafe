import { serverAction } from "../server-action";

// Backend still to build: POST /bookings  { name, email, date, time, people }
const BOOKING_ENDPOINT = "/bookings";

export interface BookingPayload {
    name: string;
    email: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    people: number;
}

export const sendBooking = async (payload: BookingPayload): Promise<boolean> => {
    try {
        const res = await serverAction({
            url: BOOKING_ENDPOINT,
            method: "POST",
            body: payload,
        });
        return res.state;
    } catch (error) {
        console.error("Error sending booking:", error);
        return false;
    }
};