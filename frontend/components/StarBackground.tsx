"use client"

import { useEffect, useRef } from "react"
import { Renderer, Camera, Transform, Program, Mesh, Geometry } from "ogl"
import { useTheme } from "next-themes"

/**
 * Animated star-shower background (falling stars)
 */
interface StarBackgroundProps {
  numStars?: number
  starSize?: number
  twinkleSpeed?: number
  fallSpeed?: number // faster = bigger number
  className?: string
}

export default function StarBackground({
  numStars = 1200,
  starSize = 2,
  twinkleSpeed = 0.06,
  fallSpeed = 0.08, // fast shower
  className = "",
}: StarBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()
  const timeRef = useRef(0)

  const { theme } = useTheme()

  // Refs to hold OGL objects that need to persist
  const rendererRef = useRef<Renderer | null>(null)
  const cameraRef = useRef<Camera | null>(null)
  const sceneRef = useRef<Transform | null>(null) // Added sceneRef to persist
  const programRef = useRef<Program | null>(null)

  // Effect for initial OGL setup (runs once on mount)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    /* ----------  OGL setup  ---------- */
    const renderer = new Renderer({ canvas, antialias: true, alpha: true }) // alpha: true for transparency
    rendererRef.current = renderer
    const gl = renderer.gl

    const camera = new Camera(gl, { fov: 45 })
    camera.position.z = 5
    camera.lookAt([0, 0, 0])
    cameraRef.current = camera

    const scene = new Transform()
    sceneRef.current = scene // Assign scene to ref

    /* Star positions inside a 10×10×10 cube */
    const positions = new Float32Array(numStars * 3)
    for (let i = 0; i < numStars; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10 // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10 // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 // z
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
    })

    /* Precision qualifier avoids ‘attributeLocations undefined’ issue */
    const vertex = /* glsl */ `
      precision mediump float;

      attribute vec3 position;

      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;

      uniform float uTime;
      uniform float uStarSize;
      uniform float uTwinkleSpeed;
      uniform float uFallSpeed;

      void main() {
        vec3 pos = position;

        /* Fall along −Y. When off-screen, jump back to the top */
        pos.y -= uTime * uFallSpeed;
        if (pos.y < -5.0) {
          pos.y += 10.0;
        }

        /* Tiny sideways drift for variety */
        pos.x += sin(uTime * 0.2 + position.y) * 0.003;

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);

        /* Twinkle by varying point size */
        gl_PointSize = uStarSize *
                       (1.0 + sin(uTwinkleSpeed * (uTime + position.x * 12.0)) * 0.5);

        gl_Position = projectionMatrix * mv;
      }
    `

    const fragment = /* glsl */ `
      precision mediump float;
      uniform vec3 uStarColor; // New uniform for star color
      void main() {
        gl_FragColor = vec4(uStarColor, 1.0); // Use uniform color
      }
    `

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uStarSize: { value: starSize },
        uTwinkleSpeed: { value: twinkleSpeed },
        uFallSpeed: { value: fallSpeed },
        uStarColor: { value: [1.0, 1.0, 1.0] }, // Default to white
      },
      transparent: true,
    })
    programRef.current = program // Store program in ref

    new Mesh(gl, { geometry, program, mode: gl.POINTS }).setParent(scene)

    /* Resize handler */
    const resize = () => {
      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
        cameraRef.current.perspective({
          aspect: rendererRef.current.gl.canvas.width / rendererRef.current.gl.canvas.height,
        })
      }
    }
    window.addEventListener("resize", resize)

    /* Render loop */
    const loop = () => {
      timeRef.current += 0.016
      if (!programRef.current) {
        rafRef.current = requestAnimationFrame(loop)
        return
      }
      programRef.current.uniforms.uTime.value = timeRef.current

      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
        rafRef.current = requestAnimationFrame(loop)
        return
      }
      rendererRef.current.render({ scene: sceneRef.current, camera: cameraRef.current })
      rafRef.current = requestAnimationFrame(loop)
    }

    // Initial calls
    resize()
    rafRef.current = requestAnimationFrame(loop)

    /* Cleanup on unmount */
    return () => {
      cancelAnimationFrame(rafRef.current ?? 0)
      window.removeEventListener("resize", resize)
      programRef.current?.dispose?.()
      geometry.dispose?.()
      rendererRef.current?.gl.getExtension("WEBGL_lose_context")?.loseContext()
      // Clear refs
      rendererRef.current = null
      cameraRef.current = null
      sceneRef.current = null // Ensure sceneRef is also cleared
      programRef.current = null
    }
  }, [numStars, starSize, twinkleSpeed, fallSpeed]) // Dependencies for initial setup (run once)

  // Effect for updating star color based on theme (runs on theme change)
  useEffect(() => {
    if (programRef.current) {
      if (theme === "light") {
        programRef.current.uniforms.uStarColor.value = [0.5, 0.5, 0.5] // Light gray for light mode
      } else {
        programRef.current.uniforms.uStarColor.value = [1.0, 1.0, 1.0] // White for dark mode
      }
    }
  }, [theme]) // Only depends on theme

  return <canvas ref={canvasRef} className={`fixed inset-0 z-0 ${className}`} />
}
