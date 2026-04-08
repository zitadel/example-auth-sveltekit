import { handle as authHandle } from '$lib/auth/auth';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

const conditionalAuth: Handle = ({ event, resolve }) => {
  if (event.url.pathname === '/auth/logout/callback') {
    return resolve(event);
  }
  return authHandle({ event, resolve });
};

export const handle = sequence(conditionalAuth, async ({ event, resolve }) => {
  const response = await resolve(event);

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
});
