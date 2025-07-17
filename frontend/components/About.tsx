"use client" // Mark as client component to use the hook

import { HandMetalIcon, WatchIcon, BrainCircuitIcon } from "lucide-react"
import { useInViewAnimation } from "@/hooks/useInViewAnimation" // Import the hook

export default function About() {
  const { ref, className } = useInViewAnimation({ delay: 100 }) // Add a slight delay for sequential animation

  return (
    <section
      id="about"
      ref={ref} // Attach ref to the section
      className={`relative z-10 py-20 px-4 bg-black/40 text-white dark:bg-black/40 light:bg-white/60 ${className}`} // Adjusted opacity
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 dark:text-white light:text-gray-800">
          <span className="bg-gradient-to-r from-neon-blue to-neon-pink text-transparent bg-clip-text light:from-peach-500 light:to-peach-400">
            About
          </span>{" "}
          GestureGuy
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-300 dark:text-gray-300 light:text-gray-700">
              GestureGuy is a groundbreaking software interface designed to redefine how you interact with your digital
              world. Imagine controlling your computer, smart home devices, or even industrial machinery with just the
              flick of your wrist or the clench of your fist. This is the future of intuitive control, and it's here
              with GestureGuy.
            </p>
            <p className="text-lg leading-relaxed text-gray-300 dark:text-gray-300 light:text-gray-700">
              At its core, GestureGuy leverages advanced algorithms to interpret human hand movements. Our innovative
              approach focuses on **smartwatch sensor detection**, utilizing the precise motion data from your wearable
              device. This eliminates the need for bulky external cameras or specialized hardware, making the experience
              seamless and truly portable.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <WatchIcon className="h-8 w-8 text-neon-purple flex-shrink-0 light:text-peach-500" />
              <div>
                <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-1">
                  Smartwatch Sensor Detection
                </h3>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">
                  We capture high-fidelity motion data directly from your smartwatch's accelerometer and gyroscope,
                  providing a discreet and accurate input source.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BrainCircuitIcon className="h-8 w-8 text-neon-blue flex-shrink-0 light:text-peach-400" />
              <div>
                <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-1">
                  Intelligent Gesture Mapping
                </h3>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">
                  Our software intelligently maps specific hand gestures to predefined actions, allowing for highly
                  customizable and intuitive control over various applications and devices.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <HandMetalIcon className="h-8 w-8 text-neon-pink flex-shrink-0 light:text-peach-500" />
              <div>
                <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-1">
                  Seamless Integration
                </h3>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">
                  GestureGuy is designed for broad compatibility, easily integrating with existing software and IoT
                  ecosystems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
