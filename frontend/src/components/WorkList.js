'use client'

import { motion } from 'framer-motion'

export default function WorkList({ items }) {
  if (!items || items.length === 0) return null

  return (
    <section className="section alt">
      <div className="wrap">
        <motion.div
          className="work-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="work"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 0.7, 0.24, 1] },
                },
              }}
              whileHover={{ y: -3 }}
            >
              <div className="num">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
