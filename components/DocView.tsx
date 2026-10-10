'use client'

import { useState } from 'react'
import Link from 'next/link'

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

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const AUTOUNATTEND_DOWNLOAD_HREF = '/autounattend.xml'

export default function DocView({ doc }: { doc: DocItem }) {
  // Track completed steps per steps-block
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({})
  const [activeModalImage, setActiveModalImage] = useState<{ src: string; alt: string } | null>(null)

  const toggleStep = (stepKey: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }))
  }

  // Extract table of contents items from sections and steps
  const tocItems = doc.content
    .filter((b) => b.type === 'section' || b.type === 'steps')
    .map((b) => ({
      id: slugify(b.title),
      title: b.title,
      isStep: b.type === 'steps',
    }))

  return (
    <>
      {/* Lightbox Modal for screenshots */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8 animate-fade-in-slide cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-surface-1 p-2 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="text-xs font-semibold text-fg-muted">{activeModalImage.alt}</span>
              <button
                onClick={() => setActiveModalImage(null)}
                className="rounded-lg p-1 text-fg-dim hover:bg-surface-2 hover:text-fg transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-2 overflow-auto max-h-[82vh]">
              <img
                src={activeModalImage.src}
                alt={activeModalImage.alt}
                className="w-full rounded-xl object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col xl:flex-row gap-10 xl:gap-14 animate-fade-in-slide">
        {/* Main Article Container */}
        <article className="min-w-0 flex-1 max-w-3xl lg:max-w-4xl">
          {/* Breadcrumb & Metadata Pill */}
          <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-medium text-fg-dim">
            <Link href="/" className="hover:text-accent transition-colors">
              Docs
            </Link>
            <span>/</span>
            <span className="rounded-md bg-accent-soft px-2.5 py-0.5 text-accent font-semibold border border-accent/20">
              {doc.category}
            </span>
            <span>/</span>
            <span className="text-fg font-semibold">{doc.title}</span>
            <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-2xs text-fg-dim bg-surface-1 border border-line px-2.5 py-1 rounded-full">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              ~3-5 min read
            </span>
          </div>

          {/* Header Title & Subtitle */}
          <div className="mb-10 border-b border-line pb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-white leading-[1.15]">
              {doc.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              {doc.description}
            </p>
          </div>

          {/* Content Blocks */}
          <div className="flex flex-col gap-8">
            {doc.content.map((block, idx) => {
              // --- Callout Banner ---
              if (block.type === 'callout') {
                const isWarn = block.variant === 'warning'
                const isTip = block.variant === 'tip'
                const borderClass = isWarn
                  ? 'border-amber-500/35 bg-gradient-to-r from-amber-500/12 via-amber-500/5 to-surface-1'
                  : isTip
                  ? 'border-emerald-500/35 bg-gradient-to-r from-emerald-500/12 via-emerald-500/5 to-surface-1'
                  : 'border-accent/35 bg-gradient-to-r from-accent/12 via-accent/5 to-surface-1'
                const badgeClass = isWarn
                  ? 'text-amber-300 bg-amber-500/15 border-amber-500/30'
                  : isTip
                  ? 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30'
                  : 'text-accent-bright bg-accent-soft border-accent/30'
                const iconSvg = isWarn ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400 shrink-0">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                ) : isTip ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400 shrink-0">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                )

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border ${borderClass} p-5 sm:p-6 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-opacity-60`}
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      {iconSvg}
                      <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${badgeClass}`}>
                        {block.title}
                      </span>
                    </div>
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed pl-7">
                      {block.text}
                    </p>
                  </div>
                )
              }

              // --- Content Section ---
              if (block.type === 'section') {
                const sectionId = slugify(block.title)
                return (
                  <section key={idx} id={sectionId} className="scroll-mt-24 flex flex-col gap-3 group">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-accent/80 group-hover:bg-accent transition-colors" />
                      <span>{block.title}</span>
                      <a
                        href={`#${sectionId}`}
                        className="opacity-0 group-hover:opacity-100 text-accent transition-opacity text-base font-normal ml-1"
                        aria-label="Link to section"
                      >
                        #
                      </a>
                    </h2>
                    <p className="text-base sm:text-[17px] leading-relaxed text-slate-300 font-normal pl-4 border-l-2 border-line group-hover:border-accent/40 transition-colors">
                      {block.body}
                    </p>
                  </section>
                )
              }

              // --- Interactive Stepper Block ---
              if (block.type === 'steps') {
                const stepsId = slugify(block.title)
                const totalSteps = block.items.length
                const completedCount = block.items.filter((_, sIdx) => completedSteps[`${idx}-${sIdx}`]).length
                const progressPct = Math.round((completedCount / totalSteps) * 100)

                return (
                  <section
                    key={idx}
                    id={stepsId}
                    className="scroll-mt-24 rounded-3xl border border-line bg-surface-1/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:border-accent/30"
                  >
                    {/* Stepper Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent border border-accent/20">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 11 12 14 22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                            {block.title}
                          </h3>
                          <p className="text-xs text-fg-dim font-medium">
                            {totalSteps} Clear Steps • Click checkmark as you complete
                          </p>
                        </div>
                      </div>

                      {/* Progress Counter */}
                      <div className="flex items-center gap-3 bg-surface-2 px-3.5 py-1.5 rounded-full border border-line">
                        <div className="h-2 w-20 bg-surface-3 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all duration-300"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-fg-muted">
                          {completedCount}/{totalSteps} Done
                        </span>
                      </div>
                    </div>

                    {/* Step Cards / Timeline */}
                    <div className="flex flex-col gap-4 sm:gap-5">
                      {block.items.map((stepText, sIdx) => {
                        const stepKey = `${idx}-${sIdx}`
                        const isDone = !!completedSteps[stepKey]

                        return (
                          <div
                            key={sIdx}
                            onClick={() => toggleStep(stepKey)}
                            className={`group relative flex items-start gap-4 sm:gap-5 rounded-2xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer select-none ${
                              isDone
                                ? 'border-emerald-500/40 bg-emerald-500/[0.04]'
                                : 'border-line bg-surface-2/60 hover:bg-surface-2 hover:border-line-strong hover:shadow-md'
                            }`}
                          >
                            {/* Numbered Pill / Checkmark */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleStep(stepKey)
                              }}
                              className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl font-black text-sm sm:text-base transition-all duration-200 ${
                                isDone
                                  ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                                  : 'bg-surface-3 border border-line text-accent group-hover:border-accent group-hover:bg-accent-soft'
                              }`}
                              title={isDone ? 'Mark as incomplete' : 'Mark as done'}
                            >
                              {isDone ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              ) : (
                                <span>{sIdx + 1}</span>
                              )}
                            </button>

                            {/* Step Description */}
                            <div className="flex-1 min-w-0 pt-0.5">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-2xs font-extrabold uppercase tracking-wider ${
                                  isDone ? 'text-emerald-400' : 'text-fg-dim group-hover:text-accent transition-colors'
                                }`}>
                                  Step {sIdx + 1}
                                </span>
                                {isDone && (
                                  <span className="text-2xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.2 rounded">
                                    Completed
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm sm:text-base leading-relaxed transition-colors ${
                                isDone ? 'text-slate-400 line-through' : 'text-slate-100 font-medium'
                              }`}>
                                {stepText}
                              </p>
                              {stepText.includes('autounattend.xml') && (
                                <a
                                  href={AUTOUNATTEND_DOWNLOAD_HREF}
                                  download="autounattend.xml"
                                  onClick={(e) => e.stopPropagation()}
                                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-accent px-3.5 py-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(45,156,245,0.35)] hover:bg-accent-bright hover:shadow-[0_0_22px_rgba(45,156,245,0.55)] transition-all duration-200"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                  </svg>
                                  Download autounattend.xml
                                </a>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                )
              }

              // --- High-Resolution Image Presentation ---
              if (block.type === 'image') {
                return (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-2xl border border-line bg-surface-1 shadow-2xl transition-all duration-300 hover:border-accent/40"
                  >
                    {/* Window Title Bar */}
                    <div className="flex items-center justify-between border-b border-line bg-surface-2/90 px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                      </div>
                      <span className="text-2xs font-semibold text-fg-dim tracking-wide truncate max-w-xs sm:max-w-md">
                        {block.alt}
                      </span>
                      <button
                        onClick={() => setActiveModalImage({ src: block.src, alt: block.alt })}
                        className="flex items-center gap-1 text-2xs font-bold text-accent hover:text-accent-bright transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                        Zoom
                      </button>
                    </div>

                    {/* Image */}
                    <div
                      onClick={() => setActiveModalImage({ src: block.src, alt: block.alt })}
                      className="cursor-zoom-in p-3 sm:p-4 bg-surface-1/50 flex justify-center items-center"
                    >
                      <img
                        src={block.src}
                        alt={block.alt}
                        className="rounded-xl object-contain max-h-[500px] w-auto transition-transform duration-300 group-hover:scale-[1.01]"
                        loading="lazy"
                      />
                    </div>

                    {/* Caption Bar */}
                    <div className="border-t border-line/50 bg-surface-2/40 px-4 py-2 text-center text-xs text-fg-dim font-medium">
                      {block.alt}
                    </div>
                  </div>
                )
              }

              // --- Discord Community Banner ---
              if (block.type === 'discord-banner') {
                return (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/20 via-surface-1 to-surface-2 p-6 sm:p-8 shadow-2xl"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/30 px-3 py-1 text-2xs font-extrabold uppercase tracking-wider text-accent-bright">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Live Staff Assistance 24/7
                        </div>
                        <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          Need Immediate Setup Help?
                        </h4>
                        <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
                          Our dedicated technicians and community members are online right now to guide you step-by-step through BIOS, RAID, or spoofing.
                        </p>
                      </div>

                      <a
                        href={block.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(45,156,245,0.4)] hover:bg-accent-bright hover:shadow-[0_0_35px_rgba(45,156,245,0.6)] transition-all duration-200"
                      >
                        <svg width="18" height="18" viewBox="0 0 640 512" fill="currentColor">
                          <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                        </svg>
                        {block.label} →
                      </a>
                    </div>
                  </div>
                )
              }

              return null
            })}
          </div>

          {/* Prev / Next Pagination */}
          <div className="mt-14 border-t border-line pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {doc.prev ? (
                <Link
                  href={`/${doc.prev.slug}`}
                  className="group flex flex-col gap-1.5 rounded-2xl border border-line bg-surface-1 p-5 transition-all duration-200 hover:border-accent/40 hover:bg-surface-2 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-fg-dim group-hover:text-accent transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Previous Chapter
                  </div>
                  <span className="text-base font-bold text-white group-hover:text-accent-bright transition-colors">
                    {doc.prev.label}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {doc.next ? (
                <Link
                  href={`/${doc.next.slug}`}
                  className="group flex flex-col items-end text-right gap-1.5 rounded-2xl border border-line bg-surface-1 p-5 transition-all duration-200 hover:border-accent/40 hover:bg-surface-2 hover:-translate-y-0.5 ml-auto w-full"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-fg-dim group-hover:text-accent transition-colors">
                    Next Chapter
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                  <span className="text-base font-bold text-white group-hover:text-accent-bright transition-colors">
                    {doc.next.label}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </article>

        {/* Right Sticky Column: "On This Page" Table of Contents + Quick Support */}
        <aside className="hidden xl:block w-72 shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Table of Contents */}
            {tocItems.length > 0 && (
              <div className="rounded-2xl border border-line bg-surface-1/80 backdrop-blur-md p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-line text-xs font-extrabold uppercase tracking-wider text-fg-dim">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  On This Page
                </div>
                <nav className="flex flex-col gap-1.5">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="group flex items-start gap-2 py-1 text-xs font-medium text-fg-muted hover:text-white transition-colors"
                    >
                      <span className="text-fg-dim group-hover:text-accent font-mono text-2xs mt-0.5">•</span>
                      <span className="line-clamp-2 leading-snug">{item.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Quick Discord Card */}
            <div className="rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/10 to-surface-1 p-5 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                24/7 Setup Assistance
              </div>
              <p className="text-xs text-fg-muted leading-relaxed mb-4">
                Encountering an issue or have a question about your motherboard?
              </p>
              <a
                href="https://discord.gg/XFEkf2kV26"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-accent-bright transition-colors"
              >
                Join Support Discord →
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
