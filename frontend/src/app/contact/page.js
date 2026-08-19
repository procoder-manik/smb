'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TopBar from '@/components/TopBar'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', business: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

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
              Get in touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Let's talk about <span className="grad">your visibility</span>
            </motion.h1>
            <motion.p
              className="sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Tell us about your business and we'll show you exactly where you're losing visibility — no pressure, no obligation.
            </motion.p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section">
          <div className="wrap split">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow"><span className="dot"></span> Contact us</span>
              <h2>Ready to get <span className="grad">found online</span>?</h2>
              <p className="intro">
                Fill out the form and we'll get back to you within 24 hours. Or reach us directly:
              </p>

              <div className="bullets stagger-children">
                <div className="bullet">
                  <div className="ico">📧</div>
                  <div>
                    <h4>Email</h4>
                    <p>hello@smallbusinessmarketing.co</p>
                  </div>
                </div>
                <div className="bullet">
                  <div className="ico">📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="bullet">
                  <div className="ico">📍</div>
                  <div>
                    <h4>Location</h4>
                    <p>Serving businesses across the US & UK</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {submitted ? (
                <motion.div
                  className="checklist"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '40px', background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}
                >
                  <div className="ico" style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, var(--gold), var(--brand))', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '1.5rem', margin: '0 auto 20px' }}>
                    ✓
                  </div>
                  <h3 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '12px' }}>Message Sent!</h3>
                  <p style={{ textAlign: 'center', color: 'var(--body)' }}>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '40px', background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.95rem' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Smith"
                      style={{ width: '100%', padding: '14px 18px', border: '1.5px solid var(--line)', borderRadius: '12px', fontSize: '1rem', fontFamily: 'Inter', transition: 'border-color 0.2s' }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--brand)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.95rem' }}>Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@business.com"
                      style={{ width: '100%', padding: '14px 18px', border: '1.5px solid var(--line)', borderRadius: '12px', fontSize: '1rem', fontFamily: 'Inter', transition: 'border-color 0.2s' }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--brand)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.95rem' }}>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      style={{ width: '100%', padding: '14px 18px', border: '1.5px solid var(--line)', borderRadius: '12px', fontSize: '1rem', fontFamily: 'Inter', transition: 'border-color 0.2s' }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--brand)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.95rem' }}>Business Name</label>
                    <input
                      type="text"
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      placeholder="Your Business"
                      style={{ width: '100%', padding: '14px 18px', border: '1.5px solid var(--line)', borderRadius: '12px', fontSize: '1rem', fontFamily: 'Inter', transition: 'border-color 0.2s' }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--brand)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.95rem' }}>Tell us about your business</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What are your goals? What challenges are you facing?"
                      rows="4"
                      style={{ width: '100%', padding: '14px 18px', border: '1.5px solid var(--line)', borderRadius: '12px', fontSize: '1rem', fontFamily: 'Inter', resize: 'vertical', transition: 'border-color 0.2s' }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--brand)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px 30px', fontSize: '1.05rem' }}>
                    Send Message →
                  </button>
                  <p style={{ fontSize: '0.85rem', color: 'var(--body)', textAlign: 'center' }}>
                    By submitting, you agree to our privacy policy. No spam, ever.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}
