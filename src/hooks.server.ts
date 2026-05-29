import { handle as authHandle, authConfig } from '$lib/auth/auth';
import { getSession } from '@zitadel/sveltekit-auth';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

const conditionalAuth: Handle = async ({ event, resolve }) => {
  // Expose getSession via event.locals.auth so load functions AND
  // custom route handlers (like /api/auth/logout) can call it.
  event.locals.auth = () =>
    getSession(
      event as unknown as Parameters<typeof getSession>[0],
      authConfig,
    );

  // Skip Auth.js for our custom IdP-logout flow. Both /api/auth/logout
  // (the POST that initiates RP-initiated logout against the IdP) and
  // /api/auth/logout/callback (the GET that validates state and clears
  // cookies) are handled by application route files, not Auth.js.
  // Without this exemption, Auth.js receives those paths and throws
  // UnknownAction.
  if (
    event.url.pathname === '/api/auth/logout' ||
    event.url.pathname === '/api/auth/logout/callback'
  ) {
    return resolve(event);
  }

  return authHandle({
    event,
    resolve,
  } as unknown as Parameters<typeof authHandle>[0]);
};

// noinspection JSUnusedGlobalSymbols
export const handle = sequence(conditionalAuth, async ({ event, resolve }) => {
  const response = await resolve(event);

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
});
