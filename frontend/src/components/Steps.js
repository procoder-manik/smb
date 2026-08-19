'use client'

import { motion } from 'framer-motion'

export default function Steps({ items, subtitle }) {
  if (!items || items.length === 0) return null

  return (
    <section className="section">
      <div className="wrap">
        {subtitle && (
          <motion.div
            className="head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>{subtitle}</h2>
          </motion.div>
        )}
        <motion.div
          className="steps"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '22px' }}
        >
          {items.map((step, i) => (
            <motion.div
              key={i}
              className="step"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 0.7, 0.24, 1] },
                },
              }}
              whileHover={{ y: -5 }}
            >
              <div className="n">{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
