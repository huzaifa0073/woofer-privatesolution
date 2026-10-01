import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#080c10',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Private Solutions | Woofer Documentation',
  description:
    'Complete guide and documentation for Private Solutions Woofer setup, Windows reinstallation, RAID, BIOS configuration, and hardware isolation.',
  icons: {
    icon: '/ps-logo.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-fg">
        {children}
      </body>
    </html>
  )
}
