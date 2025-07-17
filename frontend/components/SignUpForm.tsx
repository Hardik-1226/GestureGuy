"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Sign Up functionality is frontend-only for this demo. No actual registration occurs.")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 dark:bg-gray-950 light:bg-gradient-to-br light:from-sky-blue-soft light:to-sky-yellow-soft">
      <Card className="w-full max-w-md bg-gray-800 border border-gray-700 shadow-xl dark:bg-gray-800 light:bg-white light:border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white dark:text-white light:text-gray-800">Sign Up</CardTitle>
          <CardDescription className="text-gray-400 dark:text-gray-400 light:text-gray-700">
            Create your GestureGuy account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-1"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white dark:bg-gray-700 dark:border-gray-600 light:bg-gray-100 light:border-gray-300 light:text-gray-800 focus:border-neon-blue focus:ring-neon-blue light:focus:border-peach-500 light:focus:ring-peach-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@example.com"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white dark:bg-gray-700 dark:border-gray-600 light:bg-gray-100 light:border-gray-300 light:text-gray-800 focus:border-neon-blue focus:ring-neon-blue light:focus:border-peach-500 light:focus:ring-peach-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-1"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white dark:bg-gray-700 dark:border-gray-600 light:bg-gray-100 light:border-gray-300 light:text-gray-800 focus:border-neon-blue focus:ring-neon-blue light:focus:border-peach-500 light:focus:ring-peach-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full py-3 text-lg bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01] light:bg-gradient-to-r light:from-peach-500 light:to-peach-400 light:hover:from-peach-400 light:hover:to-peach-500 light:text-white"
            >
              Sign Up
            </Button>
          </form>
          <div className="text-center text-sm text-gray-400 dark:text-gray-400 light:text-gray-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-neon-blue hover:underline transition-all duration-300 ease-in-out transform hover:scale-[1.01] light:text-peach-500 light-hover:text-peach-400"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
