"use client" // Mark as client component to use the hook

import type React from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SendIcon } from "lucide-react"
import { useInViewAnimation } from "@/hooks/useInViewAnimation" // Import the hook

export default function Contact() {
  const { ref, className } = useInViewAnimation({ delay: 100 }) // Add a slight delay for sequential animation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! (This is a frontend-only demo)")
  }

  return (
    <section
      id="contact"
      ref={ref} // Attach ref to the section
      className={`relative z-10 py-20 px-4 bg-black/40 text-white dark:bg-black/40 light:bg-white/60 ${className}`} // Adjusted opacity
    >
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 dark:text-white light:text-gray-800">
          <span className="bg-gradient-to-r from-neon-purple to-neon-blue text-transparent bg-clip-text light:from-peach-500 light:to-peach-400">
            Get In
          </span>{" "}
          Touch
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2"
            >
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-200 text-white dark:text-white light:text-gray-800 focus:border-neon-purple focus:ring-neon-purple light:focus:border-peach-500 light:focus:ring-peach-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@example.com"
              className="w-full p-3 rounded-md bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-200 text-white dark:text-white light:text-gray-800 focus:border-neon-blue focus:ring-neon-blue light:focus:border-peach-400 light:focus:ring-peach-400"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2"
            >
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Your message here..."
              rows={5}
              className="w-full p-3 rounded-md bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-200 text-white dark:text-white light:text-gray-800 focus:border-neon-pink focus:ring-neon-pink light:focus:border-peach-500 light:focus:ring-peach-500"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full py-3 text-lg bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01] light:bg-gradient-to-r light:from-peach-500 light:to-peach-400 light:hover:from-peach-400 light:hover:to-peach-500 light:text-white"
          >
            <SendIcon className="mr-2 h-5 w-5" />
            Send Message
          </Button>
        </form>
      </div>
    </section>
  )
}
