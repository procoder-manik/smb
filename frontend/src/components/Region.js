'use client'

import { motion } from 'framer-motion'

export default function Region({ title, desc, ctaText, ctaLink = '#book' }) {
  if (!title) return null

  return (
    <section className="section">
      <div className="wrap">
        <motion.div
          className="region"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3>{title}</h3>
            {desc && <p>{desc}</p>}
          </div>
          <a href={ctaLink} className="btn btn-primary">{ctaText} →</a>
        </motion.div>
      </div>
    </section>
  )
}
