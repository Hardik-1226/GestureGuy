"use client" // Mark as client component to use the hook

import {
  BrainCircuitIcon,
  HandMetalIcon,
  WatchIcon,
  LightbulbIcon,
  RocketIcon,
  CodeIcon,
  ZapIcon,
  GlobeIcon,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import StarBackground from "@/components/StarBackground" // Re-import StarBackground
import FloatingChatButton from "@/components/FloatingChatButton"
import { useInViewAnimation } from "@/hooks/useInViewAnimation"

export default function AboutProjectPage() {
  const { ref, className } = useInViewAnimation({ delay: 100 }) // Add a slight delay for sequential animation

  return (
    <div className="relative min-h-screen text-white dark:bg-gray-950 light:bg-peach-50">
      <StarBackground fallSpeed={0.08} /> {/* Re-add StarBackground */}
      <div
        ref={ref} // Attach ref to the main content div
        className={`relative z-10 py-20 px-4 bg-black/40 dark:bg-black/40 light:bg-white/60 ${className}`}
      >
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 animate-fade-in-up dark:text-white light:text-gray-800">
            <span className="bg-gradient-to-r from-neon-purple to-neon-blue text-transparent bg-clip-text light:from-peach-500 light:to-peach-400">
              GestureGuy
            </span>{" "}
            - The Full Story
          </h1>

          <section className="mb-16 animate-fade-in-up animation-delay-200">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-neon-blue light:text-peach-500">
              Redefining Human-Computer Interaction
            </h2>
            <p className="text-lg leading-relaxed text-gray-300 dark:text-gray-300 light:text-gray-700 mb-4">
              GestureGuy is not just another software; it's a paradigm shift in how we interact with technology. In an
              increasingly digital world, traditional input methods like keyboards and mice, while effective, can be
              limiting and unnatural. GestureGuy aims to bridge this gap by enabling seamless, intuitive control through
              the most natural interface we possess: our hands.
            </p>
            <p className="text-lg leading-relaxed text-gray-300 dark:text-gray-300 light:text-gray-700">
              Our vision is a future where devices respond to your intent, not just your clicks. From navigating complex
              software interfaces to controlling smart home ecosystems, GestureGuy empowers users with a level of
              control that feels like an extension of their own will.
            </p>
          </section>

          <section className="mb-16 animate-fade-in-up animation-delay-400">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-neon-pink light:text-peach-500">
              How It Works: Smartwatch to Seamless Control
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <WatchIcon className="h-8 w-8 text-neon-purple flex-shrink-0 light:text-peach-500" />
                  <div>
                    <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-1">
                      Smartwatch Sensor Detection
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">
                      Unlike camera-based systems, GestureGuy utilizes the sophisticated sensors embedded in your
                      smartwatch – accelerometers, gyroscopes, and magnetometers. These sensors provide high-fidelity,
                      real-time motion data, capturing the nuances of your hand movements without requiring
                      line-of-sight or specific lighting conditions. This makes GestureGuy discreet, portable, and
                      highly reliable.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BrainCircuitIcon className="h-8 w-8 text-neon-blue flex-shrink-0 light:text-peach-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-1">
                      Advanced Gesture Mapping Algorithms
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">
                      The raw sensor data is fed into GestureGuy's proprietary machine learning algorithms. These
                      algorithms are trained to recognize a wide array of distinct hand gestures, from simple flicks and
                      clenches to more complex multi-finger movements. Each recognized gesture is then mapped to a
                      specific action or command within your connected devices or software.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <HandMetalIcon className="h-8 w-8 text-neon-pink flex-shrink-0 light:text-peach-500" />
                  <div>
                    <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-1">
                      Customization and Personalization
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">
                      GestureGuy offers extensive customization options. Users can define their own gestures, assign
                      them to virtually any action, and create personalized profiles for different applications or
                      contexts. This adaptability ensures that GestureGuy can be tailored to individual workflows and
                      preferences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <LightbulbIcon className="h-8 w-8 text-neon-purple flex-shrink-0 light:text-peach-500" />
                  <div>
                    <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-1">
                      Broad Compatibility and Integration
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">
                      Designed with an open architecture, GestureGuy is ready for integration with a vast ecosystem of
                      software and hardware. Whether it's controlling your smart TV, navigating a CAD program, or
                      operating drones, GestureGuy provides a unified, gesture-driven control layer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* New Advanced Concepts Section */}
          <section className="mb-16 animate-fade-in-up animation-delay-600">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-neon-blue light:text-peach-500">
              <span className="bg-gradient-to-r from-neon-purple to-neon-pink text-transparent bg-clip-text light:from-peach-500 light:to-peach-400">
                Advanced
              </span>{" "}
              Concepts & Future
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 bg-gray-800 dark:bg-gray-800 light:bg-white p-6 rounded-lg shadow-xl border border-gray-700 dark:border-gray-700 light:border-gray-200 transition-all duration-300 transform hover:scale-105">
                <CodeIcon className="h-8 w-8 text-neon-blue flex-shrink-0 light:text-peach-400" />
                <div>
                  <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-1">
                    Machine Learning Core
                  </h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">
                    Our robust ML models continuously learn and adapt to individual user styles, improving gesture
                    recognition accuracy over time.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-gray-800 dark:bg-gray-800 light:bg-white p-6 rounded-lg shadow-xl border border-gray-700 dark:border-gray-700 light:border-gray-200 transition-all duration-300 transform hover:scale-105">
                <ZapIcon className="h-8 w-8 text-neon-pink flex-shrink-0 light:text-peach-500" />
                <div>
                  <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-1">
                    Low Latency Processing
                  </h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">
                    Optimized for real-time performance, GestureGuy ensures minimal delay between your gesture and the
                    corresponding action.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-gray-800 dark:bg-gray-800 light:bg-white p-6 rounded-lg shadow-xl border border-gray-700 dark:border-gray-700 light:border-gray-200 transition-all duration-300 transform hover:scale-105">
                <GlobeIcon className="h-8 w-8 text-neon-purple flex-shrink-0 light:text-peach-500" />
                <div>
                  <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-1">
                    Cross-Device Ecosystem
                  </h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">
                    Future developments aim for seamless control across a wider range of devices, from AR/VR headsets to
                    industrial robotics.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-gray-800 dark:bg-gray-800 light:bg-white p-6 rounded-lg shadow-xl border border-gray-700 dark:border-gray-700 light:border-gray-200 transition-all duration-300 transform hover:scale-105">
                <RocketIcon className="h-8 w-8 text-neon-blue flex-shrink-0 light:text-peach-400" />
                <div>
                  <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-1">
                    Developer API
                  </h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-700">
                    We plan to release an API, allowing developers to integrate GestureGuy's powerful gesture
                    recognition into their own applications.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 animate-fade-in-up animation-delay-800">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-neon-blue light:text-peach-500">
              The Future of Interaction is Here
            </h2>
            <p className="text-lg leading-relaxed text-gray-300 dark:text-gray-300 light:text-gray-700 mb-8 text-center">
              GestureGuy is more than just a product; it's a step towards a more natural, efficient, and futuristic way
              of interacting with the digital world. Join us in embracing the next generation of human-computer
              interfaces.
            </p>
            <div className="flex justify-center">
              <Link href="/#contact" passHref>
                <Button className="px-8 py-3 text-lg bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 light:bg-gradient-to-r light:from-peach-500 light:to-peach-400 light:hover:from-peach-400 light:hover:to-peach-500 light:text-white">
                  <RocketIcon className="mr-2 h-5 w-5" />
                  Get Started with GestureGuy
                </Button>
              </Link>
            </div>
          </section>

          <div className="text-center mt-16">
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
      <FloatingChatButton /> {/* Add FloatingChatButton to about-project page as well */}
    </div>
  )
}
