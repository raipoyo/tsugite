import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'

import { authCookieNames, authDurations, getAuthConfig, sanitizeReturnTo } from './utils/config'
import {
  createGoogleAuthorizationUrl,
  exchangeGoogleCode,
  verifyGoogleIdToken,
} from './utils/google'
import { clearSessionCookie, getSessionState, requireAuth, setSessionCookie } from './utils/hono'
import { upsertGoogleUser } from './utils/users'

export const authRoute = new Hono()

authRoute.get('/google', (c) => {
  try {
    const config = getAuthConfig(c.req.url)
    const state = crypto.randomUUID()
    const returnTo = sanitizeReturnTo(c.req.query('returnTo') ?? null)

    setCookie(c, authCookieNames.oauthState, state, {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: 'Lax',
      maxAge: authDurations.oauthStateMaxAgeSeconds,
      path: '/api/auth/google',
    })
    setCookie(c, authCookieNames.oauthReturnTo, returnTo, {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: 'Lax',
      maxAge: authDurations.oauthStateMaxAgeSeconds,
      path: '/api/auth/google',
    })

    return c.redirect(createGoogleAuthorizationUrl(config, state))
  } catch {
    return c.json(
      {
        error: {
          code: 'AUTH_NOT_CONFIGURED',
          message: 'Google認証のサーバー設定が不足しています。',
        },
      },
      500,
    )
  }
})

authRoute.get('/google/callback', async (c) => {
  const code = c.req.query('code')
  const state = c.req.query('state')
  const expectedState = getCookie(c, authCookieNames.oauthState)
  const returnTo = sanitizeReturnTo(getCookie(c, authCookieNames.oauthReturnTo) ?? null)

  deleteCookie(c, authCookieNames.oauthState, { path: '/api/auth/google' })
  deleteCookie(c, authCookieNames.oauthReturnTo, { path: '/api/auth/google' })

  if (!code || !state || state !== expectedState) {
    return c.redirect('/login?error=auth_state')
  }

  try {
    const config = getAuthConfig(c.req.url)
    const token = await exchangeGoogleCode(config, code)
    const profile = await verifyGoogleIdToken(config, token.id_token)
    const user = await upsertGoogleUser(profile)

    await setSessionCookie(c, user.id)

    return c.redirect(returnTo)
  } catch {
    clearSessionCookie(c)

    return c.redirect('/login?error=google_auth')
  }
})

authRoute.post('/logout', (c) => {
  clearSessionCookie(c)

  return c.json({ ok: true })
})

authRoute.get('/session', async (c) => {
  return c.json(await getSessionState(c))
})

authRoute.get('/me', async (c) => {
  const user = await requireAuth(c)

  if (user instanceof Response) {
    return user
  }

  return c.json({ user })
})
