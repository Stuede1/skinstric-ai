'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { Aperture, Image } from 'lucide-react'

//results page

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
                <div className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-full border-2 border-neutral-900 flex items-center justify-center">
                  <Aperture size={100} strokeWidth={1.5} />
                </div>
              </div>

              {/* Label with line */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 5 }}>
                <line x1="54%" y1="35%" x2="75%" y2="18%" stroke="#000" strokeWidth="1" />
                <circle cx="75%" cy="18%" r="3" fill="#000" />
              </svg>
              <div className="absolute top-[12%] right-[-30px] text-left" style={{ zIndex: 6 }}>
                <p className="text-[9px] uppercase tracking-widest text-neutral-500">Allow A.I.</p>
                <p className="text-[9px] uppercase tracking-widest font-medium">To Scan Your Face</p>
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
                <div className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-full border-2 border-neutral-900 flex items-center justify-center">
                  <Image size={100} strokeWidth={1.5} />
                </div>
              </div>

              {/* Label with line */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 5 }}>
                <line x1="46%" y1="65%" x2="25%" y2="82%" stroke="#000" strokeWidth="1" />
                <circle cx="25%" cy="82%" r="3" fill="#000" />
              </svg>
              <div className="absolute bottom-[12%] left-[-80px] text-right" style={{ zIndex: 6 }}>
                <p className="text-[9px] uppercase tracking-widest text-neutral-500">Allow A.I.</p>
                <p className="text-[9px] uppercase tracking-widest font-medium">Access Gallery</p>
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
