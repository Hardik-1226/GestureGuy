"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

// === Logic imported from your chatbot ===
// You can move these imports to another file if needed
import getAIAnswer from "@/lib/getAIAnswer";

export default function FloatingChatButton() {
  const [messages, setMessages] = useState<{ from: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const response = getAIAnswer(input);
      setMessages((msgs) => [...msgs, { from: 'ai', text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent-color text-white rounded-full shadow-lg flex items-center justify-center text-2xl overflow-hidden"
        aria-label="Open AI Chat"
      >
        {isOpen ? (
          <span className="text-white text-lg">✕</span>
        ) : (
          <img src="/ai-avatar.png" alt="AI Avatar" className="w-12 h-12 object-cover rounded-full" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white dark:bg-[#222] rounded-xl shadow-2xl border border-accent-color/30 dark:border-cyan-400/20 flex flex-col"
          >
            {/* Header */}
            <div className="px-4 py-3 font-bold border-b border-accent-color/20 flex justify-between items-center bg-gradient-to-r from-accent-color to-blue-500 rounded-t-xl">
              <div className="flex items-center space-x-2">
                <img
                  src="/ai-avatar.png"
                  alt="AI Avatar"
                  className="w-8 h-8 object-cover rounded-full"
                />
                <span className="text-black dark:text-white">Ask About Hardik</span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setMessages([]);
                }}
                className="text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-[#222]" style={{ maxHeight: 320 }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start space-x-2 ${
                    msg.from === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.from === 'user' ? 'bg-accent-color' : 'bg-blue-500'
                    }`}
                  >
                    {msg.from === 'user' ? (
                      <FaUser className="text-white text-xs" />
                    ) : (
                      <img src="/ai-avatar.png" alt="AI Avatar" className="w-6 h-6 object-cover rounded-full" />
                    )}
                  </div>
                  <div
                    className={`text-sm rounded-lg px-3 py-2 max-w-[80%] ${
                      msg.from === 'user'
                        ? 'bg-accent-color text-white'
                        : 'bg-gray-100 dark:bg-[#333] text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <img src="/ai-avatar.png" alt="AI Avatar" className="w-6 h-6 object-cover rounded-full" />
                  </div>
                  <div className="bg-gray-100 dark:bg-[#333] text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2">
                    <span className="typing-indicator">...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex border-t border-accent-color/20 bg-white dark:bg-[#222] rounded-b-xl">
              <input
                className="flex-1 px-3 py-2 rounded-bl-xl bg-transparent outline-none text-sm"
                placeholder="Ask me anything about Hardik..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-accent-color font-bold hover:bg-accent-color hover:text-white rounded-br-xl transition-colors"
                onClick={handleSend}
              >
                <FaPaperPlane />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
