import Link from 'next/link'
import Image from 'next/image'

export type DocItem = {
  slug: string
  title: string
  category: string
  description: string
  prev: { label: string; slug: string } | null
  next: { label: string; slug: string } | null
  content: Array<
    | { type: 'callout'; variant: 'info' | 'warning' | 'tip'; title: string; text: string }
    | { type: 'section'; title: string; body: string }
    | { type: 'steps'; title: string; items: string[] }
    | { type: 'image'; src: string; alt: string }
    | { type: 'discord-banner'; url: string; label: string }
  >
}

export default function DocView({ doc }: { doc: DocItem }) {
  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-fg-dim">
        <span>Docs</span>
        <span>/</span>
        <span className="text-accent">{doc.category}</span>
        <span>/</span>
        <span className="text-fg">{doc.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8 border-b border-line pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-base text-fg-muted leading-relaxed">
          {doc.description}
        </p>
      </div>

      {/* Content Blocks */}
      <div className="flex flex-col gap-6 text-sm leading-relaxed text-fg-muted">
        {doc.content.map((block, idx) => {
          if (block.type === 'callout') {
            const isWarn = block.variant === 'warning'
            const isTip = block.variant === 'tip'
            const borderCol = isWarn ? 'border-amber-500/40' : isTip ? 'border-emerald-500/40' : 'border-accent/40'
            const bgCol = isWarn ? 'bg-amber-500/10' : isTip ? 'bg-emerald-500/10' : 'bg-accent/10'
            const titleCol = isWarn ? 'text-amber-400' : isTip ? 'text-emerald-400' : 'text-accent'

            return (
              <div key={idx} className={`rounded-xl border ${borderCol} ${bgCol} p-4.5`}>
                <div className={`flex items-center gap-2 font-bold ${titleCol} mb-1.5`}>
                  <span className="text-xs uppercase tracking-wider">{block.title}</span>
                </div>
                <p className="text-fg text-xs leading-relaxed">{block.text}</p>
              </div>
            )
          }

          if (block.type === 'section') {
            return (
              <div key={idx} className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-fg tracking-tight">{block.title}</h2>
                <p className="text-sm leading-relaxed text-fg-muted">{block.body}</p>
              </div>
            )
          }

          if (block.type === 'steps') {
            return (
              <div key={idx} className="flex flex-col gap-3 rounded-2xl border border-line bg-surface-1 p-5">
                <h3 className="text-base font-bold text-fg">{block.title}</h3>
                <ol className="flex flex-col gap-3">
                  {block.items.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent font-bold text-2xs mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span className="text-xs text-fg leading-relaxed flex-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )
          }

          if (block.type === 'image') {
            return (
              <div key={idx} className="overflow-hidden rounded-xl border border-line bg-surface-2 p-2 shadow-lg">
                <img
                  src={block.src}
                  alt={block.alt}
                  className="w-full rounded-lg object-contain max-h-[460px]"
                />
                <p className="mt-2 text-center text-2xs text-fg-dim font-medium">{block.alt}</p>
              </div>
            )
          }

          if (block.type === 'discord-banner') {
            return (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 rounded-xl border border-accent/30 bg-gradient-to-r from-accent/15 to-surface-1 p-5 shadow-lg"
              >
                <div>
                  <h4 className="text-sm font-bold text-fg">Need immediate setup help?</h4>
                  <p className="text-xs text-fg-muted">Our dedicated support staff is available 24/7 on Discord.</p>
                </div>
                <a
                  href={block.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-bright transition-colors shadow-[0_0_12px_rgba(45,156,245,0.3)]"
                >
                  {block.label} →
                </a>
              </div>
            )
          }

          return null
        })}
      </div>

      {/* Prev / Next Pagination */}
      <div className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-6">
        {doc.prev ? (
          <Link
            href={`/${doc.prev.slug}`}
            className="flex flex-col items-start gap-1 rounded-xl border border-line bg-surface-1 px-4 py-3 text-xs transition-colors hover:border-accent/40"
          >
            <span className="text-2xs text-fg-dim">← Previous</span>
            <span className="font-semibold text-fg">{doc.prev.label}</span>
          </Link>
        ) : (
          <div />
        )}

        {doc.next && (
          <Link
            href={`/${doc.next.slug}`}
            className="flex flex-col items-end gap-1 rounded-xl border border-line bg-surface-1 px-4 py-3 text-xs transition-colors hover:border-accent/40 ml-auto"
          >
            <span className="text-2xs text-fg-dim">Next →</span>
            <span className="font-semibold text-fg">{doc.next.label}</span>
          </Link>
        )}
      </div>
    </article>
  )
}
