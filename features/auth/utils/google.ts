import { createRemoteJWKSet, jwtVerify } from 'jose'

import type { AuthConfig } from './config'
import type { GoogleProfile } from '../types/auth'

const googleIssuer = 'https://accounts.google.com'
const googleJwks = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'))

type GoogleTokenResponse = {
  access_token: string
  expires_in: number
  id_token: string
  scope: string
  token_type: string
}

export function createGoogleAuthorizationUrl(config: AuthConfig, state: string): string {
  const authorizationUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')

  authorizationUrl.searchParams.set('client_id', config.googleClientId)
  authorizationUrl.searchParams.set('redirect_uri', config.googleRedirectUri)
  authorizationUrl.searchParams.set('response_type', 'code')
  authorizationUrl.searchParams.set('scope', 'openid email profile')
  authorizationUrl.searchParams.set('state', state)
  authorizationUrl.searchParams.set('prompt', 'select_account')

  return authorizationUrl.toString()
}

export async function exchangeGoogleCode(
  config: AuthConfig,
  code: string,
): Promise<GoogleTokenResponse> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: config.googleClientId,
      client_secret: config.googleClientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: config.googleRedirectUri,
    }),
  })

  if (!response.ok) {
    throw new Error('Google token exchange failed')
  }

  return response.json() as Promise<GoogleTokenResponse>
}

export async function verifyGoogleIdToken(
  config: AuthConfig,
  idToken: string,
): Promise<GoogleProfile> {
  const { payload } = await jwtVerify(idToken, googleJwks, {
    audience: config.googleClientId,
    issuer: googleIssuer,
  })

  if (typeof payload.sub !== 'string' || typeof payload.email !== 'string') {
    throw new Error('Google id token is missing required user fields')
  }

  return {
    provider: 'google',
    providerAccountId: payload.sub,
    email: payload.email,
    emailVerified: payload.email_verified === true,
    displayName: typeof payload.name === 'string' ? payload.name : payload.email,
    avatarUrl: typeof payload.picture === 'string' ? payload.picture : null,
  }
}
