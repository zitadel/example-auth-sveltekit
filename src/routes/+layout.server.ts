import type { LayoutServerLoad } from './$types';

// noinspection JSUnusedGlobalSymbols
export const load: LayoutServerLoad = async (event) => {
  if (event.url.pathname === '/api/auth/logout/callback') {
    return { session: null };
  }
  return {
    session: await event.locals.auth(),
  };
};
