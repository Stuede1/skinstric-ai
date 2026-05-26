'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface AnalysisData {
  race: Record<string, number>
  age: Record<string, number>
  gender: Record<string, number>
}

function capitalize(s: string) {
  return s
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function getTop(obj: Record<string, number>) {
  return Object.entries(obj).sort(([, a], [, b]) => b - a)[0]
}

export default function Summary() {
  const [data, setData] = useState<AnalysisData | null>(null)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('skinstric_analysis')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setData(parsed.data as AnalysisData)
      } catch {
        /* ignore */
      }
    }
    setName(localStorage.getItem('skinstric_name') || 'User')
    setLocation(localStorage.getItem('skinstric_location') || 'Unknown')
  }, [])

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-neutral-400 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    )
  }

  const [topRace, raceScore] = getTop(data.race)
  const [topAge, ageScore] = getTop(data.age)
  const [topGender, genderScore] = getTop(data.gender)

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

      {/* Title area */}
      <div className="absolute top-14 left-6">
        <p className="text-[9px] uppercase tracking-widest text-neutral-500">A.I. Analysis</p>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mt-1">
          Summary
        </h1>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 pt-32">
        <div className="w-full max-w-3xl">
          {/* User info */}
          <div className="mb-10 border-b border-neutral-200 pb-6">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm text-neutral-400 mt-1">from {location}</p>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Race */}
            <div className="border border-neutral-200 p-6">
              <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-2">Race</p>
              <p className="text-xl font-bold">{capitalize(topRace)}</p>
              <p className="text-3xl font-medium mt-2">{(raceScore * 100).toFixed(2)}%</p>
              <div className="mt-3 w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-900 rounded-full transition-all"
                  style={{ width: `${raceScore * 100}%` }}
                />
              </div>
            </div>

            {/* Age */}
            <div className="border border-neutral-200 p-6">
              <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-2">Age</p>
              <p className="text-xl font-bold">{topAge}</p>
              <p className="text-3xl font-medium mt-2">{(ageScore * 100).toFixed(2)}%</p>
              <div className="mt-3 w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-900 rounded-full transition-all"
                  style={{ width: `${ageScore * 100}%` }}
                />
              </div>
            </div>

            {/* Gender */}
            <div className="border border-neutral-200 p-6">
              <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-2">Sex</p>
              <p className="text-xl font-bold">{capitalize(topGender)}</p>
              <p className="text-3xl font-medium mt-2">{(genderScore * 100).toFixed(2)}%</p>
              <div className="mt-3 w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-900 rounded-full transition-all"
                  style={{ width: `${genderScore * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* All scores */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Race breakdown */}
            <div>
              <p className="text-[9px] uppercase tracking-widest font-medium border-b border-neutral-200 pb-2 mb-2">
                Race Breakdown
              </p>
              {Object.entries(data.race)
                .sort(([, a], [, b]) => b - a)
                .map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1.5">
                    <span className="text-sm">{capitalize(key)}</span>
                    <span className="text-sm">{(val * 100).toFixed(2)}%</span>
                  </div>
                ))}
            </div>

            {/* Age breakdown */}
            <div>
              <p className="text-[9px] uppercase tracking-widest font-medium border-b border-neutral-200 pb-2 mb-2">
                Age Breakdown
              </p>
              {Object.entries(data.age)
                .sort(([, a], [, b]) => b - a)
                .map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1.5">
                    <span className="text-sm">{key}</span>
                    <span className="text-sm">{(val * 100).toFixed(2)}%</span>
                  </div>
                ))}
            </div>

            {/* Gender breakdown */}
            <div>
              <p className="text-[9px] uppercase tracking-widest font-medium border-b border-neutral-200 pb-2 mb-2">
                Gender Breakdown
              </p>
              {Object.entries(data.gender)
                .sort(([, a], [, b]) => b - a)
                .map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1.5">
                    <span className="text-sm">{capitalize(key)}</span>
                    <span className="text-sm">{(val * 100).toFixed(2)}%</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      {/* Back button — bottom left */}
      <div className="absolute bottom-6 left-6">
        <Link href="/select" className="flex items-center gap-3">
          <img src="/left.svg" alt="" className="w-[47px] h-[47px]" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Back</span>
        </Link>
      </div>
    </div>
  )
}
