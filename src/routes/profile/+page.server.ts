import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { signInUrl } from '$lib/auth/auth';

// noinspection JSUnusedGlobalSymbols
export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth();

  if (!session) {
    throw redirect(302, signInUrl({ redirectTo: event.url.pathname }));
  }

  return {
    session,
  };
};
