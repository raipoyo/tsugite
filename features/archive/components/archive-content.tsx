'use client'

import { useState } from 'react'

import AppShell from '@/components/ui/app-shell'
import Tabs from '@/components/ui/tabs'

import VideoUploadForm from '@/features/archive/components/video-upload-form'
import InterviewsList from '@/features/archive/components/interviews-list'
import TacitTagsList from '@/features/archive/components/tacit-tags-list'
import type { Interview, TacitTag } from '@/features/archive/types'

type ArchiveContentProps = {
  interviews: Interview[]
  tags: TacitTag[]
}

export default function ArchiveContent({ interviews, tags }: ArchiveContentProps) {
  const [activeTab, setActiveTab] = useState('upload')

  const handleProcess = async (interviewId: string) => {
    // Call transcription API
    const transcribeRes = await fetch(`/api/archive/transcribe/${interviewId}`, {
      method: 'POST',
    })
    if (!transcribeRes.ok) {
      alert('文字起こしに失敗しました')
      return
    }

    // Call extraction API
    const extractRes = await fetch(`/api/archive/extract/${interviewId}`, {
      method: 'POST',
    })
    if (!extractRes.ok) {
      alert('暗黙知抽出に失敗しました')
      return
    }

    const extractData = await extractRes.json()

    // Generate embeddings for each tag
    if (extractData.tags) {
      for (const tag of extractData.tags) {
        await fetch(`/api/archive/embed/${tag.id}`, {
          method: 'POST',
        })
      }
    }

    window.location.reload()
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Archive - 暗黙知の蓄積
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            インタビュー動画・音声から、言語化されていない判断基準を抽出し、構造化して蓄積します。
          </p>
        </div>

        <Tabs
          activeValue={activeTab}
          className="w-full"
          items={[
            {
              content: (
                <div className="max-w-2xl">
                  <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    新しいインタビュー動画・音声をアップロード
                  </h2>
                  <VideoUploadForm onSuccess={() => window.location.reload()} />
                </div>
              ),
              label: 'アップロード',
              value: 'upload',
            },
            {
              content: (
                <>
                  <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    インタビュー一覧 ({interviews.length}件)
                  </h2>
                  <InterviewsList interviews={interviews} onProcess={handleProcess} />
                </>
              ),
              label: 'インタビュー一覧',
              value: 'interviews',
            },
            {
              content: (
                <>
                  <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    暗黙知タグ ({tags.length}件)
                  </h2>
                  <TacitTagsList tags={tags} />
                </>
              ),
              label: '暗黙知タグ',
              value: 'tags',
            },
          ]}
          onValueChange={setActiveTab}
        />
      </div>
    </AppShell>
  )
}
