'use client'

import { motion, AnimatePresence } from 'framer-motion'

export default function FAQ({ items }) {
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <motion.div
          className="head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>FAQs small business owners actually ask</h2>
        </motion.div>
        <motion.div
          className="faq"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {items.map((item, i) => (
            <motion.details
              key={i}
              open={i === 0}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4 },
                },
              }}
            >
              <summary>
                {item.question}
                <span className="plus">+</span>
              </summary>
              <AnimatePresence>
                {item._open && (
                  <motion.div
                    className="ans"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.details>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
