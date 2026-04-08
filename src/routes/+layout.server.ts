import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  if (event.url.pathname === '/auth/logout/callback') {
    return { session: null };
  }
  return {
    session: await event.locals.auth(),
  };
};
