# SMB Headless
## Live URL: https://smb-sigma.vercel.app/

A headless WordPress + Next.js marketing platform for **Small Business Marketing** — an SEO agency built for small businesses that refuse to be an afterthought.

The project contains two ways to serve content:

1. **Static SEO landing pages** — Standalone HTML files for each industry (agency home, plumbing, HVAC, restaurant, lawyer, healthcare, ecommerce).
2. **Headless CMS frontend** — A Next.js 14 app with animated React components that pulls content from WordPress via REST API.

## Table of Contents

- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Static HTML Pages](#static-html-pages)
- [Headless Frontend (Next.js)](#headless-frontend-nextjs)
- [WordPress Plugins](#wordpress-plugins)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Customization](#customization)
- [Deployment](#deployment)
- [Security](#security)
- [License](#license)

## Project Structure

```
SMB/
├── README.md                          # This file
├── seo-agency-home.html               # Static HTML — agency landing page
├── seo-plumbing.html                  # Static HTML — plumbing SEO
├── seo-hvac.html                      # Static HTML — HVAC SEO
├── seo-restaurant.html                # Static HTML — restaurant SEO
├── seo-lawyer.html                    # Static HTML — lawyer SEO
├── seo-healthcare.html                # Static HTML — healthcare SEO
├── seo-ecommerce.html                 # Static HTML — ecommerce SEO
└── frontend/
    ├── package.json                   # Next.js package manifest
    ├── next.config.js                 # Next.js configuration
    ├── tailwind.config.js             # Tailwind CSS configuration
    ├── postcss.config.js              # PostCSS configuration
    ├── .env.example                   # Environment variable template
    ├── jsconfig.json                  # Path alias configuration
    ├── README.md                      # Frontend-specific documentation
    ├── src/
    │   ├── app/
    │   │   ├── layout.js              # Root layout with fonts & metadata
    │   │   ├── page.js                # Home page (server-rendered)
    │   │   ├── globals.css            # Global styles & keyframes
    │   │   ├── pricing/
    │   │   │   └── page.js            # Pricing page
    │   │   ├── contact/
    │   │   │   └── page.js            # Contact page (client component)
    │   │   ├── about/
    │   │   │   └── page.js            # About page
    │   │   └── industries/
    │   │       └── [slug]/
    │   │           └── page.js        # Dynamic industry pages
    │   ├── components/
    │   │   ├── TopBar.js              # Announcement bar
    │   │   ├── Header.js              # Sticky navigation
    │   │   ├── Hero.js                # Hero section with gradient title
    │   │   ├── Marquee.js             # Scrolling brand logos
    │   │   ├── Services.js            # Services grid
    │   │   ├── WhyUs.js               # Why choose us section
    │   │   ├── WorkList.js            # Work/step list component
    │   │   ├── CaseStudies.js         # Case studies stack
    │   │   ├── Testimonials.js        # Testimonial cards
    │   │   ├── FAQ.js                 # Accordion FAQ
    │   │   ├── FinalCTA.js            # Final call to action
    │   │   ├── Region.js              # Service area region section
    │   │   ├── Callout.js             # Callout/benefit callouts
    │   │   ├── SplitSection.js        # Split image + text section
    │   │   ├── Steps.js               # Numbered process steps
    │   │   └── Footer.js              # Site footer
    │   ├── lib/
    │   │   └── wp.js                  # WordPress API client
    │   └── data/
    │       └── default-content.js     # Fallback content (used when WP is down)
    └── wordpress-plugin/
        ├── smb-headless.php           # Main plugin: CPTs + REST API
        ├── smb-content-importer.php   # Admin page: import HTML to WP
        ├── import-content.php         # One-time script: bulk import
        └── smb-headless.zip           # Packaged plugin archive
```

## Architecture

```
Standalone HTML Pages (seo-*.html)
  └─ Static files, no build step, CDN-ready

Headless CMS Flow:
┌─────────────────┐     REST API        ┌──────────────────┐
│   WordPress     │ ◄──────────────────► │   Next.js App    │
│   (Backend)     │                      │   (Frontend)     │
│                 │                      │                  │
│ • Custom Posts  │   (wp-json/wp/v2/)  │ • React Pages    │
│ • Custom Fields │                      │ • Framer Motion  │
│ • smb-headless  │                      │ • Tailwind CSS   │
│   plugin        │                      │ • ISR (60s)      │
└─────────────────┘                      └──────────────────┘
```

The Next.js app tries to fetch live content from WordPress on every request. If WordPress is unreachable, it gracefully falls back to the static content defined in `src/data/default-content.js`, so the site always renders.

## Quick Start

### Option A: Use the static HTML pages (no build required)

Simply open any `seo-*.html` file in a browser or serve the directory with any static file server:

```bash
npx serve .
# or
python -m http.server 8000
```

No dependencies, no build step.

### Option B: Run the headless Next.js frontend

See [Headless Frontend (Next.js)](#headless-frontend-nextjs) below.

## Static HTML Pages

Each `seo-*.html` file is a self-contained, production-ready landing page with:

- **Tailwind-style utility classes** inlined as raw CSS (no build step needed)
- **CSS custom properties** for theming (`--brand`, `--gold`, `--ink`, etc.)
- **Responsive design** — mobile-first with `clamp()` for fluid typography
- **SEO-optimized** — semantic HTML, schema-friendly structure, OG tags
- **No external dependencies** — runs without Node.js

| File                  | Industry                  |
|-----------------------|---------------------------|
| `seo-agency-home.html` | Agency home page          |
| `seo-plumbing.html`    | Plumbing SEO              |
| `seo-hvac.html`        | HVAC SEO                  |
| `seo-restaurant.html`  | Restaurant SEO            |
| `seo-lawyer.html`      | Lawyer / legal SEO        |
| `seo-healthcare.html`  | Healthcare / clinic SEO   |
| `seo-ecommerce.html`   | Ecommerce SEO             |

### Customizing static HTML themes

Edit the CSS variables at the top of each file:

```css
:root {
  --brand: #ff0000;          /* Primary brand color */
  --gold: #fdcf58;           /* Accent/gold color */
  --ink: #0e1726;            /* Body text color */
  --body: #54607a;           /* Secondary text */
  --bg: #fff;                /* Page background */
  --soft: #fafafa;           /* Section backgrounds */
  --line: #eee;              /* Borders/dividers */
  --radius: 16px;            /* Border radius */
  --maxw: 1180px;            /* Max content width */
}
```

## Headless Frontend (Next.js)

A Next.js 14 App Router frontend with:

- **Framer Motion** — scroll-triggered animations, staggered reveals, hover micro-interactions
- **Tailwind CSS** — utility-first styling with custom theme
- **Next.js Image** — optimized image loading
- **ISR** — 60-second Incremental Static Regeneration for fresh content
- **Graceful fallback** — static content if WordPress is down

### Prerequisites

- Node.js 18.x or later
- WordPress instance (recommended for dynamic content)

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment variables

Copy the example and point to your WordPress site:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```env
NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
NEXT_PUBLIC_WP_GRAPHQL_URL=https://your-wordpress-site.com/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run the development server

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
cd frontend
npm run build
npm run start
```

### Frontend Routes

| Route                       | Description                          | Type     |
|-----------------------------|--------------------------------------|----------|
| `/`                         | Home page                            | Server   |
| `/industries/[slug]`        | Dynamic industry pages               | Server   |
| `/about`                    | About page                           | Client   |
| `/pricing`                  | Pricing tiers                        | Client   |
| `/contact`                  | Contact form                         | Client   |

### Frontend Customization

See the [frontend README.md](./frontend/README.md) for detailed instructions on:

- Configuring colors and theme variables
- Adding new industries
- Customizing animations
- Modifying components

## WordPress Plugins

Two plugins live in `frontend/wordpress-plugin/`:

### smb-headless.php (Main Plugin)

Registers custom post types and exposes a JSON API for the Next.js frontend.

**Custom Post Types:**

| Post Type    | Slug         | Archive | Supports                         |
|--------------|--------------|---------|----------------------------------|
| Industries   | `industry`   | Yes     | Title, editor, thumbnail, excerpt|
| Services     | `service`    | Yes     | Title, editor, thumbnail         |
| Case Studies | `case_study` | Yes     | Title, editor, thumbnail         |
| Testimonials | `testimonial`| No      | Title, editor, thumbnail         |
| FAQs         | `faq`        | Yes     | Title, editor                    |

**REST API Endpoints:**

| Endpoint                              | Method | Description                          |
|---------------------------------------|--------|--------------------------------------|
| `/wp-json/wp/v2/industry`             | GET    | List all industries                  |
| `/wp-json/wp/v2/industry?slug=...`    | GET    | Get industry by slug                 |
| `/wp-json/wp/v2/service`              | GET    | List all services                    |
| `/wp-json/wp/v2/case_study`           | GET    | List all case studies                |
| `/wp-json/wp/v2/testimonial`          | GET    | List all testimonials                |
| `/wp-json/wp/v2/faq`                  | GET    | List all FAQs                        |
| `/wp-json/smb/v1/content`             | GET    | Single payload with all content      |
| `/wp-json/smb/v1/industry/{slug}`     | GET    | Get single industry by slug          |

**Installation:**

1. Upload `smb-headless.php` to `/wp-content/plugins/`
2. Activate the plugin in WordPress admin
3. Go to **Settings > SMB Headless** to configure:
   - Frontend URL (points to your Next.js app)
   - Optional API key for security

### smb-content-importer.php (Optional)

Adds an import utility under **Tools > Import HTML Content** that converts the static HTML files into WordPress posts. Useful for migrating from static to headless.

### import-content.php (One-Time Script)

A standalone script placed in the WordPress root for bulk one-time imports. **Delete after use.**

## Available Scripts

### Next.js Frontend (`frontend/`)

```bash
npm run dev      # Start development server on port 3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint (Next.js built-in)
```

## Environment Variables

| Variable                     | Required | Default                                    | Description                         |
|------------------------------|----------|--------------------------------------------|-------------------------------------|
| `NEXT_PUBLIC_WP_API_URL`     | No       | `http://localhost/wordpress/wp-json/wp/v2` | WordPress REST API base URL         |
| `NEXT_PUBLIC_WP_GRAPHQL_URL` | No       | `http://localhost/wordpress/graphql`       | WordPress GraphQL URL (if WPGraphQL)|
| `NEXT_PUBLIC_SITE_URL`       | No       | `http://localhost:3000`                    | Frontend site URL for SEO/metadata  |

If WordPress environment variables are not set, the app runs with static fallback content.

## Customization

### Updating the theme

Colors are defined as Tailwind config entries in `tailwind.config.js` and CSS variables in `globals.css`. The static HTML pages use matching CSS custom properties.

**Brand palette:**

| Variable  | Default  | Use             |
|-----------|----------|-----------------|
| `--brand` | `#ff0000`| Primary color   |
| `--gold`  | `#fdcf58`| Accent color     |
| `--ink`   | `#0e1726`| Headings text    |
| `--body`  | `#54607a`| Body text        |
| `--soft`  | `#fafafa`| Light backgrounds|

### Adding a new industry

**In the Next.js app:**

1. Add a new entry to the `industries` array in `src/data/default-content.js`
2. Create corresponding content in WordPress under the `Industry` post type
3. The dynamic route `/industries/[slug]` will automatically render it

**In the static HTML:**

1. Copy an existing `seo-*.html` file
2. Rename it (e.g., `seo-newservice.html`)
3. Update the `<title>`, `<meta description>`, and on-page content
4. Update the CSS variables if needed

## Deployment

### Vercel (Recommended for the Next.js frontend)

1. Push the `frontend/` directory to GitHub
2. Import the project in Vercel
3. Set the root directory to `frontend/`
4. Add environment variables
5. Deploy

### Static HTML pages

Upload the `seo-*.html` files directly to any static hosting provider (Netlify, Cloudflare Pages, S3, etc.).

## Security

- The WordPress REST API exposes content publicly — use the optional API key in `smb-headless.php` settings for private content
- Always use HTTPS for API communication in production
- Delete `import-content.php` from your WordPress root after running the bulk import
- Consider adding rate limiting for production API endpoints

## License

© 2026 Small Business Marketing. All rights reserved.

---

**Need help?** See the [frontend README](./frontend/README.md) for app-specific documentation, or contact the Small Business Marketing team.
