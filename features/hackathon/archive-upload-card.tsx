'use client'

import { useRouter } from 'next/navigation'

import Card from '@/components/ui/card'
import VideoUploadForm from '@/features/archive/components/video-upload-form'

export default function ArchiveUploadCard() {
  const router = useRouter()

  return (
    <Card className="p-8">
      <div className="rounded-[1.5rem] border-2 border-dashed border-washi-3 bg-surface-muted p-6">
        <VideoUploadForm onSuccess={(interviewId) => router.push(`/app/archive/${interviewId}`)} />
      </div>
    </Card>
  )
}
