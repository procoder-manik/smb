'use client'

import { motion } from 'framer-motion'

export default function FinalCTA({ title, subtitle, ctaText, ctaLink = '#' }) {
  return (
    <div className="wrap" id="book">
      <motion.div
        className="cta-final"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 0.7, 0.24, 1] }}
        whileHover={{ y: -3 }}
      >
        <span className="eyebrow" style={{ marginInline: 'auto' }}>
          <span className="dot"></span>
          Ready when you are
        </span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <a href={ctaLink} className="btn btn-primary" style={{ padding: '16px 34px', fontSize: '1.05rem' }}>
          {ctaText} →
        </a>
      </motion.div>
    </div>
  )
}
