export type AuthUser = {
  id: string
  email: string
  displayName: string
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
  organizationIds: string[]
}

export type GoogleProfile = {
  provider: 'google'
  providerAccountId: string
  email: string
  emailVerified: boolean
  displayName: string
  avatarUrl: string | null
}

export type SessionPayload = {
  userId: string
}

export type AuthenticatedSession = {
  isAuthenticated: true
  user: AuthUser
}

export type AnonymousSession = {
  isAuthenticated: false
  user: null
}

export type SessionState = AuthenticatedSession | AnonymousSession
