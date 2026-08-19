'use client'

import { motion } from 'framer-motion'

export default function Callout({ eyebrow, title, titleGrad, paragraphs }) {
  return (
    <section className="section">
      <div className="wrap">
        <motion.div
          className="callout"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 0.7, 0.24, 1] }}
        >
          {eyebrow && (
            <span className="eyebrow">
              <span className="dot"></span>
              {eyebrow}
            </span>
          )}
          <h3>
            {title}
            {titleGrad && <span className="grad">{titleGrad}</span>}
          </h3>
          {paragraphs && paragraphs.map((p, i) => (
            <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? '14px' : '0' }}>{p}</p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
