"use client"

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FaUser, FaRobot, FaPaperPlane, FaSmile, FaPowerOff } from 'react-icons/fa';

const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false, loading: () => null });
const MotionButton = dynamic(() => import('framer-motion').then(mod => mod.motion.button), { ssr: false, loading: () => null });
const AnimatePresence = dynamic(() => import('framer-motion').then(mod => mod.AnimatePresence), { ssr: false, loading: () => <></> });

const conversationPairs = [
  // Greetings and general
  { q: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"], a: "Hello! I'm GestureAi, your Gesture Guys assistant. Ask me anything about gesture control, features, or just say hi! 🤖" },
  { q: ["how are you", "how's it going", "what's up", "how do you do", "how are you doing"], a: "I'm doing great! Ready to help you with Gesture Guys. What would you like to know?" },
  { q: ["thank you", "thanks", "thx", "ty"], a: "You're welcome! If you have more questions, just ask." },
  { q: ["bye", "goodbye", "see you", "farewell"], a: "Goodbye! Come back anytime you want to chat about Gesture Guys." },
  { q: ["joke", "funny", "make me laugh"], a: "Why did the robot go on vacation? Because it had too many bytes! 🤖" },
  { q: ["who are you", "your name", "what are you", "who made you"], a: "I'm GestureAi, the friendly chatbot for Gesture Guys, built to answer your questions and make you smile!" },
  { q: ["like you", "love you", "awesome", "cool", "nice", "great", "amazing", "impressive"], a: "Thank you! You're awesome too! 🚀" },
  // Project-specific (existing)
  { q: ["what’s gesture guys", "what is gesture guys", "gesture guys", "tell me about gesture guy", "about gesture guy", "tell me about gesture guys", "about gesture guys", "gesture guy", "about the gesture guy", "about the gesture guys"], a: 'Gesture Guys is a cool gesture-based control system. You can wave your hand and control your computer — no keyboard, no mouse. Just pure tech magic!' },
  { q: ["iron man", "like iron man", "iron man type"], a: 'Kinda yeah 😎 But made in a dorm room, not a lab in Malibu. We use hand gestures to trigger commands like typing, scrolling, and more.' },
  { q: ["work on phones", "does it work on phones", "phone", "mobile"], a: 'Not yet, but we’re working on it. Right now, it\'s optimized for PC/laptop setups and wearables like smartwatches.' },
  { q: ["tech did you use", "tech stack", "technology", "what tech"], a: 'Our tech stack is:\n- React + Tailwind CSS for frontend\n- FastAPI (Python) for backend\n- OpenCV + MediaPipe for gesture detection\n- ADXL345 sensor for motion data\n- Ngrok for tunneling during testing' },
  { q: ["see it in action", "can i see", "demo", "show me"], a: 'Of course! Just click on “Get Started” and show your hand to the camera. Boom — magic starts.' },
  { q: ["gestures can it detect", "what kind of gestures", "supported gestures", "which gestures"], a: 'Stuff like:\n- Hand up = click\n- Swipe left/right = navigate\n- Fist = pause\n- Open palm = start typing (virtual keyboard)' },
  { q: ["is it fast", "speed", "delay", "lag"], a: 'Yup! Real-time gesture tracking using computer vision. No delay, no drama.' },
  { q: ["hand isn’t detected", "not detected", "not working", "no hand"], a: 'Try adjusting your lighting, hold your hand in front of the camera properly, and avoid background clutter.' },
  { q: ["add my own gestures", "custom gestures", "customize gestures"], a: 'Yes! You can customize gesture-action mapping in our settings/config file. Wanna open Notepad with 2-finger peace sign? You got it.' },
  { q: ["future plans", "roadmap", "what next", "upcoming"], a: 'Oho, we’ve got big dreams:\n- Add voice + gesture hybrid control\n- Port to Android/iOS\n- Integrate with smart home stuff\n- Build gesture-based games' },
  { q: ["college project", "use for college", "can i use this for my college project"], a: 'Yes sir! Use it, fork it, build on it — just give the Gesture Guys some credit ❤️' },
  { q: ["smartwatch", "will it work on smartwatch", "watch"], a: 'If your smartwatch supports sensors like ADXL345 and camera interface, you’re golden. Otherwise, use an external camera + sensor module.' },
  { q: ["fun use-case", "most fun", "coolest thing"], a: 'Gesture-controlled games and virtual keyboard. Also showing it off to your friends and watching them go “Yeh kya Jadoo hai bhai??”' },
  { q: ["is this ai", "is it ai", "ai"], a: 'Sort of. We use ML-powered models from MediaPipe for gesture detection. But it\'s not a full-blown deep learning system yet.' },
  { q: ["how can i install", "install", "setup", "how to install"], a: 'Clone the repo → run the backend → start the frontend → allow camera access → wave your hand 🖐️' },
  { q: ["multi-language", "multi language", "hindi", "regional languages"], a: 'Yes, we’re adding Hindi, Hinglish, and more regional languages soon.' },
  { q: ["work offline", "offline"], a: 'Mostly yes, since gesture tracking runs locally. But if you’re using cloud-based actions, internet will be needed.' },
  { q: ["where did you build", "where built", "hackathon"], a: 'During a hackathon — with coffee, stress, and code-fueled late nights 😴' },
  { q: ["help disabled", "disabled people", "accessibility"], a: '100%! That’s one of our biggest goals — gesture control for people who can’t use traditional input devices.' },
  { q: ["feedback", "how do i give feedback", "suggestion"], a: 'Ping us on GitHub or just yell at the chatbot — we listen 😅' },
  { q: ["open-source", "open source", "will you open-source it"], a: 'Yep! We’re polishing things up, then dropping the repo link soon.' },
  { q: ["control music", "music", "play music"], a: 'Yes, gesture = play/pause/next song — vibe check ✅' },
  { q: ["how many gestures", "number of gestures", "gestures supported"], a: 'Currently 5–10 basic gestures, but it\'s expandable. You can train your own if you\'re a bit nerdy 💻' },
  { q: ["better than voice", "voice control", "voice vs gesture"], a: 'In noisy environments or privacy-focused setups — gestures > voice.' },
  { q: ["become a gesture guy", "can i become a gesture guy", "join gesture gang"], a: 'Always 😎 Clone our project and become part of the Gesture Gang!' },
  { q: ["how i can use it", "how to use", "how do i use it", "how can i use it", "usage", "how to operate"], a: "Clone the repo → run the backend → start the frontend → allow camera access → wave your hand 🖐️" },
  { q: ["who create this", "who made this", "who built this", "who created this", "developer", "founder"], a: "This was built by our team during a hackathon — we’re a group of tech students obsessed with cool tech like gesture control! 😎" },
  { q: ["is it good", "is it useful", "is it working", "is this project good", "does it work well"], a: "Absolutely! It's working great and has a lot of potential, especially for smart devices and hands-free control." },
  { q: ["how it solve problem", "what problem it solves", "problem solved", "why it is useful", "how it helps"], a: "Gesture Guys helps remove the dependency on external input devices. It's a game-changer for accessibility and smart interfaces!" },
  { q: ["how it is useful", "how is it useful", "why is it useful", "how useful is it"], a: "Gesture Guys helps remove the dependency on external input devices. It's a game-changer for accessibility and smart interfaces!" },
  { q: ["how create you", "who create you", "who made you", "who built you", "who created you", "your creator", "who is your creator"], a: "Hardik created me." },
  { q: ["tech use", "tech used", "technology used", "what tech is used", "which tech"], a: "Our tech stack includes:\n- React + Tailwind for frontend\n- FastAPI for backend\n- OpenCV + MediaPipe for gesture detection\n- ADXL345 sensor\n- Ngrok for testing" },
];

function getBotAnswer(userInput: string) {
  const q = userInput.toLowerCase();
  for (const pair of conversationPairs) {
    if (pair.q.some(keyword => q.includes(keyword))) {
      return pair.a;
    }
  }
  return "I'm not sure about that. Try asking about features, setup, or supported gestures!";
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { from: 'user', text: input }]);
    setIsTyping(true);
    const userQ = input;
    setInput('');
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: getBotAnswer(userQ) }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {!expanded && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center group">
          <MotionButton
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(true)}
            className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400 rounded-full shadow-xl flex items-center justify-center border-4 border-white/30 backdrop-blur-md"
            aria-label="Open GestureAi Chat"
          >
            <FaRobot color="#6366f1" size={32} />
          </MotionButton>
          <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-3 bg-gray-900/80 text-white text-xs font-semibold px-3 py-1 rounded shadow-lg whitespace-nowrap backdrop-blur-md" style={{ position: 'absolute', bottom: '4.5rem' }}>
            Any Doubt?
          </span>
        </div>
      )}
      <AnimatePresence>
        {expanded && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50 w-80 max-w-full rounded-3xl shadow-2xl border-2 border-white/20 flex flex-col bg-white/30 dark:bg-[#23272f]/80 backdrop-blur-lg robo-glow"
            style={{ boxShadow: '0 8px 32px 0 rgba(99,102,241,0.25), 0 1.5px 8px 0 rgba(236,72,153,0.10)' }}
          >
            {/* Robot face header */}
            <div className="flex flex-col items-center justify-center py-4 rounded-t-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 border-b-2 border-white/20 relative shadow-md">
              <div className="flex items-center gap-2">
                <span className="inline-block w-10 h-10 rounded-full bg-white/80 border-2 border-blue-300 flex items-center justify-center shadow-lg">
                  <FaRobot color="#6366f1" size={28} />
                </span>
                <span className="text-xl font-bold text-white tracking-wide drop-shadow">GestureAi</span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 shadow animate-pulse" title="Online" />
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-300" />
                <span className="inline-block w-2 h-2 rounded-full bg-pink-400" />
              </div>
              <span className="absolute right-4 top-4 text-white/70 cursor-pointer hover:text-pink-400 transition-colors" title="Power Off" onClick={() => { setMessages([]); setExpanded(false); }}><FaPowerOff /></span>
            </div>
            {/* Chat area */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2" style={{ maxHeight: 400 }}>
              {messages.map((msg, i) => (
                <div key={i + '-' + msg.from + '-' + msg.text.slice(0, 16)} className={`flex items-start space-x-2 ${msg.from === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.from === 'user' ? 'bg-gradient-to-br from-pink-400 to-yellow-400' : 'bg-gradient-to-br from-blue-400 to-purple-500'}`}>
                    {msg.from === 'user' ? <FaUser color="white" size={16} /> : <FaRobot color="white" size={16} />}
                  </div>
                  <div className={`text-sm rounded-2xl px-4 py-2 max-w-[80%] shadow ${msg.from === 'user' ? 'bg-white/80 text-gray-900 border border-pink-200' : 'bg-gradient-to-br from-blue-100/80 to-purple-100/80 text-blue-900 border border-blue-200'}`}>{msg.text.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}</div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <FaRobot color="white" size={16} />
                  </div>
                  <div className="bg-gradient-to-br from-blue-100/80 to-purple-100/80 text-blue-900 rounded-2xl px-4 py-2 shadow border border-blue-200">
                    <span className="typing-indicator">...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input area */}
            <div className="flex border-t-2 border-white/20 bg-white/40 dark:bg-[#23272f]/60 rounded-b-3xl backdrop-blur-md">
              <input
                className="flex-1 px-4 py-3 rounded-bl-3xl bg-transparent outline-none text-base placeholder:text-gray-500"
                placeholder="Ask GestureAi anything..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              />
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 text-pink-500 font-bold hover:bg-pink-500 hover:text-white rounded-br-3xl transition-colors"
                onClick={handleSend}
              >
                <FaPaperPlane />
              </MotionButton>
            </div>
            {/* Glowing effect */}
            <style jsx>{`
              .robo-glow {
                box-shadow: 0 0 32px 4px #a5b4fc55, 0 0 8px 2px #f472b655;
              }
            `}</style>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}
