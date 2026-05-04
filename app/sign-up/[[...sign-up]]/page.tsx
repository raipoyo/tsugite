import Link from 'next/link'

import { SignUp } from '@clerk/nextjs'

import Container from '@/components/ui/container'

export default function SignUpPage() {
  return (
    <main className="flex flex-1 flex-col bg-zinc-50 py-12 dark:bg-black">
      <Container className="flex flex-col items-center gap-8">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← TSUGITE トップへ
        </Link>
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          appearance={{
            elements: {
              rootBox: 'w-full max-w-md',
            },
          }}
        />
      </Container>
    </main>
  )
}
