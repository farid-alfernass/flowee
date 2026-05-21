# Project Structure

## Directory Layout

```
flower/
├── .kiro/
│   └── steering/          # AI assistant guidance documents
├── .vscode/
│   └── settings.json      # VS Code workspace settings
├── index.html             # Main landing page (single file application)
└── vercel.json            # Vercel deployment configuration
```

## File Organization

### Single-File Architecture

This project uses a **monolithic single-file approach** where all HTML, CSS, and JavaScript are contained in `index.html`. This simplifies deployment and eliminates build complexity.

**index.html** contains:
- HTML markup (semantic structure)
- `<style>` block with all CSS (embedded in `<head>`)
- `<script>` block with all JavaScript (at end of `<body>`)

## Page Structure

The landing page follows a standard marketing site layout:

1. **Navbar** - Sticky header with logo, navigation links, CTA button, and mobile hamburger menu
2. **Hero Section** - Main headline, value proposition, CTA buttons, and decorative SVG
3. **Feature Pills** - Horizontal badge strip highlighting key benefits
4. **Products Section** - 3-column grid (6 products) with emoji icons and pricing
5. **How to Order** - 3-step process with numbered cards
6. **Testimonials** - 3-column grid with customer reviews
7. **FAQ Section** - Accordion-style expandable questions
8. **Footer** - Brand info, contact details, and WhatsApp CTA
9. **Floating WhatsApp Button** - Fixed position bottom-right

## Content Sections

Each major section follows this pattern:
- Container wrapper (`.container` - max-width constraint)
- Section header (`.section-header` - title, subtitle, tagline)
- Content grid or layout (products, testimonials, steps, etc.)
- Fade-in animations (`.fade-in` class with Intersection Observer)

## CSS Organization

Styles are organized in this order within the `<style>` block:

1. CSS custom properties (`:root` variables)
2. Reset and base styles
3. Utility classes (`.container`, typography classes)
4. Animation keyframes
5. Component styles (navbar, hero, buttons, cards, etc.)
6. Section-specific styles
7. Responsive media queries (at the end)

## JavaScript Organization

Scripts are organized functionally:

1. Mobile navigation toggle
2. FAQ accordion functionality
3. Intersection Observer setup for animations
4. Stagger delay configuration for grid items
5. Smooth scroll behavior for anchor links

## Naming Conventions

### CSS Classes
- **BEM-inspired** but simplified: `.component-element-modifier`
- **Utility classes**: `.btn`, `.container`, `.fade-in`
- **Component classes**: `.navbar`, `.hero`, `.product-card`, `.testi-card`
- **State classes**: `.open`, `.visible`

### CSS Variables
- Semantic naming: `--primary`, `--secondary`, `--on-surface`
- Descriptive: `--max-w`, `--section-gap`, `--bg`

### IDs
- Used sparingly for JavaScript targets: `#hamburger`, `#mobileNav`
- Used for anchor navigation: `#produk`, `#keunggulan`, `#cara-pesan`

## Responsive Breakpoints

- **Desktop**: Default (1280px max-width container)
- **Tablet**: `@media (max-width: 1024px)` - 2-column grids
- **Mobile**: `@media (max-width: 768px)` - Single column, hamburger menu

## External Dependencies

All external resources are loaded via CDN:
- Google Fonts (3 font families)
- Material Icons (icon font)

No package.json or node_modules - this is a zero-dependency project.
