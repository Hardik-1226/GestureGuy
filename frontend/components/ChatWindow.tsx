"use client"

import { useChat } from "ai/react"
import { useEffect, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SendIcon, BotIcon, UserIcon, XIcon } from "lucide-react"

interface ChatWindowProps {
  onClose: () => void
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Card className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[70vh] flex flex-col bg-gray-800 border border-gray-700 shadow-2xl rounded-lg dark:bg-gray-800 light:bg-white light:border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-700 dark:border-gray-700 light:border-gray-200">
        <CardTitle className="text-lg font-semibold text-white dark:text-white light:text-gray-800">
          GestureGuy AI Assistant
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-400 hover:text-white dark:text-gray-400 dark:hover:text-white light:text-gray-700 light:hover:text-gray-900"
        >
          <XIcon className="h-5 w-5" />
          <span className="sr-only">Close chat</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 dark:text-gray-400 light:text-gray-700 mt-10">
            Start a conversation!
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex items-start ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-center p-3 rounded-lg max-w-[80%] ${
                m.role === "user"
                  ? "bg-neon-blue text-white self-end light:bg-peach-500 light:text-white"
                  : "bg-gray-700 text-white dark:bg-gray-700 light:bg-gray-100 light:text-gray-800 self-start"
              }`}
            >
              {m.role === "assistant" && <BotIcon className="h-5 w-5 mr-2 flex-shrink-0" />}
              <p className="text-sm">{m.content}</p>
              {m.role === "user" && <UserIcon className="h-5 w-5 ml-2 flex-shrink-0" />}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start justify-start">
            <div className="flex items-center p-3 rounded-lg bg-gray-700 text-white dark:bg-gray-700 light:bg-gray-100 light:text-gray-800">
              <BotIcon className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">AI is typing...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-4 border-t border-gray-700 dark:border-gray-700 light:border-gray-200">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow p-3 rounded-md bg-gray-700 border border-gray-600 text-white dark:bg-gray-700 dark:border-gray-600 light:bg-gray-100 light:border-gray-300 light:text-gray-800 focus:border-neon-purple focus:ring-neon-purple light:focus:border-peach-500 light:focus:ring-peach-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white light:bg-gradient-to-r light:from-peach-500 light:to-peach-400 light:hover:from-peach-400 light:hover:to-peach-500 light:text-white"
            disabled={isLoading}
          >
            <SendIcon className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
