import { notFound } from 'next/navigation'
import DocsLayout from '@/components/DocsLayout'
import DocView, { DocItem } from '@/components/DocView'
import { DOCS } from '@/lib/docs-data'

export function generateStaticParams() {
  return DOCS.map((doc) => ({
    slug: doc.slug,
  }))
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = DOCS.find((d) => d.slug === slug)

  if (!doc) {
    notFound()
  }

  return (
    <DocsLayout>
      <DocView doc={doc as DocItem} />
    </DocsLayout>
  )
}
