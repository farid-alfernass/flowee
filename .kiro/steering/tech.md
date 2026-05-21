# Technology Stack

## Architecture

**Single-page static website** - Pure HTML/CSS/JavaScript with no build process or dependencies.

## Tech Stack

- **HTML5** - Semantic markup with Indonesian language (`lang="id"`)
- **CSS3** - Embedded styles using CSS custom properties (variables)
- **Vanilla JavaScript** - No frameworks or libraries
- **Deployment**: Vercel static hosting

## External Resources

- **Google Fonts**: Playfair Display, DM Sans, Cormorant Garamond
- **Material Icons**: Google's icon font for UI elements
- **No external JavaScript libraries** - All functionality is vanilla JS

## Key Technologies & Patterns

### CSS Architecture
- **CSS Custom Properties** for theming (defined in `:root`)
- **CSS Grid** for layouts (products, testimonials, steps)
- **Flexbox** for component alignment
- **Mobile-first responsive design** with media queries
- **Intersection Observer API** for scroll animations

### Design System
- Color palette defined as CSS variables (`--primary`, `--secondary`, etc.)
- Typography scale with clamp() for fluid sizing
- Consistent spacing using `--section-gap` and `--max-w` variables
- Reusable button classes (`.btn`, `.btn-primary`, `.btn-secondary`)

### JavaScript Features
- Mobile navigation toggle
- FAQ accordion functionality
- Scroll-triggered fade-in animations with stagger delays
- Smooth scroll for anchor links
- No external dependencies

## Deployment Configuration

**Vercel** (`vercel.json`):
- Static build using `@vercel/static`
- Single HTML file deployment
- Simple routing configuration

## Common Commands

Since this is a static site with no build process:

```bash
# No installation needed - just open the file
open index.html

# Or serve locally with any static server
python -m http.server 8000
# or
npx serve .
```

## Development Guidelines

- Keep everything in a single HTML file for simplicity
- Use inline styles (no separate CSS file)
- Use inline scripts (no separate JS file)
- Maintain vanilla JavaScript - avoid adding dependencies
- Test responsiveness at breakpoints: 768px (mobile) and 1024px (tablet)
