const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7
const OAUTH_STATE_MAX_AGE_SECONDS = 60 * 10

export const authCookieNames = {
  session: 'tsugite_session',
  oauthState: 'tsugite_oauth_state',
  oauthReturnTo: 'tsugite_oauth_return_to',
} as const

export const authDurations = {
  sessionMaxAgeSeconds: SESSION_MAX_AGE_SECONDS,
  oauthStateMaxAgeSeconds: OAUTH_STATE_MAX_AGE_SECONDS,
} as const

export type AuthConfig = {
  googleClientId: string
  googleClientSecret: string
  sessionSecret: string
  appOrigin: string
  googleRedirectUri: string
  isProduction: boolean
}

export function getAuthConfig(requestUrl: string): AuthConfig {
  const url = new URL(requestUrl)
  const appOrigin = process.env.APP_ORIGIN ?? url.origin
  const googleRedirectUri =
    process.env.GOOGLE_REDIRECT_URI ?? `${appOrigin}/api/auth/google/callback`

  return {
    googleClientId: requireEnv('GOOGLE_CLIENT_ID'),
    googleClientSecret: requireEnv('GOOGLE_CLIENT_SECRET'),
    sessionSecret: requireEnv('AUTH_SESSION_SECRET'),
    appOrigin,
    googleRedirectUri,
    isProduction: process.env.NODE_ENV === 'production',
  }
}

export function getSessionSecret(): string {
  return requireEnv('AUTH_SESSION_SECRET')
}

function requireEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is required`)
  }

  return value
}

export function sanitizeReturnTo(value: string | null): string {
  if (!value) {
    return '/'
  }

  if (!value.startsWith('/') || value.startsWith('//')) {
    return '/'
  }

  return value
}
