"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

function getAIAnswer(question) {
  const q = question.toLowerCase();

  const QAPairs = [
    {
      q: ["gesture", "cursor", "control", "mouse", "project", "mini project"],
      a: "My gesture-controlled cursor system uses the ADXL345 sensor and Python to move the mouse pointer in real-time using wrist movements. Perfect for wearable tech!"
    },
    {
      q: ["how it works", "working", "explain project", "system"],
      a: "The system tracks X and Y axis movements from the ADXL345 sensor connected via Arduino. Python processes the data using PySerial and moves the cursor using PyAutoGUI."
    },
    {
      q: ["future scope", "keyboard", "virtual typing"],
      a: "The project can evolve into a full gesture-based interface for virtual typing and app control. Imagine typing in air with precision—total sci-fi vibes!"
    },
    {
      q: ["hardware", "components", "tools", "devices"],
      a: "The setup includes ADXL345 sensor, Arduino Uno/Nano, jumper wires, and a computer. Tools used: Arduino IDE, Python, PySerial, and PyAutoGUI."
    },
    {
      q: ["skills", "tech stack", "technologies", "languages"],
      a: "Skills used: Python, C++, PySerial, PyAutoGUI, basic electronics, embedded systems. Also dabbled in real-time systems and human-computer interaction."
    },
    {
      q: ["goal", "dream", "why"],
      a: "I wanted to make tech more accessible by removing dependency on traditional input devices—empowering users with smart wearable gestures."
    }
  ];

  const greetings = ["hi", "hello", "hey", "yo", "hola"];
  if (greetings.some(g => q.includes(g))) return "Hey! Ask me anything about my gesture project 🤖✨";

  const goodbyes = ["bye", "goodbye", "see you", "ciao"];
  if (goodbyes.some(b => q.includes(b))) return "Catch you later! Ask more when you're back ✌️";

  for (let pair of QAPairs) {
    if (pair.q.some(keyword => q.includes(keyword))) return pair.a;
  }

  return "Hmm... not sure about that 🤔. Try asking about the tech, hardware, or how gestures work in my project!";
}

export default function GestureGuyChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { from: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'ai', text: getAIAnswer(input) }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Chat"
      >
        {isOpen ? '✖️' : '🤖'}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-blue-400/30 flex flex-col"
          >
            <div className="px-4 py-3 font-bold border-b border-blue-400/20 flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-xl">
              <span>Gesture Guy Chat</span>
              <button
                onClick={() => { setIsOpen(false); setMessages([]); }}
                className="text-white hover:text-red-200 text-xl"
              >✕</button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900" style={{ maxHeight: 320 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-start space-x-2 ${msg.from === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${msg.from === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                    {msg.from === 'user' ? <FaUser className="text-white text-xs" /> : <FaRobot className="text-white text-xs" />}
                  </div>
                  <div className={`text-sm px-3 py-2 rounded-lg ${msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                    <FaRobot className="text-white text-xs" />
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg px-3 py-2">
                    ...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex border-t border-gray-300 bg-white dark:bg-gray-900 rounded-b-xl">
              <input
                className="flex-1 px-3 py-2 bg-transparent outline-none text-sm text-black dark:text-white"
                placeholder="Ask me about the gesture project..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
