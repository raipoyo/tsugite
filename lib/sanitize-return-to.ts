/**
 * Limits open redirects: same-origin relative paths only (starts with `/`, not `//`).
 */
export function sanitizeReturnTo(value: string | null): string {
  if (!value) {
    return '/'
  }

  if (!value.startsWith('/') || value.startsWith('//')) {
    return '/'
  }

  return value
}
