const MP3_MIME_TYPES = new Set([
  'audio/mpeg',
  'audio/mp3',
  'audio/mpeg3',
  'audio/x-mpeg',
  'audio/x-mpeg-3',
])

export const INTERVIEW_FILE_ACCEPT = 'video/*,audio/mpeg,audio/mp3,.mp3'

export function getFileExtension(fileName: string): string {
  const fileNameParts = fileName.split('.')
  if (fileNameParts.length < 2) return ''
  return fileNameParts.at(-1)?.toLowerCase() ?? ''
}

export function getInterviewFileExtension(file: File): string {
  const extension = getFileExtension(file.name)
  if (extension) return extension
  return MP3_MIME_TYPES.has(file.type) ? 'mp3' : 'mp4'
}

export function getStorageFileName(storagePath: string): string {
  return storagePath.split('/').pop() || `interview.${getFileExtension(storagePath) || 'mp4'}`
}

export function isMp3File(file: File): boolean {
  const extension = getFileExtension(file.name)
  return extension === 'mp3' || MP3_MIME_TYPES.has(file.type)
}

export function isSupportedInterviewFile(file: File): boolean {
  return file.type.startsWith('video/') || isMp3File(file)
}

export function isAudioStoragePath(storagePath: string | null | undefined): boolean {
  return getFileExtension(storagePath ?? '') === 'mp3'
}
