import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/**
 * Handles the callback from an external Identity Provider (IdP) after a user
 * signs out. This endpoint is responsible for validating the logout request to
 * prevent Cross-Site Request Forgery (CSRF) attacks by comparing a `state`
 * parameter from the URL with a value stored in a secure, server-side cookie.
 * If validation is successful, it clears the user's session cookies and
 * redirects to a success page. Otherwise, it redirects to an error page.
 *
 * @param event - The incoming SvelteKit event object, which contains the
 * URL and its search parameters, including the `state` from the IdP.
 * @returns A redirect response that either redirects the user to a success
 * or error page. Upon success, it includes headers to delete session cookies.
 */
export const load: PageServerLoad = async (event) => {
  const state = event.url.searchParams.get('state');
  const logoutStateCookie = event.cookies.get('logout_state');

  if (state && logoutStateCookie && state === logoutStateCookie) {
    event.setHeaders({
      'Clear-Site-Data': '"cookies"',
    });

    const successUrl = new URL('/auth/logout/success', event.url);
    throw redirect(302, successUrl.toString());
  } else {
    const errorUrl = new URL('/auth/logout/error', event.url);
    errorUrl.searchParams.set('reason', 'Invalid or missing state parameter.');
    throw redirect(302, errorUrl.toString());
  }
};
