"use client"

import { Button } from "@/components/ui/button"
import { LogInIcon, UserPlusIcon } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { useScrollPosition } from "@/hooks/use-scroll-position"

export default function Navbar() {
  const scrollY = useScrollPosition()
  const isScrolled = scrollY > 50 // Determine if user has scrolled down

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center transition-all duration-300 ease-in-out
        ${isScrolled ? "bg-black/70 dark:bg-black/70 light:bg-white/80 backdrop-blur-sm shadow-lg" : "bg-transparent"}
      `}
    >
      <Link href="/" passHref>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue text-transparent bg-clip-text light:from-peach-500 light:to-peach-400">
          GestureGuy
        </h1>
      </Link>
      <div className="flex items-center space-x-4">
        {/* Added link to the new Explore Features page */}
        <Link href="/explore-features" passHref>
          <Button
            variant="ghost"
            className="text-white hover:text-neon-blue dark:text-white dark:hover:text-neon-blue light:text-gray-800 light:hover:text-peach-500"
          >
            Features
          </Button>
        </Link>
        <Link href="/#about" passHref>
          <Button
            variant="ghost"
            className="text-white hover:text-neon-blue dark:text-white dark:hover:text-neon-blue light:text-gray-800 light:hover:text-peach-500"
          >
            About
          </Button>
        </Link>
        {/* Removed old Features link as it's now a dedicated page */}
        {/* <Link href="/#features" passHref>
          <Button
            variant="ghost"
            className="text-white hover:text-neon-blue dark:text-white dark:hover:text-neon-blue light:text-gray-800 light:hover:text-peach-500"
          >
            Features
          </Button>
        </Link> */}
        <Link href="/#demo" passHref>
          <Button
            variant="ghost"
            className="text-white hover:text-neon-blue dark:text-white dark:hover:text-neon-blue light:text-gray-800 light:hover:text-peach-500"
          >
            Demo
          </Button>
        </Link>
        <Link href="/#contact" passHref>
          <Button
            variant="ghost"
            className="text-white hover:text-neon-blue dark:text-white dark:hover:text-neon-blue light:text-gray-800 light:hover:text-peach-500"
          >
            Contact Us
          </Button>
        </Link>
        <Link href="/about-project" passHref>
          <Button
            variant="ghost"
            className="text-white hover:text-neon-blue dark:text-white dark:hover:text-neon-blue light:text-gray-800 light:hover:text-peach-500"
          >
            About Project
          </Button>
        </Link>
        <Link href="/signup" passHref>
          <Button
            variant="outline"
            className="rounded-full bg-gray-800 text-white border-gray-700 hover:bg-gray-700 light:bg-white light:text-gray-800 light:border-gray-300 light:hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <UserPlusIcon className="h-4 w-4 mr-2" /> Sign Up
          </Button>
        </Link>
        <Link href="/login" passHref>
          <Button
            variant="outline"
            className="rounded-full bg-gray-800 text-white border-gray-700 hover:bg-gray-700 light:bg-white light:text-gray-800 light:border-gray-300 light:hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <LogInIcon className="h-4 w-4 mr-2" /> Login
          </Button>
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}
