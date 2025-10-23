declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

declare module '$env/static/private' {
  export const SESSION_DURATION: string;
  export const SESSION_SECRET: string;
  export const ZITADEL_CLIENT_ID: string;
  export const ZITADEL_CLIENT_SECRET: string;
  export const ZITADEL_DOMAIN: string;
  export const ZITADEL_POST_LOGOUT_URL: string;
}

export {};
