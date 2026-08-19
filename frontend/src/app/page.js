

import PageClient from '@/components/PageClient'
import { getAllContent } from '@/lib/wp'
import { industries as staticIndustries, caseStudies as staticCaseStudies, testimonials as staticTestimonials, faqs as staticFaqs, marqueeBrands as staticMarqueeBrands } from '@/data/default-content'

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

  return <PageClient homeData={homeData} marqueeBrands={marqueeBrands} caseStudies={caseStudies} testimonials={testimonials} faqs={faqs} industries={industries} />
}
