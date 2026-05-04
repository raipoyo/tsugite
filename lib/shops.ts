import type { SupabaseClient } from '@supabase/supabase-js'

import type { ShopProfileMeta } from '@/types/profile'

type ShopRow = {
  id: string
}

export async function ensureShopForProfile(
  supabase: SupabaseClient,
  ownerProfileId: string,
  shopProfile: ShopProfileMeta | null | undefined,
): Promise<ShopRow | null> {
  const { data: existingShop, error: readError } = await supabase
    .from('shops')
    .select('id')
    .eq('owner_profile_id', ownerProfileId)
    .maybeSingle()

  if (readError) return null
  if (existingShop) return existingShop as ShopRow

  const { data: createdShop, error: createError } = await supabase
    .from('shops')
    .insert({
      owner_profile_id: ownerProfileId,
      name: shopProfile?.displayName ?? '',
      profile: shopProfile ?? {},
    })
    .select('id')
    .single()

  if (createError || !createdShop) return null
  return createdShop as ShopRow
}
