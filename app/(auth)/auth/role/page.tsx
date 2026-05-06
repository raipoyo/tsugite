import { redirect } from 'next/navigation'

// ロール選択の実装は /onboarding/role に集約
export default function AuthRolePage() {
  redirect('/onboarding/role')
}
