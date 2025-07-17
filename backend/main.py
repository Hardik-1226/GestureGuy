"use client"

import { Button } from "@/components/ui/button"
import { SparklesIcon, RocketIcon } from "lucide-react"
import TypewriterEffect from "./TypewriterEffect"
import Link from "next/link"
import { useState } from "react"

const BACKEND_URL = "https://your-deployment-url.com" // ✅ Use your deployed backend URL here

export default function Hero() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [activated, setActivated] = useState(false)

  const handleGetStarted = async () => {
    setLoading(true)
    setMessage("")
    try {
      const res = await fetch(`${BACKEND_URL}/get-started`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if (data.status === "started" || data.status === "already_running") {
        setActivated(true)
        setMessage("Gesture Control Activated!")
        startImageCaptureLoop()
      } else {
        setMessage("Failed to activate gesture control.")
      }
    } catch (e) {
      setMessage("Could not connect to backend.")
    }
    setLoading(false)
  }

  const handleStop = async () => {
    setLoading(true)
    setMessage("")
    try {
      const res = await fetch(`${BACKEND_URL}/stop-gesture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if (data.status === "stopped") {
        setActivated(false)
        setMessage("Gesture Control Stopped.")
      } else {
        setMessage("Failed to stop gesture control.")
      }
    } catch (e) {
      setMessage("Could not connect to backend.")
    }
    setLoading(false)
  }

  const startImageCaptureLoop = async () => {
    const video = document.createElement("video")
    video.style.display = "none"
    document.body.appendChild(video)

    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    video.srcObject = stream
    await video.play()

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    const captureFrame = async () => {
      if (!activated) return
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const blob = await new Promise<Blob>(resolve => canvas.toBlob(resolve!, "image/jpeg"))
      const formData = new FormData()
      formData.append("file", blob, "frame.jpg")

      try {
        const res = await fetch(`${BACKEND_URL}/predict`, {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        if (data.action && data.action !== "none") {
          console.log("Gesture:", data.action)
        }
      } catch (err) {
        console.error("Failed to send image", err)
      }

      setTimeout(captureFrame, 600) // Loop every 600ms
    }

    captureFrame()
  }

  return (
    <section className="min-h-screen pt-24 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
        <TypewriterEffect text="GestureGuy" speed={10} delay={0} />
        <TypewriterEffect text="The Gesture-Controlled Software Interface" speed={2} delay={150} />
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-10">
        Discover the future of interaction with intuitive hand gestures.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/explore-features">
          <Button><SparklesIcon className="mr-2 h-5 w-5" />Explore Features</Button>
        </Link>
        <Button onClick={handleGetStarted} disabled={loading || activated}>
          {loading ? "Activating..." : <><RocketIcon className="mr-2 h-5 w-5" />Get Started</>}
        </Button>
        {activated && (
          <Button variant="destructive" onClick={handleStop} disabled={loading}>
            🛑 Stop
          </Button>
        )}
      </div>
      {message && <p className="mt-4 text-green-400">{message}</p>}
    </section>
  )
}
