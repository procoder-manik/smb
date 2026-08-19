'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TopBar from '@/components/TopBar'

const tiers = [
  {
    name: 'Starter',
    price: '$497',
    period: '/month',
    description: 'Perfect for local businesses just getting started with SEO.',
    features: [
      'Local SEO & Google Business Profile',
      'Up to 10 keywords tracked',
      'Monthly performance report',
      'Basic technical SEO audit',
      'Email support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$997',
    period: '/month',
    description: 'For businesses ready to dominate local search and build organic traffic.',
    features: [
      'Everything in Starter, plus:',
      'Up to 30 keywords tracked',
      'Content marketing (2 posts/month)',
      'Advanced technical SEO',
      'Review generation system',
      'Bi-weekly strategy calls',
      'Priority support',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: '$1,997',
    period: '/month',
    description: 'For established businesses that want to own their market.',
    features: [
      'Everything in Growth, plus:',
      'Up to 75 keywords tracked',
      'Content marketing (4 posts/month)',
      'Link building campaign',
      'Competitor analysis',
      'Dedicated strategist',
      'Weekly strategy calls',
      '24/7 priority support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
]

export default function Pricing() {
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
              Transparent pricing
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Simple pricing, <span className="grad">no lock-in contracts</span>
            </motion.h1>
            <motion.p
              className="sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Every plan includes plain-English reporting and a dedicated strategist. Month-to-month — because results should keep you, not contracts.
            </motion.p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="section alt">
          <div className="wrap">
            <motion.div
              className="cards"
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
              {tiers.map((tier, i) => (
                <motion.div
                  key={i}
                  className="card"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.22, 0.7, 0.24, 1] },
                    },
                  }}
                  whileHover={{ y: -6 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: tier.highlighted ? '2px solid rgba(255,0,0,0.3)' : '1px solid var(--line)',
                    position: 'relative',
                  }}
                >
                  {tier.highlighted && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(90deg, var(--brand), var(--gold))',
                      color: '#fff',
                      padding: '4px 16px',
                      borderRadius: '100px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      fontFamily: 'Manrope',
                    }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{tier.name}</h3>
                    <p style={{ color: 'var(--body)', fontSize: '0.95rem', marginBottom: '20px' }}>{tier.description}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'Manrope', fontSize: '2.5rem', fontWeight: 800, color: 'var(--ink)' }}>{tier.price}</span>
                      <span style={{ color: 'var(--body)', fontSize: '0.95rem' }}>{tier.period}</span>
                    </div>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1 }}>
                    {tier.features.map((feature, j) => (
                      <li key={j} style={{ display: 'flex', gap: '12px', marginBottom: '14px', fontSize: '0.95rem' }}>
                        <span style={{
                          flex: '0 0 auto',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'radial-gradient(circle at 30% 30%, var(--gold), var(--brand))',
                          color: '#fff',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#book"
                    className="btn"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      background: tier.highlighted ? 'radial-gradient(circle at 30% 30%, var(--gold) 0%, var(--brand) 55%, var(--brand))' : '#fff',
                      color: tier.highlighted ? '#fff' : 'var(--brand)',
                      border: tier.highlighted ? '1.5px solid transparent' : '1.5px solid rgba(255,0,0,0.4)',
                      boxShadow: tier.highlighted ? '0 10px 24px -8px rgba(255,0,0,0.4)' : 'none',
                    }}
                  >
                    {tier.cta} →
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="wrap">
            <motion.div
              className="head"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Pricing <span className="grad">FAQs</span></h2>
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
              {[
                { q: 'Do I need to sign a long contract?', a: 'No. We earn the right to keep working with you every month. All plans are month-to-month.' },
                { q: 'Can I upgrade or downgrade?', a: 'Yes, you can change plans at any time. Changes take effect at your next billing cycle.' },
                { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, ACH, and PayPal.' },
                { q: 'Is there a setup fee?', a: 'No setup fees. You pay your monthly plan and we get to work immediately.' },
                { q: 'Do you offer custom plans?', a: 'Yes. If none of our standard plans fit, we can build a custom package around your needs.' },
              ].map((item, i) => (
                <motion.details
                  key={i}
                  open={i === 0}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <summary>{item.q} <span className="plus">+</span></summary>
                  <div className="ans"><p>{item.a}</p></div>
                </motion.details>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
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
              <h2>Not sure which plan is right?</h2>
              <p>Book a free 20-minute call and we'll recommend the best plan for your business and budget.</p>
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
