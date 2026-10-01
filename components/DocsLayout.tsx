'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { DOCS } from '@/lib/docs-data'

const CATEGORIES = [
  { name: 'Getting Started', icon: '🚀' },
  { name: 'Preparation', icon: '⚙️' },
  { name: 'Intel Alternative', icon: '💻' },
  { name: 'Woofer Setup', icon: '🛡️' },
  { name: 'Hardware Solutions', icon: '⚡' },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredDocs = search.trim()
    ? DOCS.filter(
        (d) =>
          d.title.toLowerCase().includes(search.toLowerCase()) ||
          d.description.toLowerCase().includes(search.toLowerCase()) ||
          d.category.toLowerCase().includes(search.toLowerCase())
      )
    : []

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-fg relative overflow-x-hidden selection:bg-accent/30 selection:text-white">
      {/* Ambient Top Glow Orbs */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-mesh-radial opacity-80 z-0" />

      {/* Global Spotlight Search Modal (Ctrl + K) */}
      {searchOpen && (
        <div
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fade-in-slide"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl border border-white/15 bg-surface-1 p-4 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-line pb-3 px-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                autoFocus
                placeholder="Search across all 16 guides and setup chapters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-fg placeholder:text-fg-dim focus:outline-none"
              />
              <span className="rounded bg-surface-2 px-2 py-0.5 text-2xs font-mono text-fg-dim border border-line">
                ESC
              </span>
            </div>

            <div className="mt-3 max-h-80 overflow-y-auto space-y-1">
              {search.trim() ? (
                filteredDocs.length > 0 ? (
                  filteredDocs.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/${d.slug}`}
                      onClick={() => {
                        setSearchOpen(false)
                        setSearch('')
                      }}
                      className="group flex flex-col gap-1 rounded-xl p-3 hover:bg-surface-2 transition-colors border border-transparent hover:border-line"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-fg group-hover:text-accent transition-colors">
                          {d.title}
                        </span>
                        <span className="text-2xs rounded bg-surface-3 px-2 py-0.5 text-fg-dim font-medium">
                          {d.category}
                        </span>
                      </div>
                      <p className="text-xs text-fg-muted line-clamp-1">{d.description}</p>
                    </Link>
                  ))
                ) : (
                  <p className="py-8 text-center text-xs text-fg-dim">No guides matching "{search}"</p>
                )
              ) : (
                <div className="p-3 text-xs text-fg-dim">
                  <p className="font-semibold text-fg-muted mb-2">Popular Guides:</p>
                  <div className="flex flex-wrap gap-2">
                    {['windows-reinstallation', 'raid-reinstallation', 'spoofing', 'flash-bios'].map((slug) => {
                      const item = DOCS.find((d) => d.slug === slug)
                      if (!item) return null
                      return (
                        <Link
                          key={slug}
                          href={`/${slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="rounded-lg bg-surface-2 px-2.5 py-1 text-2xs text-fg-muted hover:text-white hover:bg-surface-3 transition-colors border border-line"
                        >
                          {item.title}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl border border-line bg-surface-1 text-fg-muted hover:text-fg hover:border-line-strong transition-colors"
              aria-label="Toggle navigation menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/ps-logo.webp"
                  alt="Private Solutions Logo"
                  width={34}
                  height={34}
                  className="rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  Private<span className="text-accent">Solutions</span>
                </span>
                <span className="hidden sm:inline-flex items-center rounded-full bg-accent-soft px-2.5 py-0.5 text-2xs font-bold text-accent border border-accent/25 shadow-sm">
                  Woofer Docs
                </span>
              </div>
            </Link>
          </div>

          {/* Center search trigger button (Desktop) */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-3 rounded-full border border-line bg-surface-1/90 px-4 py-1.5 text-xs text-fg-dim hover:text-fg-muted hover:border-line-strong transition-all duration-200 w-64 justify-between shadow-inner"
          >
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search guides...</span>
            </div>
            <kbd className="rounded bg-surface-2 px-1.5 py-0.5 text-2xs font-mono border border-line text-fg-dim">
              Ctrl K
            </kbd>
          </button>

          {/* Quick links & Discord CTA */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold">
            <a
              href="https://privatesolution.org/#products"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 rounded-xl border border-line bg-surface-1/90 px-3.5 py-2 text-fg-muted hover:text-white hover:border-line-strong hover:bg-surface-2 transition-all duration-200"
            >
              Store ↗
            </a>
            <a
              href="https://forum.privatesolution.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 rounded-xl border border-line bg-surface-1/90 px-3.5 py-2 text-fg-muted hover:text-white hover:border-line-strong hover:bg-surface-2 transition-all duration-200"
            >
              Forum ↗
            </a>
            <a
              href="https://discord.gg/XFEkf2kV26"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-white font-bold hover:bg-accent-bright transition-all duration-200 shadow-[0_0_15px_rgba(45,156,245,0.35)] hover:shadow-[0_0_22px_rgba(45,156,245,0.55)] hover:-translate-y-0.5"
            >
              <svg width="15" height="15" viewBox="0 0 640 512" fill="currentColor">
                <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
              </svg>
              <span>Discord</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6 relative z-10">
        {/* Left Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-72 border-r border-line bg-canvas/95 backdrop-blur-xl p-5 pt-20 transition-transform duration-300 ease-out lg:static lg:block lg:p-4 lg:pt-8 lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
        >
          {/* Mobile Search input */}
          <div className="mb-6 md:hidden">
            <button
              onClick={() => {
                setMobileOpen(false)
                setSearchOpen(true)
              }}
              className="w-full flex items-center justify-between rounded-xl border border-line bg-surface-1 px-3.5 py-2.5 text-xs text-fg-dim"
            >
              <span>Search guides...</span>
              <span className="font-mono text-2xs bg-surface-2 px-1.5 py-0.5 rounded">Ctrl K</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-8rem)] pr-1 pb-10">
            {CATEGORIES.map((cat) => {
              const catDocs = DOCS.filter((d) => d.category === cat.name)
              if (catDocs.length === 0) return null
              return (
                <div key={cat.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 px-2.5 py-1 text-2xs font-extrabold uppercase tracking-wider text-fg-dim">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {catDocs.map((doc) => {
                      const isActive =
                        pathname === `/${doc.slug}` ||
                        (pathname === '/' && doc.slug === 'welcome')
                      return (
                        <Link
                          key={doc.slug}
                          href={`/${doc.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs sm:text-[13px] font-medium transition-all duration-150 ${
                            isActive
                              ? 'bg-gradient-to-r from-accent/20 to-accent/5 text-accent-bright font-bold border-l-2 border-accent shadow-[0_0_15px_rgba(45,156,245,0.15)]'
                              : 'text-fg-muted hover:bg-surface-1 hover:text-white hover:translate-x-0.5'
                          }`}
                        >
                          <span className="truncate">{doc.title}</span>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 shadow-[0_0_8px_rgba(45,156,245,0.8)]" />
                          )}
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
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden transition-opacity"
          />
        )}

        {/* Page Content */}
        <main className="min-w-0 flex-1 py-8 sm:py-10 lg:pl-10 xl:pl-12">{children}</main>
      </div>

      {/* Footer */}
      <footer className="border-t border-line bg-surface-1/90 backdrop-blur-md py-8 mt-20 relative z-10">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-6 px-4 sm:px-6 text-xs text-fg-dim">
          <div className="flex items-center gap-3">
            <Image
              src="/ps-logo.webp"
              alt="Private Solutions"
              width={24}
              height={24}
              className="rounded"
            />
            <p>© {new Date().getFullYear()} Private Solutions. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <a href="https://privatesolution.org" className="hover:text-white transition-colors">
              Main Site
            </a>
            <a href="https://forum.privatesolution.org" className="hover:text-white transition-colors">
              Forum
            </a>
            <a href="https://privatesolution.org/#products" className="hover:text-white transition-colors">
              Store
            </a>
            <a href="https://discord.gg/XFEkf2kV26" className="text-accent hover:text-accent-bright hover:underline transition-colors">
              Support Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
