'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { getInterviewFileExtension, isSupportedInterviewFile } from '@/features/archive/utils/media'

export type UploadVideoState = {
  error?: string
  interviewId?: string
}

export async function uploadVideo(
  prev: UploadVideoState,
  formData: FormData,
): Promise<UploadVideoState> {
  void prev
  const supabase = await createClient()

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get shop ID for this user
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile || profile.role !== 'shop') {
    return { error: 'role_mismatch' }
  }

  const { data: shop } = await supabase
    .from('shops')
    .select('id')
    .eq('owner_profile_id', user.id)
    .maybeSingle()

  if (!shop) {
    return { error: 'no_shop' }
  }

  const fileEntry = formData.get('video')
  if (!(fileEntry instanceof File) || fileEntry.size === 0) {
    return { error: 'no_file' }
  }
  const file = fileEntry

  // Validate file type
  if (!isSupportedInterviewFile(file)) {
    return { error: 'invalid_type' }
  }

  // Validate file size (max 100MB)
  const MAX_SIZE = 100 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    return { error: 'file_too_large' }
  }

  // Create interview record first
  const { data: interview, error: insertError } = await supabase
    .from('interviews')
    .insert({
      shop_id: shop.id,
      storage_path: '', // Will be updated after upload
    })
    .select()
    .single()

  if (insertError || !interview) {
    return { error: 'db_error' }
  }

  // Upload to Supabase Storage
  const fileExt = getInterviewFileExtension(file)
  const filePath = `${shop.id}/${interview.id}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('interview-videos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    // Clean up interview record if upload failed
    await supabase.from('interviews').delete().eq('id', interview.id)
    return { error: 'upload_error' }
  }

  // Update interview with storage path
  const { error: updateError } = await supabase
    .from('interviews')
    .update({ storage_path: filePath })
    .eq('id', interview.id)

  if (updateError) {
    return { error: 'db_error' }
  }

  return { interviewId: interview.id }
}
