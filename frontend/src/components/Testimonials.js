'use client'

import { motion } from 'framer-motion'

export default function Testimonials({ items }) {
  return (
    <section className="section alt">
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
            What clients say
          </span>
          <h2>Small businesses that stopped <span className="grad">losing visibility</span>.</h2>
        </motion.div>
        <motion.div
          className="testi-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="testi"
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
              <div className="stars">
                {'★'.repeat(item.stars)}
              </div>
              <q>{item.quote}</q>
              <div className="who">— <b>{item.who}</b>, {item.company}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
