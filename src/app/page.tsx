'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export default function Home() {
  const diamondRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      diamondRef.current,
      { scale: 0, rotate: 45, opacity: 0 },
      { scale: 1, rotate: 45, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        subtextRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      )
  }, [])

  return (
    <div className="relative h-screen w-full flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6">
        <Link href="/" className="text-sm font-semibold tracking-widest uppercase">
          Skinstric
        </Link>
        <span className="text-[11px] uppercase tracking-widest text-neutral-500">
          Intro
        </span>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center relative">
        {/* Triangle line — left side */}
        <img
          src="/triangleL.svg"
          alt=""
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[90vh] w-auto pointer-events-none"
        />

        {/* Left arrow nav — positioned left */}
        <img
          src="/left.svg"
          alt="Navigate left"
          className="absolute left-16 top-1/2 -translate-y-1/2 w-[47px] h-[47px] cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-70"
        />

        {/* Triangle line — right side */}
        <img
          src="/triangleR.svg"
          alt=""
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[90vh] w-auto pointer-events-none"
        />

        {/* Right arrow nav — positioned right */}
        <img
          src="/right.svg"
          alt="Navigate right"
          className="absolute right-16 top-1/2 -translate-y-1/2 w-[47px] h-[47px] cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-70"
        />

        {/* Rotating diamond */}
        <div
          ref={diamondRef}
          className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] border border-neutral-300 opacity-0"
          style={{ transform: 'rotate(45deg)' }}
        >
          <div className="absolute inset-4 border border-neutral-200" />
          <div className="absolute inset-8 border border-neutral-100" />
        </div>

        {/* Text content */}
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h1
            ref={headingRef}
            className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] opacity-0"
          >
            Sophisticated
            <br />
            <span className="font-normal">skincare</span>
          </h1>
          <p
            ref={subtextRef}
            className="mt-8 text-sm md:text-base text-neutral-500 max-w-md mx-auto leading-relaxed opacity-0"
          >
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>
          <div ref={ctaRef} className="mt-10 opacity-0">
            <Link
              href="/testing"
              className="inline-flex items-center gap-2 border border-neutral-900 px-6 py-3 text-xs uppercase tracking-widest font-medium hover:bg-neutral-900 hover:text-white transition-colors duration-300"
            >
              Enter Experience
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom bar */}
      <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 py-6">
        <p className="text-[11px] text-neutral-400 max-w-xs leading-relaxed">
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>
        <Link
          href="/testing"
          className="text-[11px] uppercase tracking-widest font-medium flex items-center gap-2 hover:text-neutral-600 transition-colors"
        >
          Take Test <span>▶</span>
        </Link>
      </footer>
    </div>
  )
}
