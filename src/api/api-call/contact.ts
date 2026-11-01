import { serverAction } from "../server-action";

// Backend still to build: POST /contact  { name, email, message }
const CONTACT_ENDPOINT = "/contact";

export interface ContactPayload {
    name: string;
    email: string;
    message: string;
}

export const sendContactMessage = async (payload: ContactPayload): Promise<boolean> => {
    try {
        const res = await serverAction({
            url: CONTACT_ENDPOINT,
            method: "POST",
            body: payload,
        });
        return res.state;
    } catch (error) {
        console.error("Error sending contact message:", error);
        return false;
    }
};