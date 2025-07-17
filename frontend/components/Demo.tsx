"use client" // Mark as client component to use the hook

import { PlayCircleIcon } from "lucide-react"
import Image from "next/image"
import { useInViewAnimation } from "@/hooks/useInViewAnimation" // Import the hook

export default function Demo() {
  const { ref, className } = useInViewAnimation({ delay: 100 }) // Add a slight delay for sequential animation

  return (
    <section
      id="demo"
      ref={ref} // Attach ref to the section
      className={`relative z-10 py-20 px-4 bg-black/40 text-white dark:bg-black/40 light:bg-white/60 ${className}`} // Adjusted opacity
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 dark:text-white light:text-gray-800">
          <span className="bg-gradient-to-r from-neon-blue to-neon-pink text-transparent bg-clip-text light:from-peach-500 light:to-peach-400">
            See It
          </span>{" "}
          In Action
        </h2>

        <div className="relative w-full aspect-video bg-gray-800 dark:bg-gray-800 light:bg-white/80 rounded-lg overflow-hidden shadow-2xl mb-16">
          {/* Placeholder for video/animation */}
          <Image
            src="/placeholder.svg?height=720&width=1280"
            alt="GestureGuy Demo Video Placeholder"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircleIcon className="h-24 w-24 text-neon-purple opacity-80 hover:opacity-100 transition-opacity cursor-pointer light:text-peach-500" />
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">
            (Demo video coming soon!)
          </p>
        </div>

        <h3 className="text-3xl font-bold text-center mb-10 dark:text-white light:text-gray-800">
          <span className="bg-gradient-to-r from-neon-pink to-neon-purple text-transparent bg-clip-text light:from-peach-400 light:to-peach-500">
            Meet
          </span>{" "}
          the Innovators
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Alex 'The Architect' Chen",
              bio: "Visionary behind GestureGuy's core algorithms.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Maya 'The Maestro' Singh",
              bio: "Lead designer, ensuring intuitive user experiences.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Ben 'The Brain' Carter",
              bio: "Specialist in smartwatch sensor integration.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Chloe 'The Connector' Davis",
              bio: "IoT and cross-platform compatibility expert.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
          ].map((person, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-800 dark:bg-gray-800 light:bg-white p-6 rounded-lg shadow-lg border border-gray-700 dark:border-gray-700 light:border-gray-200 transition-all duration-300 transform hover:scale-105" // Added hover animation
            >
              <Image
                src={person.avatar || "/placeholder.svg"}
                alt={person.name}
                width={100}
                height={100}
                className="rounded-full mb-4 border-2 border-neon-blue light:border-peach-500"
              />
              <h4 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-2">
                {person.name}
              </h4>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 text-sm">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
