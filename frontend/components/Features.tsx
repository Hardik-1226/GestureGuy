"use client" // Mark as client component to use the hook

import { LaptopIcon, FingerprintIcon, CloudCogIcon, LightbulbIcon, PlugZapIcon, Settings2Icon } from "lucide-react"
import { useInViewAnimation } from "@/hooks/useInViewAnimation" // Import the hook

const features = [
  {
    icon: LaptopIcon,
    title: "No Hardware Needed",
    description: "Utilize your existing smartwatch for gesture detection, no extra peripherals required.",
  },
  {
    icon: FingerprintIcon,
    title: "Gesture-to-Action Mapping",
    description: "Customize and map any hand gesture to specific software commands or device actions.",
  },
  {
    icon: CloudCogIcon,
    title: "IoT Integration Ready",
    description: "Seamlessly connect and control smart home devices and other IoT ecosystems.",
  },
  {
    icon: LightbulbIcon,
    title: "Intuitive Control",
    description: "Experience a natural and effortless way to interact with your digital environment.",
  },
  {
    icon: PlugZapIcon,
    title: "Cross-Platform Compatibility",
    description: "Designed to work across various operating systems and device types.",
  },
  {
    icon: Settings2Icon,
    title: "Personalized Profiles",
    description: "Create and switch between custom gesture profiles for different tasks or users.",
  },
]

export default function Features() {
  const { ref, className } = useInViewAnimation({ delay: 100 }) // Add a slight delay for sequential animation

  return (
    <section
      id="features"
      ref={ref} // Attach ref to the section
      className={`relative z-10 py-20 px-4 bg-black/40 text-white dark:bg-black/40 light:bg-white/60 ${className}`} // Adjusted opacity
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 dark:text-white light:text-gray-800">
          <span className="bg-gradient-to-r from-neon-pink to-neon-purple text-transparent bg-clip-text light:from-peach-400 light:to-peach-500">
            Key
          </span>{" "}
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 dark:bg-gray-800 light:bg-white p-6 rounded-lg shadow-xl border border-gray-700 dark:border-gray-700 light:border-gray-200 hover:border-neon-blue transition-all duration-300 transform hover:scale-105 light:hover:border-peach-500" // Added hover animation
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue mb-4 light:from-peach-500 light:to-peach-400">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white dark:text-white light:text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
