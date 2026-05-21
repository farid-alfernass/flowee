# Components

This folder contains all React components organized by feature and purpose.

## Structure

- `ui/` - shadcn/ui components (button, input, card, dialog, etc.)
- `forms/` - Reusable form components
  - `rekanan-form.tsx` - Form for add/edit rekanan
  - `sku-form.tsx` - Form for add/edit SKU
  - `image-upload.tsx` - Image upload with preview
- `layout/` - Layout components
  - `navbar.tsx` - Top navigation
  - `bottom-nav.tsx` - Mobile bottom navigation
  - `sidebar.tsx` - Desktop sidebar (optional)
- `dashboard/` - Dashboard-specific components
  - `stats-card.tsx` - Metric card component
  - `chart-survey.tsx` - Survey per day chart
  - `recent-activity.tsx` - Activity feed
- `rekanan/` - Rekanan-specific components
  - `rekanan-card.tsx` - Card for list view
  - `rekanan-detail.tsx` - Detail view component
  - `rekanan-filters.tsx` - Filter controls
- `sku/` - Product-specific components
  - `sku-card.tsx` - Product card
  - `sku-grid.tsx` - Product grid
  - `sku-lightbox.tsx` - Image lightbox

## Component Guidelines

- Use TypeScript for all components
- Follow mobile-first responsive design
- Use Tailwind CSS for styling
- Implement proper accessibility (ARIA labels, keyboard navigation)
- Keep components small and focused on single responsibility
