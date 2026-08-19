'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import TopBar from '@/components/TopBar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import WhyUs from '@/components/WhyUs'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function IndustryPageClient({ industry, caseStudies, testimonials, faqs, staticIndustries, isHome }) {
  return (
    <motion.div
      className="page-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      key={industry.slug}
    >
      <TopBar
        text={isHome ? 'Tired of being invisible online? Get a free visibility audit — no pressure.' : `Losing customers to the place next door? Get a free ${industry.title?.split(' ')[0]?.toLowerCase() || 'business'} audit.`}
        ctaText={isHome ? 'Get My Free Growth Plan' : 'See If We\'re A Fit'}
      />
      <Header
        navLinks={isHome ? [
          { label: 'Services', href: '#services' },
          { label: 'Why Us', href: '#why' },
          { label: 'Industries', href: '/industries/restaurant' },
          { label: 'Results', href: '#results' },
          { label: 'FAQs', href: '#faq' },
        ] : [
          { label: 'Services', href: '#services' },
          { label: 'Why Us', href: '#why' },
          { label: 'Industries', href: '/' },
          { label: 'Results', href: '#results' },
          { label: 'FAQs', href: '#faq' },
        ]}
      />
      <main>
        <Hero
          eyebrow={industry.eyebrow}
          title={industry.heroTitle}
          subtitle={industry.heroSub}
          ctaText={industry.ctaText}
          ctaSecondary={isHome ? industry.ctaSecondary : 'See Our Results →'}
          ctaSecondaryLink={isHome ? '#book' : '/#results'}
        />

        <section className="section">
          <div className="wrap split">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow"><span className="dot"></span> Certified experts in {industry.title?.split(' ')[0]}</span>
              <h2>Built for the moment they're deciding <span className="grad">where to go.</span></h2>
              <p>{industry.heroSub}</p>
            </motion.div>
            <motion.div
              className="checklist"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              {(industry.whyItems || []).slice(0, 3).map((item, i) => (
                <motion.div
                  key={i}
                  className="check"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="ico">✓</div>
                  <div>
                    <b>{item.title}</b>
                    <span>{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Services
          title="From the search bar to the customer."
          subtitle="We manage everything between a local search and a booked appointment or purchase."
          items={industry.services}
        />

        {industry.steps && (
          <section className="section">
            <div className="wrap">
              <motion.div
                className="head"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2>{isHome ? 'Filling tables is the easy part' : 'Getting results is the easy part'}.</h2>
              </motion.div>
              <motion.div
                className="steps"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '22px' }}
              >
                {industry.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="step"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: [0.22, 0.7, 0.24, 1] },
                      },
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="n">{step.n}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        <WhyUs
          title={`Why ${industry.title?.split(' ')[0]}s choose us over a generalist agency`}
          subtitle={`We only work with ${industry.title?.split(' ')[0]?.toLowerCase()}s. Not a generalist agency guessing at your industry — our process, pricing, and reporting are built for you.`}
          items={industry.whyItems}
        />

        {industry.region && (
          <section className="section">
            <div className="wrap">
              <motion.div
                className="region"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h3>{industry.region.title}</h3>
                  <p>{industry.region.desc}</p>
                </div>
                <a href="#book" className="btn btn-primary">{industry.region.cta} →</a>
              </motion.div>
            </div>
          </section>
        )}

        <section className="section alt" id="faq">
          <div className="wrap">
            <motion.div
              className="head"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>FAQ about our {industry.title?.toLowerCase()} services</h2>
            </motion.div>
            <FAQ items={faqs} />
          </div>
        </section>

        <FinalCTA
          title={`Ready to ${isHome ? 'get found online' : `get more ${industry.title?.split(' ')[0]?.toLowerCase()} customers`}?`}
          subtitle={`Get a free ${industry.title?.split(' ')[0]?.toLowerCase()} audit and we'll show you exactly where you're losing customers to nearby competitors — and how to win them back.`}
          ctaText={isHome ? 'Book Your Free 20-Minute Call' : `Get My Free ${industry.title?.split(' ')[0]} Audit`}
        />
      </main>
      <Footer industries={staticIndustries.filter(i => i.id !== 'home')} />
    </motion.div>
  )
}
