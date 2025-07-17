"use client"

import { LaptopIcon, FingerprintIcon, CloudCogIcon, LightbulbIcon, PlugZapIcon, Settings2Icon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import StarBackground from "@/components/StarBackground"
import FloatingChatButton from "@/components/FloatingChatButton"
import { useInViewAnimation } from "@/hooks/useInViewAnimation"

const detailedFeatures = [
  {
    icon: LaptopIcon,
    title: "No Hardware Needed",
    description:
      "Leverage the power of your existing smartwatch (Apple Watch, Galaxy Watch, etc.) to control your devices. GestureGuy utilizes the built-in accelerometers and gyroscopes, eliminating the need for expensive, dedicated hardware or cumbersome camera setups. This makes our solution highly accessible and portable.",
  },
  {
    icon: FingerprintIcon,
    title: "Customizable Gesture-to-Action Mapping",
    description:
      "Define and personalize your control experience. Our intuitive interface allows you to map any recognized hand gesture to virtually any software command, keyboard shortcut, or IoT device action. Create unique profiles for different applications, enhancing your workflow and productivity.",
  },
  {
    icon: CloudCogIcon,
    title: "Seamless IoT Integration",
    description:
      "Bridge the gap between your gestures and your smart home. GestureGuy offers robust integration capabilities with popular IoT platforms and devices. Control lights, thermostats, smart locks, and more with simple, natural hand movements, bringing true hands-free automation to your environment.",
  },
  {
    icon: LightbulbIcon,
    title: "Intuitive and Natural Control",
    description:
      "Experience a new dimension of human-computer interaction. GestureGuy is designed to feel like a natural extension of your will, making complex tasks feel effortless. Our algorithms are optimized to recognize subtle, natural movements, reducing learning curves and increasing user comfort.",
  },
  {
    icon: PlugZapIcon,
    title: "Broad Cross-Platform Compatibility",
    description:
      "Whether you're on Windows, macOS, or Linux, GestureGuy is built to work seamlessly across various operating systems. Our flexible architecture ensures that you can enjoy gesture control on your preferred desktop environment, expanding the possibilities of interaction.",
  },
  {
    icon: Settings2Icon,
    title: "Personalized User Profiles",
    description:
      "Tailor GestureGuy to your unique needs. Create and switch between multiple custom gesture profiles for different tasks, users, or environments. For example, have one profile for gaming, another for video editing, and a third for smart home control, each with its own set of defined gestures.",
  },
]

export default function ExploreFeaturesPage() {
  const { ref, className } = useInViewAnimation({ delay: 100 })

  return (
    <div className="relative min-h-screen text-white dark:bg-gray-950 light:bg-peach-50">
      <StarBackground fallSpeed={0.08} />
      <div ref={ref} className={`relative z-10 py-20 px-4 bg-black/40 dark:bg-black/40 light:bg-white/60 ${className}`}>
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 animate-fade-in-up dark:text-white light:text-gray-800">
            <span className="bg-gradient-to-r from-neon-purple to-neon-blue text-transparent bg-clip-text light:from-peach-500 light:to-peach-400">
              Explore
            </span>{" "}
            All Features
          </h1>

          <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16 dark:text-gray-300 light:text-gray-700">
            Dive deeper into the capabilities that make GestureGuy a revolutionary interface.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {detailedFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 dark:bg-gray-800 light:bg-white p-8 rounded-lg shadow-xl border border-gray-700 dark:border-gray-700 light:border-gray-200 hover:border-neon-blue transition-all duration-300 transform hover:scale-105 light:hover:border-peach-500"
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue mb-6 light:from-peach-500 light:to-peach-400">
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-semibold text-white dark:text-white light:text-gray-800 mb-4">
                  {feature.title}
                </h2>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/" passHref>
              <Button
                variant="outline"
                className="px-6 py-2 border-2 border-600 text-gray-300 dark:text-gray-300 light:text-gray-700 bg-transparent hover:bg-gray-800 dark:hover:bg-gray-800 light:hover:bg-gray-100 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 light:border-gray-300 light-hover:border-peach-500"
              >
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <FloatingChatButton />
    </div>
  )
}
