'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Select() {
  const router = useRouter()
  const [hovered, setHovered] = useState<string | null>(null)

  const handleClick = (item: string) => {
    if (item === 'demographics') {
      router.push('/summary')
    }
  }

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

      {/* Subtitle */}
      <div className="absolute top-14 left-6 select-text">
        <h1 className="text-sm font-bold uppercase tracking-widest">A.I. Analysis</h1>
        <p className="text-xs uppercase tracking-widest text-neutral-700 mt-1">
          A.I. has estimated the following.
        </p>
        <p className="text-xs uppercase tracking-widest text-neutral-700">
          Fix estimated information if needed.
        </p>
      </div>

      {/* Main content — diamond layout */}
      <main className="flex-1 flex items-center justify-center relative">
        {/* Dotted diamond outline — expands outward on hover */}
        <div
          className={`absolute border-[3px] border-dotted border-neutral-300 transition-all duration-500 ease-out ${
            hovered ? 'w-[520px] h-[520px] opacity-100' : 'w-[340px] h-[340px] opacity-0'
          }`}
          style={{ transform: 'rotate(45deg)' }}
        />

        {/* 2x2 grid rotated 45deg to form diamond */}
        <div
          className="grid grid-cols-2 gap-[4px] w-[340px] h-[340px]"
          style={{ transform: 'rotate(45deg)' }}
        >
          {/* Top-left cell → becomes top-left visually → Demographics (top) */}
          <button
            onClick={() => handleClick('demographics')}
            onMouseEnter={() => setHovered('demographics')}
            onMouseLeave={() => setHovered(null)}
            className={`w-full h-full transition-colors cursor-pointer flex items-center justify-center ${
              hovered === 'demographics' ? 'bg-neutral-300' : 'bg-neutral-200'
            }`}
          >
            <span
              className="text-[13px] uppercase tracking-widest font-bold text-neutral-800"
              style={{ transform: 'rotate(-45deg)' }}
            >
              Demographics
            </span>
          </button>

          {/* Top-right cell → becomes right visually → Skin Type Details */}
          <button
            onMouseEnter={() => setHovered('skintype')}
            onMouseLeave={() => setHovered(null)}
            className={`w-full h-full transition-colors cursor-not-allowed flex items-center justify-center ${
              hovered === 'skintype' ? 'bg-neutral-200' : 'bg-neutral-100'
            }`}
          >
            <span
              className="text-[13px] uppercase tracking-widest font-bold text-neutral-800 text-center leading-6"
              style={{ transform: 'rotate(-45deg)' }}
            >
              Skin Type Details
            </span>
          </button>

          {/* Bottom-left cell → becomes left visually → Cosmetic Concerns */}
          <button
            onMouseEnter={() => setHovered('cosmetic')}
            onMouseLeave={() => setHovered(null)}
            className={`w-full h-full transition-colors cursor-not-allowed flex items-center justify-center ${
              hovered === 'cosmetic' ? 'bg-neutral-200' : 'bg-neutral-100'
            }`}
          >
            <span
              className="text-[13px] uppercase tracking-widest font-bold text-neutral-800 text-center leading-6"
              style={{ transform: 'rotate(-45deg)' }}
            >
              Cosmetic<br />Concerns
            </span>
          </button>

          {/* Bottom-right cell → becomes bottom visually → Weather */}
          <button
            onMouseEnter={() => setHovered('weather')}
            onMouseLeave={() => setHovered(null)}
            className={`w-full h-full transition-colors cursor-not-allowed flex items-center justify-center ${
              hovered === 'weather' ? 'bg-neutral-200' : 'bg-neutral-100'
            }`}
          >
            <span
              className="text-[13px] uppercase tracking-widest font-bold text-neutral-800"
              style={{ transform: 'rotate(-45deg)' }}
            >
              Weather
            </span>
          </button>
        </div>
      </main>

      {/* Back button — bottom left */}
      <div className="absolute bottom-6 left-6">
        <Link href="/results" className="flex items-center gap-3">
          <img src="/left.svg" alt="" className="w-[47px] h-[47px]" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Back</span>
        </Link>
      </div>

      {/* Get Summary button — bottom right */}
      <div className="absolute bottom-6 right-6">
        <button
          onClick={() => router.push('/summary')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-widest font-medium">Get Summary</span>
          <img src="/right.svg" alt="" className="w-[47px] h-[47px]" />
        </button>
      </div>
    </div>
  )
}
