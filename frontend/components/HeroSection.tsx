import { Button } from "@/components/ui/button"
import { SparklesIcon, RocketIcon, LightbulbIcon } from "lucide-react"
import React, { useState } from "react"

// Use local backend URL for local development
const BACKEND_URL = "http://localhost:8000"

export default function HeroSection() {
  const [loading, setLoading] = useState(false)
  const [activated, setActivated] = useState(false)
  const [error, setError] = useState("")

  const handleGetStarted = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${BACKEND_URL}/start-gesture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if (data.status === "started" || data.status === "already_running") {
        setActivated(true)
      } else {
        setError("Failed to activate gesture control.")
      }
    } catch (e) {
      setError("Could not connect to backend.")
    }
    setLoading(false)
  }

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 py-12 bg-black bg-opacity-50">
      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up">
        Unleash Your Digital Vision
      </h1>
      <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-10 animate-fade-in-up animation-delay-200">
        Experience a truly dynamic web presence with cutting-edge animations and seamless interactivity. Where
        innovation meets design.
      </p>
      <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-400">
        <Button className="px-8 py-3 text-lg bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
          <SparklesIcon className="mr-2 h-5 w-5" />
          Explore Features
        </Button>
        <Button
          variant="outline"
          className="px-8 py-3 text-lg border-2 border-white text-white bg-transparent hover:bg-white hover:text-purple-600 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={handleGetStarted}
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin mr-2">🔄</span>
          ) : (
            <RocketIcon className="mr-2 h-5 w-5" />
          )}
          {loading ? "Activating..." : "Get Started"}
        </Button>
        <Button
          variant="secondary"
          className="px-8 py-3 text-lg bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <LightbulbIcon className="mr-2 h-5 w-5" />
          Learn More
        </Button>
      </div>
      {activated && (
        <div className="mt-4 text-green-600 font-bold">
          Gesture Control Activated!
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-600 font-bold">
          {error}
        </div>
      )}
      <div className="mt-16 text-gray-300 text-sm animate-fade-in-up animation-delay-600">
        <p>Powered by Next.js, React, Three.js, and Tailwind CSS</p>
      </div>
    </section>
  )
}
