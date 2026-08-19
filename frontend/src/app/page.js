import { motion } from 'framer-motion'
import Header from '@/components/Header'
import TopBar from '@/components/TopBar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Services from '@/components/Services'
import WhyUs from '@/components/WhyUs'
import CaseStudies from '@/components/CaseStudies'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import { industries as staticIndustries, caseStudies as staticCaseStudies, testimonials as staticTestimonials, faqs as staticFaqs, marqueeBrands as staticMarqueeBrands } from '@/data/default-content'
import { getAllContent } from '@/lib/wp'

export const revalidate = 60

async function getData() {
  try {
    const data = await getAllContent()
    if (data && data.industries && data.industries.length > 0) {
      return {
        industries: data.industries,
        caseStudies: data.caseStudies || staticCaseStudies,
        testimonials: data.testimonials || staticTestimonials,
        faqs: data.faqs || staticFaqs,
        marqueeBrands: staticMarqueeBrands,
        usingLiveData: true,
      }
    }
  } catch (error) {
    console.error('Failed to fetch from WordPress, using fallback data:', error)
  }

  return {
    industries: staticIndustries,
    caseStudies: staticCaseStudies,
    testimonials: staticTestimonials,
    faqs: staticFaqs,
    marqueeBrands: staticMarqueeBrands,
    usingLiveData: false,
  }
}

export default async function Home() {
  const { industries, caseStudies, testimonials, faqs, marqueeBrands } = await getData()
  const homeData = industries[0] || staticIndustries[0]

  const homeIndustries = [
    { slug: 'seo-plumbing', icon: '🪠', title: 'Plumbing SEO', blurb: 'Get found the moment someone has a leak, a clog, or a burst pipe. We target emergency and local "near me" searches so you\'re the first call, not the fifth.' },
    { slug: 'seo-hvac', icon: '❄️', title: 'HVAC SEO', blurb: 'Rank for install, repair, and maintenance searches year-round — not just during the summer and winter rush when everyone\'s competing for the same keywords.' },
    { slug: 'seo-healthcare', icon: '✚', title: 'Healthcare SEO (Therapy & Dental)', blurb: 'Build trust and visibility for a practice where patients research carefully. We optimize local search, service pages, and the reviews that influence a first appointment.' },
    { slug: 'seo-lawyer', icon: '⚖️', title: 'Lawyer SEO', blurb: 'Compete for high-value keywords in a crowded market, with content and local SEO built for the practice areas that bring in real cases.' },
    { slug: 'seo-ecommerce', icon: '🛍️', title: 'Ecommerce SEO', blurb: 'Scale organic traffic across product and category pages, fix technical issues that silently kill rankings, and turn search visibility into actual orders.' },
    { slug: 'seo-restaurant', icon: '🍽️', title: 'Restaurant SEO', blurb: 'A great menu doesn\'t matter if Google can\'t find it. We fix the local listing, the menu pages, and the review flow that decide whether a hungry searcher picks you.' },
  ]

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
          { label: 'Services', href: '#services' },
          { label: 'Why Us', href: '#why' },
          { label: 'Industries', href: '/industries/restaurant' },
          { label: 'Results', href: '#results' },
          { label: 'FAQs', href: '#faq' },
        ]}
      />
      <main>
        <Hero
          eyebrow={homeData.eyebrow}
          title={homeData.heroTitle}
          titleGrad={homeData.heroTitleGrad}
          titleTrail={homeData.heroTitleTrail}
          subtitle={homeData.heroSub}
          ctaText={homeData.ctaText}
          ctaSecondary={homeData.ctaSecondary}
        />
        <Marquee brands={marqueeBrands} />

        {/* Who We Work With - Split Section */}
        <section className="section">
          <div className="wrap split">
            <motion.div
              className="visual"
              initial={{ opacity: 0, x: -30 }}
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
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow"><span className="dot"></span> Why we exist</span>
              <h2>We only work with businesses that are still <span className="grad">small enough to care about.</span></h2>
              <p className="intro">Big agencies build funnels for enterprise budgets, then squeeze small businesses into the leftover process. We built ours the other way around.</p>
              <div className="bullets stagger-children">
                <div className="bullet">
                  <div className="ico">💰</div>
                  <div>
                    <h4>You don't have $10K/month for ads. Good.</h4>
                    <p>Most of what we do doesn't need it. We build visibility that lasts beyond the invoice.</p>
                  </div>
                </div>
                <div className="bullet">
                  <div className="ico">👥</div>
                  <div>
                    <h4>No in-house marketing team? We become it.</h4>
                    <p>Full-service execution without the overhead salaries that come with hiring.</p>
                  </div>
                </div>
                <div className="bullet">
                  <div className="ico">📊</div>
                  <div>
                    <h4>Plain-English reporting.</h4>
                    <p>Every report answers one question: is this making you more money than it costs?</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Services
          title="Everything a growing business needs to get found — and stay found."
          subtitle="We don't sell a menu of disconnected line items. We build one visibility plan and pull the levers your business actually needs."
          items={homeData.services}
        />

        {/* Industries Section */}
        <section className="section alt" id="industries">
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
                Industries we specialize in
              </span>
              <h2>If you're local and service-driven, <span className="grad">we've got you</span>.</h2>
            </motion.div>
            <motion.div
              className="cards c2"
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
              {homeIndustries.map((ind) => (
                <motion.div
                  key={ind.slug}
                  className="card"
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.22, 0.7, 0.24, 1] },
                    },
                  }}
                  whileHover={{ y: -6 }}
                >
                  <div className="icon">{ind.icon}</div>
                  <h3>{ind.title}</h3>
                  <p>{ind.blurb}</p>
                  <a href={`/industries/${ind.slug}`} className="more">
                    See {ind.title.replace(/\s*SEO.*$/, '')} SEO Services →
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <WhyUs
          title="Built around your size and budget. Nothing else."
          subtitle="We only do this for small businesses. Not a footnote in an enterprise client roster — our process, pricing, and reporting are built for you."
          items={homeData.whyItems}
        />

        <CaseStudies cases={caseStudies} />
        <Testimonials items={testimonials} />
        <FAQ items={faqs} />

        <FinalCTA
          title="Want to get found online, right now?"
          subtitle="Book a free 20-minute call. We'll show you exactly where you're losing visibility and what it would take to fix it — no pressure, no obligation, no generic sales pitch."
          ctaText="Book Your Free 20-Minute Call"
        />
      </main>
      <Footer industries={industries.slice(1)} />
    </motion.div>
  )
}
