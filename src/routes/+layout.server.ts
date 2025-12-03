import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  // Avoid fetching the session during the logout callback.
  // This prevents Auth.js from attempting to refresh the session token
  // while we are trying to delete it.
  if (event.url.pathname.includes('/auth/logout/callback')) {
    return { session: null };
  }

  return {
    session: await event.locals.auth(),
  };
};
