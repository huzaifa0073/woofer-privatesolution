import DocsLayout from '@/components/DocsLayout'
import DocView, { DocItem } from '@/components/DocView'
import { DOCS } from '@/lib/docs-data'

export default function HomePage() {
  const welcomeDoc = DOCS.find((d) => d.slug === 'welcome') || DOCS[0]

  return (
    <DocsLayout>
      <DocView doc={welcomeDoc as DocItem} />
    </DocsLayout>
  )
}
