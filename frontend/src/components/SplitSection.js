'use client'

import { motion } from 'framer-motion'

export default function SplitSection({ eyebrow, title, titleGrad, paragraphs, checklist, introVisual }) {
  return (
    <section className="section">
      <div className="wrap split">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {eyebrow && (
            <span className="eyebrow">
              <span className="dot"></span>
              {eyebrow}
            </span>
          )}
          <h2>
            {title}
            {titleGrad && <span className="grad">{titleGrad}</span>}
          </h2>
          {paragraphs && paragraphs.map((p, i) => (
            <p key={i} style={{ margin: i > 0 ? '8px 0 0' : '0' }}>{p}</p>
          ))}
        </motion.div>
        {checklist && checklist.length > 0 && (
          <motion.div
            className="checklist"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {checklist.map((item, i) => (
              <motion.div
                key={i}
                className="check"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="ico">✓</div>
                <div>
                  <b>{item.title}</b>
                  <span>{item.desc}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
