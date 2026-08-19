'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Header({ navLinks = [] }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="wrap nav">
        <Link href="/" className="logo">
          <span className="mark">◆</span>
          <span>SBM<small>Small Business Marketing</small></span>
        </Link>
        <nav className="nav-links">
          {navLinks.map((link, i) => (
            <Link key={i} href={link.href}>{link.label}</Link>
          ))}
        </nav>
        <div className="nav-cta">
          <a href="#book" className="btn btn-ghost" style={{ padding: '11px 22px' }}>
            Contact Us
          </a>
        </div>
      </div>
    </motion.header>
  )
}
