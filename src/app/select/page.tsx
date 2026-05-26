'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Select() {
  const router = useRouter()

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
      <div className="absolute top-14 left-6">
        <h1 className="text-lg font-bold uppercase tracking-wide">A.I. Analysis</h1>
        <p className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">
          A.I. has estimated the following.
        </p>
        <p className="text-[9px] uppercase tracking-widest text-neutral-500">
          Fix estimated information if needed.
        </p>
      </div>

      {/* Main content — diamond layout */}
      <main className="flex-1 flex items-center justify-center relative">
        <div className="relative w-[420px] h-[420px]">
          {/* Diamond container rotated 45deg */}
          <div className="absolute inset-0" style={{ transform: 'rotate(45deg)' }}>
            {/* Top — Demographics */}
            <button
              onClick={() => router.push('/select/demographics')}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center"
            >
              <span
                className="text-[10px] uppercase tracking-widest font-medium text-neutral-700"
                style={{ transform: 'rotate(-45deg)' }}
              >
                Demographics
              </span>
            </button>

            {/* Left — Cosmetic Concerns */}
            <button
              className="absolute top-1/2 left-0 -translate-y-1/2 w-[200px] h-[200px] bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer flex items-center justify-center"
            >
              <span
                className="text-[10px] uppercase tracking-widest font-medium text-neutral-700 text-center leading-5"
                style={{ transform: 'rotate(-45deg)' }}
              >
                Cosmetic<br />Concerns
              </span>
            </button>

            {/* Right — Skin Type Details */}
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 w-[200px] h-[200px] bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer flex items-center justify-center"
            >
              <span
                className="text-[10px] uppercase tracking-widest font-medium text-neutral-700 text-center leading-5"
                style={{ transform: 'rotate(-45deg)' }}
              >
                Skin Type<br />Details
              </span>
            </button>

            {/* Bottom — Weather */}
            <button
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer flex items-center justify-center"
            >
              <span
                className="text-[10px] uppercase tracking-widest font-medium text-neutral-700"
                style={{ transform: 'rotate(-45deg)' }}
              >
                Weather
              </span>
            </button>
          </div>
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
