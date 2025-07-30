import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  return {
    reason:
      event.url.searchParams.get('reason') || 'An unknown error occurred.',
  };
};
