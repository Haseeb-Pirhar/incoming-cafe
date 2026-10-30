import { cookies, headers as nextHeaders } from "next/headers";
import {
  ACCESS_TOKEN_COOKIE,
  APP_NAME,
  APP_ENV,
  APP_VERSION,
} from "@/constants";

const HEADER_YallahNshoof_APPLICATION = "YallahNshoof-Application";
const HEADER_YallahNshoof_APP_VERSION = "YallahNshoof-AppVersion";
const HEADER_YallahNshoof_RUN_ENVIRONMENT = "YallahNshoof-RunEnvironment";
const HEADER_YallahNshoof_DEVICE = "YallahNshoof-Device";
const HEADER_AUTHORIZATION = "Authorization";
const HEADER_CONTENT_TYPE = "Content-Type";
const HEADER_USER_AGENT = "user-agent";
const BEARER_AUTHENTICATION = "Bearer";
const CONTENT_TYPE_JSON = "application/json; charset=utf-8";

const createHeaders = async (init?: HeadersInit): Promise<HeadersInit> => {
  const headers = new Headers(init);

  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (token && !headers.get(HEADER_AUTHORIZATION)) {
    headers.set(HEADER_AUTHORIZATION, `${BEARER_AUTHENTICATION} ${token}`);
  }

  const requestHeaders = await nextHeaders();
  const userAgent = requestHeaders.get(HEADER_USER_AGENT) ?? "";

  headers.set(HEADER_YallahNshoof_APPLICATION, APP_NAME);
  headers.set(HEADER_YallahNshoof_APP_VERSION, APP_VERSION);
  headers.set(HEADER_YallahNshoof_RUN_ENVIRONMENT, APP_ENV);
  headers.set(HEADER_YallahNshoof_DEVICE, userAgent);

  return headers;
};

const createAuthzHeader = (token: string): HeadersInit => ({
  [HEADER_AUTHORIZATION]: `${BEARER_AUTHENTICATION} ${token}`,
});

const createJsonHeader = (): HeadersInit => ({
  [HEADER_CONTENT_TYPE]: CONTENT_TYPE_JSON,
});

export { createHeaders, createAuthzHeader, createJsonHeader };
