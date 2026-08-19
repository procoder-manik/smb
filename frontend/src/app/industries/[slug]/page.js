import IndustryPageClient from '@/components/IndustryPageClient'
import { notFound } from 'next/navigation'
import { industries as staticIndustries, caseStudies as staticCaseStudies, testimonials as staticTestimonials, faqs as staticFaqs } from '@/data/default-content'
import { getIndustryBySlug, getCaseStudies, getTestimonials, getFaqs, getAllContent } from '@/lib/wp'

export const revalidate = 60

async function getIndustryData(slug) {
  try {
    const data = await getAllContent()
    if (data && data.industries && data.industries.length > 0) {
      const industry = data.industries.find(i => i.slug === slug)
      if (industry) {
        return {
          industry,
          caseStudies: data.caseStudies || staticCaseStudies,
          testimonials: data.testimonials || staticTestimonials,
          faqs: data.faqs || staticFaqs,
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch industry from WordPress, using fallback:', error)
  }

  const staticIndustry = staticIndustries.find(i => i.slug === slug) || staticIndustries[0]
  return {
    industry: staticIndustry,
    caseStudies: staticCaseStudies,
    testimonials: staticTestimonials,
    faqs: staticFaqs,
  }
}

export default async function IndustryPage({ params }) {
  const { slug } = params
  const { industry, caseStudies, testimonials, faqs } = await getIndustryData(slug)
  const isHome = industry.id === 'home'

  if (!industry) {
    notFound()
  }

  return (
    <IndustryPageClient
      industry={industry}
      caseStudies={caseStudies}
      testimonials={testimonials}
      faqs={faqs}
      staticIndustries={staticIndustries}
      isHome={isHome}
    />
  )
}
