"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { BotIcon, XIcon } from "lucide-react"
import ChatWindow from "@/components/ChatWindow"

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-lg bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-blue transition-all duration-300 transform hover:scale-110 light:bg-gradient-to-r light:from-peach-500 light:to-peach-400 light:hover:from-peach-400 light:hover:to-peach-500 light:text-white"
        size="icon"
      >
        {isOpen ? <XIcon className="h-6 w-6 text-white" /> : <BotIcon className="h-6 w-6 text-white" />}
        <span className="sr-only">{isOpen ? "Close Chat" : "Open Chat"}</span>
      </Button>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  )
}
