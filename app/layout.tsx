import type { Metadata } from 'next'
import { Geist, Geist_Mono, Marcellus } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-sans',
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono',
});

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Immigration Services Cabo San Lucas | Temporary & Permanent Residency',
  description: 'Official immigration assistance for Cabo San Lucas, Mexico. Expert help with temporary residency, permanent residency, work permits, and visa services. INM-certified consultants.',
  keywords: ['Cabo San Lucas immigration', 'Mexico residency', 'temporary residency Mexico', 'permanent residency Cabo', 'work permits Mexico', 'INM services', 'Baja California Sur immigration'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Immigration Services - Cabo San Lucas, Mexico',
    description: 'Professional immigration assistance for Cabo San Lucas. Temporary residency, permanent residency, and work permits.',
    siteName: 'Cabo Immigration Services',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${marcellus.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}