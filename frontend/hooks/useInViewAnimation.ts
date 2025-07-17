"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewAnimationOptions {
  threshold?: number // Percentage of element visibility to trigger
  rootMargin?: string // Margin around the root element
  delay?: number // Delay before adding the animation class
}

export function useInViewAnimation(options?: UseInViewAnimationOptions) {
  const { threshold = 0.1, rootMargin = "0px", delay = 0 } = options || {}
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only set true once, when it becomes intersecting and hasn't been in view yet
        if (entry.isIntersecting && !isInView) {
          if (delay > 0) {
            setTimeout(() => setIsInView(true), delay)
          } else {
            setIsInView(true)
          }
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, delay]) // Removed 'isInView' from dependencies

  return { ref, className: isInView ? "animate-fade-in-up" : "opacity-0" }
}
