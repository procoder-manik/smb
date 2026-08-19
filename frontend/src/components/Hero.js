'use client'

import { motion } from 'framer-motion'

export default function Hero({ eyebrow, title, titleGrad, titleTrail, subtitle, ctaText, ctaSecondary, ctaLink = '#book', ctaSecondaryLink = '#book' }) {
  return (
    <section className="hero">
      <div className="wrap inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="dot"></span>
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {title}
          {titleGrad && <span className="grad">{titleGrad}</span>}
          {titleTrail}
        </motion.h1>
        <motion.p
          className="sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <a href={ctaLink} className="btn btn-primary">{ctaText} →</a>
          {ctaSecondary && (
            <a href={ctaSecondaryLink} className="btn btn-ghost">📞 {ctaSecondary}</a>
          )}
        </motion.div>
        <motion.div
          className="trust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <span><b>✓</b> No lock-in contracts</span>
          <span><b>✓</b> Plain-English reporting</span>
          <span><b>✓</b> Built for small budgets</span>
        </motion.div>
      </div>
    </section>
  )
}
