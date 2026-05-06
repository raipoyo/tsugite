'use server'

import { redirect } from 'next/navigation'

import type { UserRole } from '@/lib/roles'
import { createClient } from '@/lib/supabase/server'

export async function setUserRole(role: UserRole): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase.from('profiles').update({ role }).eq('id', user.id)

  if (error) {
    redirect('/onboarding/role?error=failed')
  }

  redirect(role === 'shop' ? '/onboarding/shop' : '/onboarding/successor')
}
