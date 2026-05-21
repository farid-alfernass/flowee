import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { RekananListContent } from './list-content'

export default function RekananListPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-9 w-20" />
          </div>
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      }
    >
      <RekananListContent />
    </Suspense>
  )
}
