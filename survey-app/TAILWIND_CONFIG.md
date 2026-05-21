# Tailwind CSS Configuration - Flowee Survey App

## Overview

This project uses **Tailwind CSS v4** with a mobile-first approach optimized for the Flowee Survey App. The configuration is done directly in the CSS file using the new `@theme` directive instead of a separate config file.

## Configuration Files

### 1. `app/globals.css`

Main Tailwind configuration file containing:

- Theme colors and design tokens
- Custom utilities
- Mobile-first responsive utilities
- Flowee brand colors

### 2. `postcss.config.mjs`

PostCSS configuration for Tailwind CSS v4:

```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### 3. `components.json`

shadcn/ui configuration pointing to the CSS file.

## Design System

### Brand Colors

```css
--color-flowee-green: #173901; /* Primary brand color */
--color-flowee-gold: #885202; /* Secondary brand color */
--color-flowee-cream: #fdf9f3; /* Background accent */
```

### Theme Colors

The app supports both light and dark themes with colors optimized for the Flowee brand:

**Light Theme:**

- Background: Cream (`oklch(0.99 0.005 85)`)
- Foreground: Dark green (`oklch(0.2 0.02 140)`)
- Primary: Flowee green (`oklch(0.25 0.08 140)`)
- Secondary: Flowee gold (`oklch(0.4 0.12 50)`)

**Dark Theme:**

- Background: Dark green (`oklch(0.15 0.02 140)`)
- Foreground: Cream (`oklch(0.99 0.005 85)`)
- Primary: Lighter green (`oklch(0.35 0.1 140)`)
- Secondary: Lighter gold (`oklch(0.5 0.14 50)`)

### Responsive Breakpoints

Tailwind v4 default breakpoints (mobile-first):

```css
/* Default (mobile): 0px - 639px - PRIMARY TARGET */
sm: 640px   /* Small devices (phones) */
md: 768px   /* Medium devices (tablets) */
lg: 1024px  /* Large devices (desktop) */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

**Custom breakpoint:**

```css
--breakpoint-xs: 375px /* Extra small phones */;
```

### Border Radius

```css
--radius-sm: calc(var(--radius) * 0.6) /* 0.45rem */
  --radius-md: calc(var(--radius) * 0.8) /* 0.6rem */ --radius-lg: var(--radius)
  /* 0.75rem */ --radius-xl: calc(var(--radius) * 1.4) /* 1.05rem */
  --radius-2xl: calc(var(--radius) * 1.8) /* 1.35rem */
  --radius-3xl: calc(var(--radius) * 2.2) /* 1.65rem */
  --radius-4xl: calc(var(--radius) * 2.6) /* 1.95rem */;
```

### Mobile-First Spacing

```css
--spacing-touch-target: 44px; /* Minimum touch target size */
--spacing-mobile-padding: 1rem; /* Standard mobile padding */
--spacing-mobile-gap: 0.75rem; /* Standard mobile gap */
```

## Custom Utilities

### Touch-Friendly Utilities

```css
.touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

**Usage:**

```jsx
<button className="touch-target">Click me</button>
```

### Mobile Padding & Gap

```css
.mobile-padding {
  padding: var(--spacing-mobile-padding);
}

.mobile-gap {
  gap: var(--spacing-mobile-gap);
}
```

**Usage:**

```jsx
<div className="mobile-padding">Content</div>
<div className="flex mobile-gap">Items</div>
```

### Safe Area Insets

For devices with notches or rounded corners:

```css
.safe-area-inset-top
.safe-area-inset-bottom
.safe-area-inset-left
.safe-area-inset-right
```

**Usage:**

```jsx
<nav className="safe-area-inset-top">Navigation</nav>
<footer className="safe-area-inset-bottom">Footer</footer>
```

### Touch Interaction Utilities

```css
.no-select {
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
```

**Usage:**

```jsx
<button className="no-select">Button</button>
```

### Smooth Scrolling

```css
.smooth-scroll {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}
```

**Usage:**

```jsx
<div className="smooth-scroll overflow-y-auto">Scrollable content</div>
```

### Hide Scrollbar

```css
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

**Usage:**

```jsx
<div className="hide-scrollbar overflow-x-auto">Horizontal scroll</div>
```

## Mobile-First Development

### Approach

1. **Design for mobile first** (320px - 640px)
2. **Enhance for larger screens** using responsive modifiers

### Example

```jsx
// Mobile-first approach
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">Title</h1>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {/* Content */}
  </div>
</div>
```

### Touch Targets

All interactive elements should meet the minimum touch target size:

```jsx
// ✅ Good - meets 44px minimum
<button className="h-11 px-4">Button</button>
<button className="touch-target px-4">Button</button>

// ❌ Bad - too small for touch
<button className="h-6 px-2">Button</button>
```

## Common Patterns

### Card Component

```jsx
<div className="bg-card text-card-foreground mobile-padding rounded-lg border p-4">
  <h3 className="text-lg font-semibold">Card Title</h3>
  <p className="text-muted-foreground">Card content</p>
</div>
```

### Form Input

```jsx
<input
  type="text"
  className="border-input bg-background touch-target h-11 w-full rounded-md border px-3 py-2 text-base"
/>
```

### Bottom Navigation (Mobile)

```jsx
<nav className="bg-background safe-area-inset-bottom fixed right-0 bottom-0 left-0 border-t">
  <div className="flex justify-around py-2">
    <button className="touch-target flex flex-col items-center">
      <Icon />
      <span className="text-xs">Home</span>
    </button>
    {/* More nav items */}
  </div>
</nav>
```

### Grid Layout (Responsive)

```jsx
// 1 column on mobile, 2 on tablet, 3 on desktop
<div className="mobile-gap grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

## Performance Optimization

### Image Optimization

Always use Next.js Image component with Tailwind classes:

```jsx
import Image from 'next/image'
;<Image
  src="/photo.jpg"
  alt="Description"
  width={300}
  height={300}
  className="rounded-lg object-cover"
  loading="lazy"
/>
```

### Lazy Loading

Use Tailwind's responsive utilities to conditionally render:

```jsx
// Hide on mobile, show on desktop
<div className="hidden lg:block">Desktop only content</div>

// Show on mobile, hide on desktop
<div className="block lg:hidden">Mobile only content</div>
```

## Dark Mode

Dark mode is supported via the `.dark` class on the root element:

```jsx
// Toggle dark mode
<button onClick={() => document.documentElement.classList.toggle('dark')}>
  Toggle Dark Mode
</button>
```

## Testing Responsive Design

### Browser DevTools

1. Open Chrome DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Test these viewports:
   - iPhone SE (375x667) - Primary target
   - iPhone 12 Pro (390x844)
   - Pixel 5 (393x851)
   - iPad (768x1024)
   - Desktop (1280x720)

### Lighthouse Audit

Run Lighthouse audit for mobile:

```bash
npm run build
npm run start
# Open Chrome DevTools > Lighthouse > Mobile > Generate report
```

## Troubleshooting

### Styles not applying

1. Check if Tailwind classes are correct
2. Verify `globals.css` is imported in `app/layout.tsx`
3. Clear Next.js cache: `rm -rf .next`
4. Rebuild: `npm run build`

### Custom utilities not working

1. Verify utilities are defined in `@layer utilities` in `globals.css`
2. Check for typos in class names
3. Restart dev server

### Dark mode not working

1. Verify `.dark` class is on `<html>` element
2. Check dark mode colors are defined in `:root .dark` selector
3. Use browser DevTools to inspect computed styles

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Mobile Web Best Practices](https://web.dev/mobile/)

## Migration Notes

This project uses **Tailwind CSS v4**, which has breaking changes from v3:

1. **No `tailwind.config.js`** - Configuration is in CSS using `@theme`
2. **New PostCSS plugin** - `@tailwindcss/postcss` instead of `tailwindcss`
3. **CSS-first configuration** - Design tokens defined in CSS variables
4. **Improved performance** - Faster builds and smaller bundle sizes

If you need to add custom configuration, add it to the `@theme inline` block in `app/globals.css`.
