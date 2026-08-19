'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TopBar from '@/components/TopBar'

export default function About() {
  return (
    <motion.div
      className="page-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <TopBar
        text="Tired of being invisible online? Get a free visibility audit — no pressure."
        ctaText="Get My Free Growth Plan"
      />
      <Header
        navLinks={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/#services' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ]}
      />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="wrap inner">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="dot"></span>
              About Small Business Marketing
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              We built this agency because <span className="grad">small businesses deserve better</span>
            </motion.h1>
            <motion.p
              className="sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Big agencies treat small businesses like afterthoughts. We don't. Every strategy, every report, every decision is built around your scale — not an enterprise template.
            </motion.p>
          </div>
        </section>

        {/* Mission */}
        <section className="section">
          <div className="wrap split">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow"><span className="dot"></span> Our mission</span>
              <h2>Visibility that <span className="grad">lasts beyond the invoice</span></h2>
              <p className="intro">
                Most small businesses aren't losing to bigger budgets — they're losing to bigger visibility. We exist to level the playing field with practical SEO, local search, and content that compounds over time.
              </p>
              <div className="bullets stagger-children">
                <div className="bullet">
                  <div className="ico">🎯</div>
                  <div>
                    <h4>Built for your scale</h4>
                    <p>No enterprise leftovers. Every process is designed for small teams and lean budgets.</p>
                  </div>
                </div>
                <div className="bullet">
                  <div className="ico">📊</div>
                  <div>
                    <h4>Results you can understand</h4>
                    <p>Plain-English reporting tied to leads and revenue — not vanity metrics.</p>
                  </div>
                </div>
                <div className="bullet">
                  <div className="ico">🤝</div>
                  <div>
                    <h4>No lock-in contracts</h4>
                    <p>We keep your business by delivering results, not by making it expensive to leave.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="visual"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ rotate: 1 }}
            >
              <svg className="gauge" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Growth chart">
                <circle cx="100" cy="100" r="82" stroke="#f0f1f5" strokeWidth="16" />
                <motion.circle
                  cx="100" cy="100" r="82"
                  stroke="url(#g)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray="402"
                  initial={{ strokeDashoffset: 402 }}
                  whileInView={{ strokeDashoffset: 90 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  transform="rotate(-90 100 100)"
                />
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="200" y2="200">
                    <stop stopColor="#fdcf58" />
                    <stop offset="1" stopColor="#ff0000" />
                  </linearGradient>
                </defs>
                <motion.text
                  x="100" y="96"
                  textAnchor="middle"
                  fontFamily="Manrope"
                  fontWeight="800"
                  fontSize="40"
                  fill="#ff0000"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  +425%
                </motion.text>
                <motion.text
                  x="100" y="122"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontWeight="600"
                  fontSize="13"
                  fill="#54607a"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  Client growth
                </motion.text>
              </svg>
            </motion.div>
          </div>
        </section>

        {/* Values */}
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
                What guides us
              </span>
              <h2>The principles we <span className="grad">never compromise on</span></h2>
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
              <motion.div className="why" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} whileHover={{ y: -5 }}>
                <div className="check">✓</div>
                <div>
                  <h4>Transparency first</h4>
                  <p>Every report answers one question: is this making you more money than it costs?</p>
                </div>
              </motion.div>
              <motion.div className="why" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} whileHover={{ y: -5 }}>
                <div className="check">✓</div>
                <div>
                  <h4>Honest advice</h4>
                  <p>We tell you when something isn't working — before you have to ask.</p>
                </div>
              </motion.div>
              <motion.div className="why" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} whileHover={{ y: -5 }}>
                <div className="check">✓</div>
                <div>
                  <h4>Long-term thinking</h4>
                  <p>We build visibility that compounds after the invoice, not shortcuts that fade.</p>
                </div>
              </motion.div>
              <motion.div className="why" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} whileHover={{ y: -5 }}>
                <div className="check">✓</div>
                <div>
                  <h4>Small-business focus</h4>
                  <p>We only work with small businesses. You're never squeezed into an enterprise process.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="wrap">
            <motion.div
              className="cta-final"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow" style={{ marginInline: 'auto' }}>
                <span className="dot"></span>
                Ready when you are
              </span>
              <h2>Want to work with an agency that <span className="grad">actually cares</span>?</h2>
              <p>Book a free 20-minute call. We'll show you exactly where you're losing visibility — no pressure, no obligation.</p>
              <a href="/contact" className="btn btn-primary" style={{ padding: '16px 34px', fontSize: '1.05rem' }}>
                Book Your Free Call →
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}
