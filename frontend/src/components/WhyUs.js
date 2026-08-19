'use client'

import { motion } from 'framer-motion'

export default function WhyUs({ title, subtitle, items }) {
  return (
    <section className="section" id="why">
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
            Why small businesses pick us
          </span>
          <h2>Built around <span className="grad">your size and budget</span>. Nothing else.</h2>
          <p>{subtitle}</p>
        </motion.div>
        <motion.div
          className="why-grid"
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
              className="why"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 0.7, 0.24, 1] },
                },
              }}
              whileHover={{ y: -5 }}
            >
              {item.icon ? (
                <div className="check" style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, var(--gold), var(--brand))',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '1.5rem',
                }}>
                  {item.icon}
                </div>
              ) : (
                <div className="check">✓</div>
              )}
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          style={{ textAlign: 'center', marginTop: '44px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href="#book" className="btn btn-primary">Book Your Free Strategy Call →</a>
        </motion.div>
      </div>
    </section>
  )
}
