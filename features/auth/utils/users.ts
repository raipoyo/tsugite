import type { AuthUser, GoogleProfile } from '../types/auth'

type UserRecord = AuthUser & {
  provider: GoogleProfile['provider']
  providerAccountId: string
}

type UserStore = {
  usersById: Map<string, UserRecord>
  usersByProviderAccountId: Map<string, UserRecord>
}

const globalForAuth = globalThis as typeof globalThis & {
  tsugiteAuthUserStore?: UserStore
}

const userStore =
  globalForAuth.tsugiteAuthUserStore ??
  ({
    usersById: new Map<string, UserRecord>(),
    usersByProviderAccountId: new Map<string, UserRecord>(),
  } satisfies UserStore)

globalForAuth.tsugiteAuthUserStore = userStore

export async function upsertGoogleUser(profile: GoogleProfile): Promise<AuthUser> {
  const existing = userStore.usersByProviderAccountId.get(profile.providerAccountId)
  const timestamp = new Date().toISOString()

  if (existing) {
    const updated: UserRecord = {
      ...existing,
      email: profile.email,
      displayName: profile.displayName,
      avatarUrl: profile.avatarUrl,
      updatedAt: timestamp,
    }

    userStore.usersById.set(updated.id, updated)
    userStore.usersByProviderAccountId.set(updated.providerAccountId, updated)

    return toAuthUser(updated)
  }

  const user: UserRecord = {
    id: crypto.randomUUID(),
    provider: profile.provider,
    providerAccountId: profile.providerAccountId,
    email: profile.email,
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl,
    createdAt: timestamp,
    updatedAt: timestamp,
    organizationIds: [],
  }

  userStore.usersById.set(user.id, user)
  userStore.usersByProviderAccountId.set(user.providerAccountId, user)

  return toAuthUser(user)
}

export async function findUserById(userId: string): Promise<AuthUser | null> {
  const user = userStore.usersById.get(userId)

  return user ? toAuthUser(user) : null
}

function toAuthUser(user: UserRecord): AuthUser {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    organizationIds: user.organizationIds,
  }
}
