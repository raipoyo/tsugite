'use client'

import { useActionState } from 'react'

import Button from '@/components/ui/button'

import {
  type SuccessorProfileState,
  saveSuccessorProfile,
} from '@/features/register/successor-actions'

type SuccessorProfileFormProps = {
  defaultDisplayName?: string
  defaultInterests?: string
  defaultBio?: string
}

function errorMessage(code: SuccessorProfileState['error']): string | null {
  switch (code) {
    case 'required':
      return '表示名は必須です。'
    case 'too_long':
      return '入力が長すぎます。'
    case 'role_mismatch':
      return '継ぎ手としてログインされていません。'
    default:
      return null
  }
}

export default function SuccessorProfileForm({
  defaultDisplayName = '',
  defaultInterests = '',
  defaultBio = '',
}: SuccessorProfileFormProps) {
  const [state, formAction] = useActionState(saveSuccessorProfile, {})

  const msg = errorMessage(state.error)

  return (
    <form
      action={formAction}
      className="mx-auto flex max-w-xl flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950"
    >
      {msg ? (
        <p className="text-sm text-red-600" role="alert">
          {msg}
        </p>
      ) : null}
      <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800 dark:text-zinc-100">
        表示名
        <input
          name="displayName"
          required
          defaultValue={defaultDisplayName}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 font-normal outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="名前または活動名"
          autoComplete="nickname"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800 dark:text-zinc-100">
        興味のあるジャンル
        <input
          name="interests"
          defaultValue={defaultInterests}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 font-normal outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="例: 木工、織・染、鍛錬など"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800 dark:text-zinc-100">
        自己紹介
        <textarea
          name="bio"
          defaultValue={defaultBio}
          rows={6}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 font-normal outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="学びたいこと、現在の経験など"
        />
      </label>
      <Button type="submit">保存してダッシュボードへ</Button>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        プロフィールは Clerk のユーザー publicMetadata に保存されます（開発用）。
      </p>
    </form>
  )
}
