import { cookies } from "next/headers";
import {
  ActionErrorState,
  ActionResult,
  ActionSuccessState,
  GetOptions,
  NetworkResult,
} from "@/types/api";
import { getErrorMessage } from "@/utils/api";
import { createHeaders, createJsonHeader } from "./headers";

// ── Cookie forwarding helpers ──────────────────────────────────────────
const getForwardedCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
};

// Works whether baseHeaders is a Headers instance, plain object, or undefined —
// unlike `{ ...baseHeaders, Cookie: x }` which silently drops entries when
// baseHeaders is a real Headers instance.
const mergeWithCookie = async (baseHeaders: HeadersInit | undefined) => {
  const merged = new Headers(baseHeaders);
  merged.set("Cookie", await getForwardedCookieHeader());
  return merged;
};

const forwardSetCookies = async (response: Response) => {
  const setCookies = (response.headers as any).getSetCookie?.() as
    | string[]
    | undefined;
  if (!setCookies?.length) return;

  const cookieStore = await cookies();

  setCookies.forEach((cookieStr) => {
    const [nameValue, ...attrs] = cookieStr.split("; ");
    const eqIndex = nameValue.indexOf("=");
    const name = nameValue.slice(0, eqIndex);
    const value = nameValue.slice(eqIndex + 1);

    const maxAgeAttr = attrs.find((a) =>
      a.toLowerCase().startsWith("max-age="),
    );
    const maxAge = maxAgeAttr ? Number(maxAgeAttr.split("=")[1]) : undefined;

    cookieStore.set(name, decodeURIComponent(value), {
      httpOnly: attrs.some((a) => a.toLowerCase() === "httponly"),
      sameSite: "lax",
      secure: attrs.some((a) => a.toLowerCase() === "secure"),
      maxAge,
      path: "/",
    });
  });
};
// ─────────────────────────────────────────────────────────────────────

const GET = async <T>(
  url: string,
  options: GetOptions = {},
): Promise<NetworkResult<T>> => {
  const { headers, ...rest } = options;

  const next = rest.next as NextFetchRequestConfig | undefined;

  const baseHeaders = !rest.ignoreHeaders
    ? await createHeaders({ ...headers })
    : undefined;

  const response = await fetch(url, {
    headers: await mergeWithCookie(baseHeaders),
    cache: next?.revalidate ? undefined : "no-store",
    ...rest,
  });
  await forwardSetCookies(response);
  const data = getResponseData(await response.text());

  if (!response.ok) {
    return {
      state: false,
      error: getErrorMessage(data),
      ...response,
    };
  }

  return {
    state: true,
    data,
    ...response,
  };
};

interface PostOptions extends RequestInit {
  ignoreHeaders?: boolean;
}

const POST = async <T>(
  url: string,
  body?: FormData | object,
  options: PostOptions = {},
): Promise<NetworkResult<T>> => {
  const { headers, ...rest } = options;

  const isBodyFormData = body instanceof FormData;
  const reqHeaders = rest.ignoreHeaders
    ? createJsonHeader()
    : await createHeaders({
        ...(isBodyFormData ? {} : createJsonHeader()),
        ...headers,
      });

  const response = await fetch(url, {
    method: "POST",
    headers: await mergeWithCookie(reqHeaders),
    body: isBodyFormData ? body : JSON.stringify(body),
    ...rest,
  });
  await forwardSetCookies(response);
  const data = getResponseData(await response.text());

  if (!response.ok) {
    return {
      state: false,
      error: getErrorMessage(data),
      ...response,
    };
  }

  return {
    state: true,
    data,
    ...response,
  };
};

const PATCH = async <T>(
  url: string,
  body: FormData | object,
  options: PostOptions = {},
): Promise<NetworkResult<T>> => {
  const { headers, ...rest } = options;

  const isBodyFormData = body instanceof FormData;
  const reqHeaders = rest.ignoreHeaders
    ? createJsonHeader()
    : await createHeaders({
        ...(isBodyFormData ? {} : createJsonHeader()),
        ...headers,
      });

  const response = await fetch(url, {
    method: "PATCH",
    headers: await mergeWithCookie(reqHeaders),
    body: isBodyFormData ? body : JSON.stringify(body),
    ...rest,
  });

  await forwardSetCookies(response);
  const data = getResponseData(await response.text());

  if (!response.ok) {
    return {
      state: false,
      error: getErrorMessage(data),
      ...response,
    };
  }

  return {
    state: true,
    data,
    ...response,
  };
};

const PUT = async <T>(
  url: string,
  body: FormData | object,
  options: PostOptions = {},
): Promise<NetworkResult<T>> => {
  const { headers, ...rest } = options;

  const isBodyFormData = body instanceof FormData;
  const reqHeaders = rest.ignoreHeaders
    ? createJsonHeader()
    : await createHeaders({
        ...(isBodyFormData ? {} : createJsonHeader()),
        ...headers,
      });

  const response = await fetch(url, {
    method: "PUT",
    headers: await mergeWithCookie(reqHeaders),
    body: isBodyFormData ? body : JSON.stringify(body),
    ...rest,
  });

  await forwardSetCookies(response);
  const data = getResponseData(await response.text());

  if (!response.ok) {
    return {
      state: false,
      error: getErrorMessage(data),
      ...response,
    };
  }

  return {
    state: true,
    data,
    ...response,
  };
};

type DeleteOptions = RequestInit;

const DELETE = async <T>(
  url: string,
  body?: object,
  options: DeleteOptions = {},
): Promise<NetworkResult<T>> => {
  const { headers, ...rest } = options;

  const reqHeaders = await createHeaders({ ...createJsonHeader(), ...headers });

  const response = await fetch(url, {
    method: "DELETE",
    headers: await mergeWithCookie(reqHeaders),
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  await forwardSetCookies(response);
  const data = getResponseData(await response.text());

  if (!response.ok) {
    return {
      state: false,
      error: getErrorMessage(data),
      ...response,
    };
  }

  return {
    state: true,
    data,
    ...response,
  };
};

const getResponseData = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export {
  GET,
  POST,
  PATCH,
  PUT,
  DELETE,
  type ActionResult,
  type ActionErrorState,
  type ActionSuccessState,
  type NetworkResult,
};
