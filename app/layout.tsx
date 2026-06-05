import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0E1A',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://lihamlogue.com'),
  title: 'SMART P&B — An Operating System for Text IP',
  description:
    'AI와 인간이 함께 텍스트를 신뢰 가능한 IP로 전환하는 운영체제. Turn one manuscript into one industry-grade IP.',
  keywords: [
    'AI publishing', 'text IP', 'operating system', 'Korean startup',
    'Liham Logue', 'SMART P&B', '출판', 'IP', '작가', '전자책', '오디오북',
  ],
  authors: [{ name: 'Liham Logue Inc.' }],
  creator: 'Liham Logue Inc.',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    url: 'https://lihamlogue.com',
    siteName: 'SMART P&B',
    title: 'SMART P&B — An Operating System for Text IP',
    description:
      '한 편의 원고를, 하나의 산업형 IP로. AI와 인간이 함께 텍스트를 신뢰 가능한 IP로 전환하는 운영체제.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SMART P&B — 한 편의 원고를, 하나의 산업형 IP로.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SMART P&B — An Operating System for Text IP',
    description: '한 편의 원고를, 하나의 산업형 IP로.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
