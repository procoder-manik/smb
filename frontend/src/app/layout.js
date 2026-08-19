import { Inter, Manrope } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata = {
  title: {
    default: 'Small Business Marketing — Get Found on Google, Maps & AI Search',
    template: '%s | Small Business Marketing'
  },
  description: 'Practical SEO, local search, and AI search optimization built for small businesses. Plain-English reporting, no lock-in contracts.',
  keywords: ['SEO', 'local SEO', 'small business marketing', 'AI search optimization', 'Google Business Profile'],
  authors: [{ name: 'Small Business Marketing' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://smallbusinessmarketing.co',
    siteName: 'Small Business Marketing',
    title: 'Small Business Marketing — Get Found on Google, Maps & AI Search',
    description: 'Practical SEO, local search, and AI search optimization built for small businesses.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
