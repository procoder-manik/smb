const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost/wordpress/wp-json/wp/v2'
const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'http://localhost/wordpress/graphql'

export async function getPosts(postType = 'posts', perPage = 100) {
  try {
    const res = await fetch(
      `${WP_API_URL}/${postType}?per_page=${perPage}&_embed=true`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) throw new Error('Failed to fetch posts')
    return await res.json()
  } catch (error) {
    console.error(`Error fetching ${postType}:`, error)
    return []
  }
}

export async function getPostBySlug(postType, slug) {
  try {
    const res = await fetch(
      `${WP_API_URL}/${postType}?slug=${slug}&_embed=true`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) throw new Error('Failed to fetch post')
    const posts = await res.json()
    return posts[0] || null
  } catch (error) {
    console.error(`Error fetching ${postType} by slug:`, error)
    return null
  }
}

export async function getCustomPostType(type) {
  return getPosts(type)
}

export async function getMenus() {
  try {
    const res = await fetch(
      `${WP_API_URL}/menus/v1/menus`,
      { next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function getAllContent() {
  try {
    const [industries, services, caseStudies, testimonials, faqs] = await Promise.all([
      getPosts('industry'),
      getPosts('service'),
      getPosts('case_study'),
      getPosts('testimonial'),
      getPosts('faq'),
    ])

    return {
      industries: transformPosts(industries),
      services: transformPosts(services),
      caseStudies: transformPosts(caseStudies),
      testimonials: transformPosts(testimonials),
      faqs: transformPosts(faqs),
    }
  } catch (error) {
    console.error('Error fetching all content:', error)
    return null
  }
}

export async function getIndustryBySlug(slug) {
  const post = await getPostBySlug('industry', slug)
  return post ? transformPost(post) : null
}

export async function getServices() {
  const posts = await getPosts('service')
  return transformPosts(posts)
}

export async function getCaseStudies() {
  const posts = await getPosts('case_study')
  return transformPosts(posts)
}

export async function getTestimonials() {
  const posts = await getPosts('testimonial')
  return transformPosts(posts)
}

export async function getFaqs() {
  const posts = await getPosts('faq')
  return transformPosts(posts)
}

function transformPosts(posts) {
  return posts.map(transformPost)
}

function transformPost(post) {
  return {
    id: post.id,
    title: post.title?.rendered || '',
    slug: post.slug || '',
    content: post.content?.rendered || '',
    excerpt: post.excerpt?.rendered || '',
    featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    date: post.date || '',
    link: post.link || '',
  }
}

export function wpApiUrl() {
  return WP_API_URL
}

export function wpGraphqlUrl() {
  return WP_GRAPHQL_URL
}
