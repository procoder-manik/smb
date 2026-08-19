'use client'

import { motion } from 'framer-motion'

export default function TopBar({ text, ctaText, ctaLink = '#book' }) {
  return (
    <motion.div
      className="topbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="wrap">
        <span>💡 {text}</span>
        <a href={ctaLink}>{ctaText}</a>
      </div>
    </motion.div>
  )
}
