import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth();

  if (!session) {
    throw redirect(302, `/auth/login?callbackUrl=${event.url.pathname}`);
  }

  return {
    session,
  };
};
