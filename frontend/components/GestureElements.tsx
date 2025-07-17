// NOTE: This file is for frontend gesture UI elements, not backend gesture recognition logic.
"use client" // Mark as client component to use the hook

import Image from "next/image"
import { HandIcon, MousePointerClickIcon, ScrollTextIcon, Volume2Icon, ZoomInIcon } from "lucide-react"
import { useInViewAnimation } from "@/hooks/useInViewAnimation" // Import the hook

const gestures = [
  {
    name: "Cursor Movement",
    description: "Control your pointer with subtle hand shifts.",
    image: "/placeholder.svg?height=150&width=150",
    icon: MousePointerClickIcon,
  },
  {
    name: "Click Gesture",
    description: "Perform clicks by bringing your index finger and thumb together.",
    image: "/placeholder.svg?height=150&width=150",
    icon: HandIcon,
  },
  {
    name: "Scroll Up/Down",
    description: "Navigate content by moving your thumb up or down.",
    image: "/placeholder.svg?height=150&width=150",
    icon: ScrollTextIcon,
  },
  {
    name: "Volume Control",
    description: "Adjust audio levels with specific finger configurations.",
    image: "/placeholder.svg?height=150&width=150",
    icon: Volume2Icon,
  },
  {
    name: "Zoom In/Out",
    description: "Magnify or shrink views with intuitive hand gestures.",
    image: "/placeholder.svg?height=150&width=150",
    icon: ZoomInIcon,
  },
  {
    name: "Slide Navigation",
    description: "Advance or rewind presentations with a simple swipe.",
    image: "/placeholder.svg?height=150&width=150",
    icon: HandIcon, // Reusing HandIcon for general gesture
  },
]

export default function GestureElements() {
  const { ref, className } = useInViewAnimation({ delay: 0 }) // Add a slight delay for sequential animation

  return (
    <section
      id="gestures"
      ref={ref} // Attach ref to the section
      className={`relative z-10 py-20 px-4 text-white dark:text-white light:text-gray-800 ${className}`}
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 dark:text-white light:text-gray-800">
          <span className="bg-gradient-to-r from-neon-blue to-neon-pink text-transparent bg-clip-text light:from-peach-500 light:to-peach-400">
            Intuitive
          </span>{" "}
          Gestures
        </h2>
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12 dark:text-gray-300 light:text-gray-700">
          GestureGuy translates natural hand movements into powerful commands. Here are some of the core gestures you'll
          master:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gestures.map((gesture, index) => (
            <div
              key={index}
              className="bg-gray-800 dark:bg-gray-800 light:bg-white/60 p-6 rounded-lg shadow-xl border border-gray-700 dark:border-gray-700 light:border-gray-200 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 light:hover:border-peach-500" // Added hover animation
            >
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={gesture.image || "/placeholder.svg"}
                  alt={gesture.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg border border-gray-600 dark:border-gray-600 light:border-gray-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg light:bg-white/40">
                  <gesture.icon className="h-12 w-12 text-neon-purple opacity-80 light:text-peach-500" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white dark:text-white light:text-gray-800 mb-2">
                {gesture.name}
              </h3>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700">{gesture.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
