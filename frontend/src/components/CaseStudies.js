'use client'

import { motion } from 'framer-motion'

export default function CaseStudies({ cases }) {
  return (
    <section className="section" id="results">
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
            Proof, not promises
          </span>
          <h2>We don't ask you to take our word for it. <span className="grad">We show the numbers.</span></h2>
        </motion.div>
        <div className="stack">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              className="case"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="grid">
                <div>
                  <span className="sector">{item.sector}</span>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <a className="view" href="#">View Details →</a>
                </div>
                <div className="metrics">
                  {item.metrics.map((metric, j) => (
                    <motion.div
                      key={j}
                      className="metric"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + j * 0.1 }}
                    >
                      <div className="num">{metric.num}</div>
                      <div className="lbl">{metric.lbl}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
