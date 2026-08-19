# SMB Headless — Next.js + WordPress

A modern, animated headless WordPress frontend built with Next.js 14, React, Framer Motion, and Tailwind CSS.

## 🏗️ Architecture

```
┌─────────────────┐     REST API / GraphQL      ┌──────────────────┐
│   WordPress     │ ◄──────────────────────────► │   Next.js App    │
│   (Backend)     │                               │   (Frontend)     │
│                 │                               │                  │
│ • Custom Posts  │                               │ • React Pages    │
│ • REST API      │                               │ • Animations     │
│ • smb-headless  │                               │ • Tailwind CSS   │
│   plugin        │                               │                  │
└─────────────────┘                               └──────────────────┘
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout with fonts
│   │   ├── page.js            # Home page
│   │   ├── globals.css        # Global styles + animations
│   │   └── industries/
│   │       └── [slug]/
│   │           └── page.js    # Dynamic industry pages
│   ├── components/
│   │   ├── TopBar.js          # Announcement bar
│   │   ├── Header.js          # Sticky navigation
│   │   ├── Hero.js            # Hero section
│   │   ├── Marquee.js         # Scrolling brands
│   │   ├── Services.js        # Services grid
│   │   ├── WhyUs.js           # Why choose us
│   │   ├── CaseStudies.js     # Case studies stack
│   │   ├── Testimonials.js    # Testimonial cards
│   │   ├── FAQ.js             # Accordion FAQ
│   │   ├── FinalCTA.js        # Final call to action
│   │   └── Footer.js          # Site footer
│   ├── lib/
│   │   └── wp.js              # WordPress API client
│   └── data/
│       └── default-content.js # Fallback content
├── wordpress-plugin/
│   └── smb-headless.php       # WordPress plugin
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.local
```

## 🚀 Setup Instructions

### 1. WordPress Setup

1. Upload the `smb-headless.php` plugin to your WordPress site:
   - Go to `Plugins > Add New > Upload Plugin`
   - Upload `wordpress-plugin/smb-headless.php`
   - Activate the plugin

2. Go to `Settings > SMB Headless` in WordPress admin:
   - Set your Next.js frontend URL
   - (Optional) Set an API key for security

3. Create content in WordPress:
   - **Industries**: Create posts under `Industries` CPT
   - **Services**: Create posts under `Services` CPT
   - **Case Studies**: Create posts under `Case Studies` CPT
   - **Testimonials**: Create posts under `Testimonials` CPT
   - **FAQs**: Create posts under `FAQs` CPT

### 2. Next.js Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Configure environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
   NEXT_PUBLIC_WP_GRAPHQL_URL=https://your-wordpress-site.com/graphql
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   npm run start
   ```

## 🎨 Features

### Animations
- **Scroll-triggered reveals**: Elements animate in as you scroll
- **Staggered animations**: Cards and grid items animate in sequence
- **Hover micro-interactions**: Cards lift, icons rotate, buttons shimmer
- **Animated counters**: Metrics count up when visible
- **Smooth page transitions**: Fade transitions between pages
- **Hero entrance**: Staggered entrance for hero elements
- **Marquee pause**: Brand marquee pauses on hover

### WordPress Integration
- **REST API**: Fetches content from WordPress
- **Fallback content**: Works with static data if WordPress is unavailable
- **Custom Post Types**: Industry, Service, Case Study, Testimonial, FAQ
- **CORS Support**: Headless-ready with proper CORS headers
- **ISR Support**: Incremental Static Regeneration for fresh content

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints at 640px, 960px
- Collapsible navigation
- Stacked layouts on mobile

## 🎯 SEO Features

- Dynamic metadata per page
- Open Graph tags
- Semantic HTML
- Structured content
- Fast page loads with Next.js optimization

## 🔧 Customization

### Colors
Edit CSS variables in `globals.css`:
```css
:root {
  --brand: #ff0000;
  --gold: #fdcf58;
  --ink: #0e1726;
  /* ... */
}
```

### Adding New Industries
1. Add content to `src/data/default-content.js`
2. Create corresponding WordPress posts
3. The dynamic route `/industries/[slug]` will automatically render them

## 📦 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Netlify
1. Push code to GitHub
2. Import project in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Set environment variables

### Self-Hosted
```bash
npm run build
npm run start
```

## 🔐 Security Notes

- The WordPress plugin exposes content publicly via REST API
- For private content, add authentication headers
- Consider rate limiting for production
- Use HTTPS for all API communication

## 📄 License

© 2026 smallbusinessmarketing.co. All rights reserved.
