'use client'

import { useState, useRef, useCallback } from 'react'
import { Package } from 'lucide-react'

interface ImageCarouselProps {
  images: string[]
  alt: string
  aspectRatio?: 'square' | 'video'
}

export function ImageCarousel({ images, alt, aspectRatio = 'square' }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0]?.clientX ?? 0
  }, [])

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50

    if (diff > threshold && currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else if (diff < -threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }, [currentIndex, images.length])

  if (images.length === 0) {
    return (
      <div className={`relative w-full bg-muted flex items-center justify-center ${aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'}`}>
        <Package className="h-12 w-12 text-muted-foreground/50" />
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className={`relative w-full ${aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={src}
              alt={`${alt} ${index + 1}`}
              className="h-full w-full shrink-0 object-cover"
            />
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-4'
                  : 'bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
          {currentIndex + 1}/{images.length}
        </div>
      )}
    </div>
  )
}
