import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  return {
    error: event.url.searchParams.get('error'),
    callbackUrl: event.url.searchParams.get('callbackUrl') || '/profile',
  };
};
