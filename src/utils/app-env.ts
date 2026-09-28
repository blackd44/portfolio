export const APP_ENV =
  process.env.NEXT_PUBLIC_APP_ENV ||
  (process.env.NODE_ENV === "production" ? "production" : "development");

export const IS_PRODUCTION = APP_ENV === "production";
