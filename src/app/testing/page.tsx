'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export default function Testing() {
  const diamond1Ref = useRef<HTMLDivElement>(null)
  const diamond2Ref = useRef<HTMLDivElement>(null)
  const diamond3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Outer — slowest
    if (diamond1Ref.current) {
      gsap.to(diamond1Ref.current, {
        rotation: '+=360',
        duration: 60,
        ease: 'linear',
        repeat: -1,
      })
    }
    // Middle — medium speed
    if (diamond2Ref.current) {
      gsap.to(diamond2Ref.current, {
        rotation: '+=360',
        duration: 40,
        ease: 'linear',
        repeat: -1,
      })
    }
    // Inner — fastest
    if (diamond3Ref.current) {
      gsap.to(diamond3Ref.current, {
        rotation: '+=360',
        duration: 25,
        ease: 'linear',
        repeat: -1,
      })
    }
  }, [])

  return (
    <div className="relative h-screen w-full flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[10px] font-bold tracking-widest uppercase">
            Skinstric
          </Link>
          <span className="text-[8px] uppercase tracking-widest text-neutral-500">[ Intro ]</span>
        </div>
        <Link
          href="/testing"
          className="bg-neutral-900 text-white text-[8px] uppercase tracking-widest font-medium px-3 py-1.5 hover:bg-neutral-700 transition-colors duration-300"
        >
          Enter Code
        </Link>
      </header>

      {/* Subtitle */}
      <p className="absolute top-14 left-6 text-[10px] uppercase tracking-widest font-medium">
        To Start Analysis
      </p>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center relative">
        {/* Spinning dotted diamonds */}
        <div className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px]">
          <div
            ref={diamond1Ref}
            className="absolute inset-0 border-[3px] border-dotted border-neutral-200"
            style={{ transform: 'rotate(5deg)' }}
          />
          <div
            ref={diamond2Ref}
            className="absolute inset-6 border-[3px] border-dotted border-neutral-300"
            style={{ transform: 'rotate(15deg)' }}
          />
          <div
            ref={diamond3Ref}
            className="absolute inset-12 border-[3px] border-dotted border-neutral-400"
            style={{ transform: 'rotate(30deg)' }}
          />
        </div>

        {/* Center text */}
        <div className="relative z-10 text-center">
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
            Click to type
          </p>
          <h1 className="text-3xl md:text-5xl font-medium text-neutral-400 border-b border-neutral-300 pb-2">
            Introduce Yourself
          </h1>
        </div>
      </main>

      {/* Back button — bottom left */}
      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <img src="/left.svg" alt="" className="w-[35px] h-[35px]" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Back</span>
        </Link>
      </div>
    </div>
  )
}
