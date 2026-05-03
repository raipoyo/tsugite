import { SignJWT, jwtVerify } from 'jose'

import { authDurations } from './config'
import type { SessionPayload } from '../types/auth'

const encoder = new TextEncoder()

export async function createSessionToken(payload: SessionPayload, secret: string): Promise<string> {
  const issuedAt = Math.floor(Date.now() / 1000)

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(issuedAt)
    .setExpirationTime(issuedAt + authDurations.sessionMaxAgeSeconds)
    .sign(encoder.encode(secret))
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string,
): Promise<SessionPayload | null> {
  if (!token) {
    return null
  }

  try {
    const { payload } = await jwtVerify(token, encoder.encode(secret), {
      algorithms: ['HS256'],
    })

    if (typeof payload.userId !== 'string') {
      return null
    }

    return { userId: payload.userId }
  } catch {
    return null
  }
}
