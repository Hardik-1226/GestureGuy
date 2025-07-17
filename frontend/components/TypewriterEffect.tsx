"use client"

import { useState, useEffect } from "react"

interface TypewriterEffectProps {
  text: string
  speed?: number // typing speed in ms per character
  delay?: number // initial delay before typing starts
  className?: string
}

export default function TypewriterEffect({ text, speed = 100, delay = 0, className = "" }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined

    const startTyping = () => {
      timeout = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        } else {
          clearTimeout(timeout)
        }
      }, speed)
    }

    if (delay > 0) {
      const initialDelay = setTimeout(startTyping, delay)
      return () => {
        clearTimeout(initialDelay)
        if (timeout) clearTimeout(timeout)
      }
    } else {
      startTyping()
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [currentIndex, text, speed, delay])

  return <span className={className}>{displayedText}</span>
}
