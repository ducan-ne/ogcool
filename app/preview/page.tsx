import { Metadata } from 'next'
import ogcool from '@/app/sdk'
import assert from 'node:assert'

type Props = {
  searchParams: {
    name: string
    d: string
  }
}

export const revalidate = 0

export async function generateMetadata(
  { searchParams }: Props,
): Promise<Metadata> {
  const { d, name } = searchParams
  const { modifications = [], format = 'png' } = d
    ? (JSON.parse(atob(d)) as {
      modifications?: any[]
      format?: 'svg' | 'png'
    })
    : {}
  assert(Array.isArray(modifications) || typeof modifications === 'undefined')
  return {
    openGraph: {
      title: 'My website',
      description: 'ogcool preview og image',
      images: [ogcool(name as any, { modifications })],
    },
  }
}

export default function Page() {
  return null
}