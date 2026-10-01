'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { DOCS } from '@/lib/docs-data'

const CATEGORIES = [
  'Getting Started',
  'Preparation',
  'Intel Alternative',
  'Woofer Setup',
  'Hardware Solutions',
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredDocs = search.trim()
    ? DOCS.filter(
        (d) =>
          d.title.toLowerCase().includes(search.toLowerCase()) ||
          d.description.toLowerCase().includes(search.toLowerCase())
      )
    : []

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-fg">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg border border-line bg-surface-1 text-fg-muted hover:text-fg"
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/ps-logo.webp"
                alt="Private Solutions"
                width={32}
                height={32}
                className="rounded-md"
              />
              <div className="flex items-center gap-1.5 font-bold tracking-tight">
                <span className="text-fg">Private<span className="text-accent">Solutions</span></span>
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-2xs font-semibold text-accent border border-accent/20">
                  Woofer Docs
                </span>
              </div>
            </Link>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
            <a
              href="https://privatesolution.org/#products"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 rounded-full border border-line bg-surface-1 px-3 py-1.5 text-fg-muted hover:text-fg hover:border-line-strong transition-colors"
            >
              Store ↗
            </a>
            <a
              href="https://forum.privatesolution.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 rounded-full border border-line bg-surface-1 px-3 py-1.5 text-fg-muted hover:text-fg hover:border-line-strong transition-colors"
            >
              Forum ↗
            </a>
            <a
              href="https://discord.gg/XFEkf2kV26"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-white hover:bg-accent-bright transition-colors shadow-[0_0_12px_rgba(45,156,245,0.25)]"
            >
              <svg width="14" height="14" viewBox="0 0 640 512" fill="currentColor">
                <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
              </svg>
              Discord
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-line bg-canvas p-6 pt-20 transition-transform lg:static lg:block lg:w-64 lg:p-4 lg:pt-6 lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Search */}
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-line bg-surface-1 px-3 py-2 text-xs text-fg placeholder:text-fg-dim focus:border-accent focus:outline-none"
            />
            {search.trim() && (
              <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded-lg border border-line bg-surface-1 shadow-xl p-2 max-h-60 overflow-y-auto">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/${d.slug}`}
                      onClick={() => {
                        setSearch('')
                        setMobileOpen(false)
                      }}
                      className="block p-2 rounded text-xs hover:bg-surface-2"
                    >
                      <div className="font-semibold text-fg">{d.title}</div>
                      <div className="text-fg-dim truncate text-2xs">{d.description}</div>
                    </Link>
                  ))
                ) : (
                  <p className="text-2xs text-fg-dim p-2">No matching guides found</p>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
            {CATEGORIES.map((cat) => {
              const catDocs = DOCS.filter((d) => d.category === cat)
              if (catDocs.length === 0) return null
              return (
                <div key={cat} className="flex flex-col gap-1.5">
                  <h3 className="text-2xs font-bold uppercase tracking-wider text-fg-dim px-2">
                    {cat}
                  </h3>
                  <div className="flex flex-col gap-0.5">
                    {catDocs.map((doc) => {
                      const isActive =
                        pathname === `/${doc.slug}` ||
                        (pathname === '/' && doc.slug === 'welcome')
                      return (
                        <Link
                          key={doc.slug}
                          href={`/${doc.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                            isActive
                              ? 'bg-accent/15 text-accent font-semibold border-l-2 border-accent'
                              : 'text-fg-muted hover:bg-surface-1 hover:text-fg'
                          }`}
                        >
                          {doc.title}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </nav>
        </aside>

        {/* Backdrop for mobile */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          />
        )}

        {/* Page Content */}
        <main className="min-w-0 flex-1 py-8 lg:pl-8 lg:pr-4">{children}</main>
      </div>

      {/* Footer */}
      <footer className="border-t border-line bg-surface-1 py-6 mt-16">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 text-xs text-fg-dim">
          <p>© {new Date().getFullYear()} Private Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://privatesolution.org" className="hover:text-fg transition-colors">
              Main Site
            </a>
            <a href="https://forum.privatesolution.org" className="hover:text-fg transition-colors">
              Forum
            </a>
            <a href="https://discord.gg/XFEkf2kV26" className="text-accent hover:underline">
              Support Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
