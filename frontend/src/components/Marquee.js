'use client'

import { motion } from 'framer-motion'

export default function Marquee({ brands }) {
  return (
    <section className="marquee-sec">
      <div className="wrap">
        <motion.div
          className="title"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Brands that chose us to get found
        </motion.div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {[...brands, ...brands].map((brand, i) => (
            <span key={i}>{brand}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
