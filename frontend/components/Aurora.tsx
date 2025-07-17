"use client"

import { useEffect, useRef } from "react"
import { Renderer, Camera, Transform, Program, Mesh, Geometry } from "ogl"

interface AuroraProps {
  colorStops: string[]
  blend?: number // 0-1  – where the middle colour sits
  amplitude?: number // wave intensity
  speed?: number // animation speed multiplier
  className?: string
}

/* Convert #rrggbb to normalised vec3 */
const hexToRgb = (hex: string): [number, number, number] => {
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255
  return [r, g, b]
}

export default function Aurora({ colorStops, blend = 0.5, amplitude = 1, speed = 0.5, className = "" }: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* OGL refs */
  const rendererRef = useRef<Renderer>()
  const programRef = useRef<Program>()
  const sceneRef = useRef<Transform>()
  const cameraRef = useRef<Camera>()
  const rafRef = useRef<number>()
  const timeRef = useRef(0)

  /* One–time setup / teardown  */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    /* ───── Init ───── */
    const renderer = new Renderer({ canvas, alpha: true, antialias: true })
    rendererRef.current = renderer
    const gl = renderer.gl

    /* camera */
    const camera = new Camera(gl, { fov: 35 })
    camera.position.z = 5
    cameraRef.current = camera

    /* root node */
    const scene = new Transform()
    sceneRef.current = scene

    /* full-screen quad */
    const geometry = new Geometry(gl, {
      position: {
        size: 2,
        data: new Float32Array([
          -1,
          -1, //
          1,
          -1, //
          -1,
          1, //
          1,
          -1, //
          1,
          1, //
          -1,
          1, //
        ]),
      },
      uv: {
        size: 2,
        data: new Float32Array([
          0,
          0, //
          1,
          0, //
          0,
          1, //
          1,
          0, //
          1,
          1, //
          0,
          1, //
        ]),
      },
    })

    /* shaders */
    const vertex = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fragment = `
      precision highp float;
      varying vec2 vUv;

      uniform float uTime;
      uniform float uBlend;
      uniform float uAmplitude;
      uniform vec3  uColor0;
      uniform vec3  uColor1;
      uniform vec3  uColor2;

      void main() {
        float wave = sin((vUv.y * 10.0 + uTime) * uAmplitude);
        float mixFactor = (wave + 1.0) * 0.5;   // 0-1

        vec3 color;
        if (mixFactor < uBlend) {
          color = mix(uColor0, uColor1, mixFactor / uBlend);
        } else {
          color = mix(uColor1, uColor2, (mixFactor - uBlend) / (1.0 - uBlend));
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uBlend: { value: blend },
        uAmplitude: { value: amplitude },
        uColor0: { value: hexToRgb(colorStops[0] ?? "#3A29FF") },
        uColor1: { value: hexToRgb(colorStops[1] ?? "#FF94B4") },
        uColor2: { value: hexToRgb(colorStops[2] ?? "#FF3232") },
      },
    })
    programRef.current = program

    const mesh = new Mesh(gl, { geometry, program })
    mesh.setParent(scene)

    /* resize handler */
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height })
    }
    window.addEventListener("resize", resize)
    resize()

    /* render loop */
    const loop = () => {
      timeRef.current += 0.01 * speed
      program.uniforms.uTime.value = timeRef.current

      renderer.render({ scene, camera }) //  <- include camera ✅
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    /* ───── Cleanup ───── */
    return () => {
      cancelAnimationFrame(rafRef.current ?? 0)
      window.removeEventListener("resize", resize)

      /* free GPU resources */
      program && program.dispose?.()
      geometry.dispose?.()

      /* Lose context (prevents memory leaks) */
      renderer.gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [colorStops, blend, amplitude, speed])

  return <canvas ref={canvasRef} className={`fixed inset-0 z-0 ${className}`} />
}
