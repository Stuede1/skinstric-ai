'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export default function Results() {
  // Left card spinning squares
  const leftSq1 = useRef<HTMLDivElement>(null)
  const leftSq2 = useRef<HTMLDivElement>(null)
  const leftSq3 = useRef<HTMLDivElement>(null)
  // Right card spinning squares
  const rightSq1 = useRef<HTMLDivElement>(null)
  const rightSq2 = useRef<HTMLDivElement>(null)
  const rightSq3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Left card rotations
    const leftRefs = [
      { ref: leftSq1, duration: 60 },
      { ref: leftSq2, duration: 40 },
      { ref: leftSq3, duration: 25 },
    ]
    leftRefs.forEach(({ ref, duration }) => {
      if (ref.current) {
        gsap.to(ref.current, {
          rotation: '+=360',
          duration,
          ease: 'linear',
          repeat: -1,
        })
      }
    })

    // Right card rotations
    const rightRefs = [
      { ref: rightSq1, duration: 60 },
      { ref: rightSq2, duration: 40 },
      { ref: rightSq3, duration: 25 },
    ]
    rightRefs.forEach(({ ref, duration }) => {
      if (ref.current) {
        gsap.to(ref.current, {
          rotation: '+=360',
          duration,
          ease: 'linear',
          repeat: -1,
        })
      }
    })
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

      {/* Preview label — top right */}
      <div className="absolute top-14 right-6 text-right">
        <p className="text-[10px] uppercase tracking-widest font-medium">Preview</p>
        <div className="mt-2 w-[100px] h-[120px] border border-neutral-200" />
      </div>

      {/* Main content — two cards */}
      <main className="flex-1 flex items-center justify-center relative">
        <div className="flex flex-col md:flex-row items-center gap-20 md:gap-96">
          {/* Left card — Scan Face */}
          <div className="relative flex flex-col items-center">
            {/* Spinning dotted squares */}
            <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]">
              <div
                ref={leftSq1}
                className="absolute inset-0 border-[3px] border-dotted border-neutral-200"
                style={{ transform: 'rotate(5deg)' }}
              />
              <div
                ref={leftSq2}
                className="absolute inset-4 border-[3px] border-dotted border-neutral-300"
                style={{ transform: 'rotate(15deg)' }}
              />
              <div
                ref={leftSq3}
                className="absolute inset-8 border-[3px] border-dotted border-neutral-400"
                style={{ transform: 'rotate(30deg)' }}
              />

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-full border-2 border-neutral-900 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2 L12 4" />
                    <path d="M12 20 L12 22" />
                    <path d="M2 12 L4 12" />
                    <path d="M20 12 L22 12" />
                    <path d="M4.93 4.93 L6.34 6.34" />
                    <path d="M17.66 17.66 L19.07 19.07" />
                    <path d="M4.93 19.07 L6.34 17.66" />
                    <path d="M17.66 6.34 L19.07 4.93" />
                  </svg>
                </div>
              </div>

              {/* Label with line */}
              <div className="absolute top-[25%] right-[-20px] flex items-start gap-2">
                <div className="w-[1px] h-[30px] bg-neutral-400 rotate-[-30deg] origin-top" />
                <div className="text-left -mt-1">
                  <p className="text-[9px] uppercase tracking-widest text-neutral-500">Allow A.I.</p>
                  <p className="text-[9px] uppercase tracking-widest font-medium">To Scan Your Face</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right card — Access Gallery */}
          <div className="relative flex flex-col items-center">
            {/* Spinning dotted squares */}
            <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]">
              <div
                ref={rightSq1}
                className="absolute inset-0 border-[3px] border-dotted border-neutral-200"
                style={{ transform: 'rotate(5deg)' }}
              />
              <div
                ref={rightSq2}
                className="absolute inset-4 border-[3px] border-dotted border-neutral-300"
                style={{ transform: 'rotate(15deg)' }}
              />
              <div
                ref={rightSq3}
                className="absolute inset-8 border-[3px] border-dotted border-neutral-400"
                style={{ transform: 'rotate(30deg)' }}
              />

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-full border-2 border-neutral-900 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" fill="currentColor" />
                    <path d="M5 17.5 C5 14 8 12 12 15 C16 12 19 14 19 17.5" />
                  </svg>
                </div>
              </div>

              {/* Label with line */}
              <div className="absolute bottom-[25%] left-[-20px] flex items-end gap-2">
                <div className="text-right -mb-1">
                  <p className="text-[9px] uppercase tracking-widest text-neutral-500">Allow A.I.</p>
                  <p className="text-[9px] uppercase tracking-widest font-medium">Access Gallery</p>
                </div>
                <div className="w-[1px] h-[30px] bg-neutral-400 rotate-[30deg] origin-bottom" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Back button — bottom left */}
      <div className="absolute bottom-6 left-6">
        <Link href="/testing" className="flex items-center gap-3">
          <img src="/left.svg" alt="" className="w-[47px] h-[47px]" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Back</span>
        </Link>
      </div>
    </div>
  )
}
