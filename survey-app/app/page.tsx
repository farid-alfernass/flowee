import { redirect } from 'next/navigation'

// Root / redirects to the static landing page served from public/
export default function RootPage() {
  redirect('/landing.html')
}
