import { error, redirect } from '@sveltejs/kit';
import { buildLogoutUrl } from '$lib/auth';
import type { Actions } from './$types';
import { dev } from '$app/environment';

/**
 * Initiates the logout process by redirecting the user to the external Identity
 * Provider's (IdP) logout endpoint. This endpoint validates that the user has an
 * active session with a valid ID token, generates a cryptographically secure state
 * parameter for CSRF protection, and stores it in a secure HTTP-only cookie.
 *
 * The state parameter will be validated upon the user's return from the IdP to
 * ensure the logout callback is legitimate and not a forged request.
 *
 * @param event - The SvelteKit event object containing the incoming HTTP request context,
 * including session information and cookie handling capabilities.
 * @returns A redirect response to the IdP's logout URL on success, or a 400-error
 * response if no valid session exists. The response includes a secure state cookie
 * that will be validated in the logout callback.
 */
export const actions: Actions = {
  default: async (event) => {
    const session = await event.locals.auth();

    if (!session?.idToken) {
      throw error(400, 'No valid session or ID token found');
    } else {
      const { url, state } = await buildLogoutUrl(session.idToken);

      event.cookies.set('logout_state', state, {
        httpOnly: true,
        secure: !dev,
        sameSite: 'lax',
        path: '/auth/logout/callback',
      });

      throw redirect(302, url);
    }
  },
};
