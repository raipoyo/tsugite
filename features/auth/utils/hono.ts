import type { Context } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'

import { authCookieNames, authDurations, getSessionSecret } from './config'
import { createSessionToken, verifySessionToken } from './session'
import { findUserById } from './users'
import type { AuthUser, SessionState } from '../types/auth'

export async function getCurrentUser(c: Context): Promise<AuthUser | null> {
  const token = getCookie(c, authCookieNames.session)
  const session = await verifyRequestSession(token)

  if (!session) {
    return null
  }

  return findUserById(session.userId)
}

export async function getSessionState(c: Context): Promise<SessionState> {
  const user = await getCurrentUser(c)

  if (!user) {
    return {
      isAuthenticated: false,
      user: null,
    }
  }

  return {
    isAuthenticated: true,
    user,
  }
}

export async function setSessionCookie(c: Context, userId: string): Promise<void> {
  const token = await createSessionToken({ userId }, getSessionSecret())

  setCookie(c, authCookieNames.session, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: authDurations.sessionMaxAgeSeconds,
    path: '/',
  })
}

export function clearSessionCookie(c: Context): void {
  deleteCookie(c, authCookieNames.session, {
    path: '/',
  })
}

export async function requireAuth(c: Context): Promise<AuthUser | Response> {
  const user = await getCurrentUser(c)

  if (!user) {
    return c.json({ error: { code: 'UNAUTHENTICATED', message: 'ログインが必要です。' } }, 401)
  }

  return user
}

async function verifyRequestSession(token: string | undefined) {
  try {
    return await verifySessionToken(token, getSessionSecret())
  } catch {
    return null
  }
}
