"use client"
import SignUpForm from "@/components/SignUpForm"
import StarBackground from "@/components/StarBackground" // Re-import StarBackground
import { useInViewAnimation } from "@/hooks/useInViewAnimation"

export default function SignUpPage() {
  const { ref, className } = useInViewAnimation({ delay: 100 }) // Add a slight delay for sequential animation

  return (
    <div className="relative min-h-screen text-white dark:bg-gray-950 light:bg-peach-50">
      <StarBackground fallSpeed={0.08} /> {/* Re-add StarBackground */}
      <div
        ref={ref} // Attach ref to the main content div
        className={`relative z-10 bg-black/40 dark:bg-black/40 light:bg-white/60 min-h-screen flex items-center justify-center ${className}`}
      >
        <SignUpForm />
      </div>
    </div>
  )
}
