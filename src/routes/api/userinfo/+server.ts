import { ZITADEL_DOMAIN } from '$env/static/private';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// noinspection JSUnusedGlobalSymbols
/**
 * ZITADEL UserInfo API Route
 *
 * Fetches extended user information from ZITADEL's UserInfo endpoint.
 * This provides real-time user data including roles, custom attributes,
 * and organization membership that may not be in the cached session.
 *
 * ## Usage
 *
 * ```typescript
 * const response = await fetch('/api/userinfo');
 * const userInfo = await response.json();
 * ```
 *
 * ## Returns
 *
 * Extended user profile with ZITADEL-specific claims like roles and metadata.
 */
export const GET: RequestHandler = async (event) => {
  const session = await event.locals.auth();

  if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  try {
    const response = await fetch(`${ZITADEL_DOMAIN}/oidc/v1/userinfo`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(`UserInfo API error: ${response.status}`);
    }

    const userInfo = await response.json();
    return json(userInfo);
  } catch (error) {
    console.error('UserInfo fetch failed:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch user info' }),
      { status: 500 },
    );
  }
};
