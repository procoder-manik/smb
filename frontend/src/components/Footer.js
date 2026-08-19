'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer({ industries = [] }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="logo">
              <span className="mark">◆</span> SBM
            </Link>
            <p className="foot-about">
              Practical SEO, local search, and AI search visibility for small businesses that are still small enough to care about.
            </p>
          </div>
          <div>
            <h5>Services</h5>
            <a href="#services">SEO</a>
            <a href="#services">Local SEO</a>
            <a href="#services">AI Search (GEO/AEO)</a>
            <a href="#services">Ads Marketing</a>
            <a href="#services">Content Marketing</a>
          </div>
          <div>
            <h5>Industries</h5>
            {industries.map((ind) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`}>{ind.title}</Link>
            ))}
          </div>
          <div>
            <h5>Company</h5>
            <a href="#why">Why Us</a>
            <a href="#results">Results</a>
            <a href="#faq">FAQs</a>
            <a href="#book">Book a Call</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 smallbusinessmarketing.co. All rights reserved.</span>
          <span>No lock-in contracts · Plain-English reporting</span>
        </div>
      </div>
    </footer>
  )
}
