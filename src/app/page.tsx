'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export default function Home() {
  const diamondRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const textBlockRef = useRef<HTMLDivElement>(null)
  const leftBtnRef = useRef<HTMLAnchorElement>(null)
  const rightBtnRef = useRef<HTMLAnchorElement>(null)
  const triangleLRef = useRef<HTMLImageElement>(null)
  const triangleRRef = useRef<HTMLImageElement>(null)

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

  useEffect(() => {
    const textEl = textBlockRef.current
    const leftEl = leftBtnRef.current
    const rightEl = rightBtnRef.current
    if (!textEl || !leftEl || !rightEl) return

    const triL = triangleLRef.current
    const triR = triangleRRef.current

    const handleLeftEnter = () => {
      gsap.to(textEl, { x: 480, duration: 0.8, ease: 'power2.out' })
      gsap.to(rightEl, { opacity: 0, duration: 0.1, ease: 'power2.out' })
      gsap.to(triR, { opacity: 0, duration: 0.4, ease: 'power2.out' })
    }
    const handleRightEnter = () => {
      gsap.to(textEl, { x: -480, duration: 1.3, ease: 'power2.out' })
      gsap.to(leftEl, { opacity: 0, duration: 0.1, ease: 'power2.out' })
      gsap.to(triL, { opacity: 0, duration: 0.4, ease: 'power2.out' })
    }
    const handleLeave = () => {
      gsap.to(textEl, { x: 0, duration: 1.3, ease: 'power2.out' })
      gsap.to([leftEl, rightEl], { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to([triL, triR], { opacity: 1, duration: 0.4, ease: 'power2.out' })
    }

    leftEl.addEventListener('mouseenter', handleLeftEnter)
    leftEl.addEventListener('mouseleave', handleLeave)
    rightEl.addEventListener('mouseenter', handleRightEnter)
    rightEl.addEventListener('mouseleave', handleLeave)

    return () => {
      leftEl.removeEventListener('mouseenter', handleLeftEnter)
      leftEl.removeEventListener('mouseleave', handleLeave)
      rightEl.removeEventListener('mouseenter', handleRightEnter)
      rightEl.removeEventListener('mouseleave', handleLeave)
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
        <span className="bg-neutral-900 text-white text-[8px] uppercase tracking-widest font-medium px-3 py-1.5">
          Enter Code
        </span>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center relative">
        {/* Triangle line — left side (flipped triangleR) */}
        <img
          ref={triangleLRef}
          src="/triangleR.svg"
          alt=""
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[90vh] w-auto pointer-events-none opacity-50 -scale-x-100 hidden md:block"
        />

        {/* Navigation row — ensures both buttons are on the same horizontal line */}
        <div className="absolute inset-y-0 left-16 right-16 hidden md:flex items-center justify-between pointer-events-none">
          <Link
            ref={leftBtnRef}
            href="/testing"
            onClick={(e) => e.preventDefault()}
            className="pointer-events-auto flex items-center gap-3 cursor-pointer transition-opacity duration-300 hover:opacity-70 relative top-[2%]"
          >
            <img src="/left.svg" alt="" className="w-[47px] h-[47px]" />
            <span className="text-sm uppercase tracking-widest font-medium">Discover A.I.</span>
          </Link>

          <Link
            ref={rightBtnRef}
            href="/testing"
            className="pointer-events-auto flex items-center gap-3 cursor-pointer transition-opacity duration-300 hover:opacity-70 relative top-[2%]"
          >
            <span className="text-sm uppercase tracking-widest font-medium">Take Test</span>
            <img src="/right.svg" alt="" className="w-[47px] h-[47px]" />
          </Link>
        </div>

        {/* Triangle line — right side */}
        <img
          ref={triangleRRef}
          src="/triangleR.svg"
          alt=""
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[90vh] w-auto pointer-events-none opacity-50 hidden md:block"
        />

        {/* Rotating diamond */}
        <div
          ref={diamondRef}
          className="absolute w-[320px] h-[320px] md:hidden border border-neutral-300 opacity-0"
          style={{ transform: 'rotate(45deg)' }}
        >
          <div className="absolute inset-4 border border-neutral-200" />
          <div className="absolute inset-8 border border-neutral-100" />
        </div>

        {/* Text content */}
        <div ref={textBlockRef} className="relative z-10 text-center max-w-2xl px-6">
          <h1
            ref={headingRef}
            className="text-5xl md:text-8xl font-normal tracking-tight leading-[1.1] opacity-0"
          >
            Sophisticated
            <br />
            <span className="font-normal">skincare</span>
          </h1>
          <p
            ref={subtextRef}
            className="mt-8 text-sm md:text-base text-neutral-500 max-w-md mx-auto leading-relaxed opacity-0 md:hidden"
          >
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>
          <div ref={ctaRef} className="mt-10 opacity-0 md:hidden">
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
      <footer className="absolute bottom-0 left-0 right-0 flex items-center px-8 py-6">
        <p className="text-[11px] text-neutral-400 max-w-xs leading-relaxed">
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>
      </footer>
    </div>
  )
}
