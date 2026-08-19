'use client'

import { motion } from 'framer-motion'

export default function Services({ title, subtitle, items }) {
  return (
    <section className="section alt" id="services">
      <div className="wrap">
        <motion.div
          className="head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow" style={{ marginInline: 'auto' }}>
            <span className="dot"></span>
            What we do
          </span>
          <h2>Everything a growing business needs to get found — and <span className="grad">stay found</span>.</h2>
          <p>{subtitle}</p>
        </motion.div>
        <motion.div
          className="cards"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 0.7, 0.24, 1] },
                },
              }}
              whileHover={{ y: -6 }}
            >
              {item.num ? (
                <div className="num" style={{
                  fontFamily: 'Manrope',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, var(--brand), var(--gold))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  lineHeight: 1,
                  marginBottom: '18px',
                }}>
                  {item.num}
                </div>
              ) : (
                <div className="icon">{item.icon}</div>
              )}
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              {item.tags && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
                  {item.tags.map((tag, j) => (
                    <span key={j} className="tag">{tag}</span>
                  ))}
                </div>
              )}
              {item.isCta && (
                <a href="#book" className="more">Get a free growth plan →</a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
