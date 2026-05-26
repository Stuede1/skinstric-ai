'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Category = 'race' | 'age' | 'gender'

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

function sortedEntries(obj: Record<string, number>) {
  return Object.entries(obj).sort(([, a], [, b]) => b - a)
}

export default function Demographics() {
  const router = useRouter()
  const [data, setData] = useState<AnalysisData | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category>('race')
  const [selectedValues, setSelectedValues] = useState<Record<Category, string>>({
    race: '',
    age: '',
    gender: '',
  })

  useEffect(() => {
    const stored = localStorage.getItem('skinstric_analysis')
    if (!stored) {
      router.push('/select')
      return
    }
    try {
      const parsed = JSON.parse(stored)
      const analysisData = parsed.data as AnalysisData
      setData(analysisData)

      // Set initial selected values to the top prediction for each category
      setSelectedValues({
        race: sortedEntries(analysisData.race)[0][0],
        age: sortedEntries(analysisData.age)[0][0],
        gender: sortedEntries(analysisData.gender)[0][0],
      })
    } catch {
      router.push('/select')
    }
  }, [router])

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-neutral-400 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    )
  }

  const categoryData = data[activeCategory]
  const sorted = sortedEntries(categoryData)
  const topValue = selectedValues[activeCategory]
  const topScore = categoryData[topValue] ?? sorted[0][1]
  const topPercent = Math.round(topScore * 100)

  const categoryLabels: Record<Category, string> = {
    race: 'Race',
    age: 'Age',
    gender: 'Sex',
  }

  const handleClickScore = (key: string) => {
    setSelectedValues((prev) => ({ ...prev, [activeCategory]: key }))
  }

  // Donut chart SVG params
  const radius = 120
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (topScore * circumference)

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
          Demographics
        </h1>
        <p className="text-[9px] uppercase tracking-widest text-neutral-400 mt-2">
          Predicted Race & Age
        </p>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-end md:items-center px-6 pb-24 md:pb-0 pt-44 md:pt-32">
        <div className="flex flex-col md:flex-row w-full gap-8">
          {/* Left sidebar — category selectors */}
          <div className="flex flex-col gap-0 w-[140px] shrink-0">
            {(['race', 'age', 'gender'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-left px-4 py-4 border cursor-pointer transition-colors ${
                  activeCategory === cat
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-900 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <p className="text-sm font-medium">{capitalize(selectedValues[cat])}</p>
                <p className="text-[9px] uppercase tracking-widest mt-0.5 opacity-60">
                  {categoryLabels[cat]}
                </p>
              </button>
            ))}
          </div>

          {/* Center — donut chart + selected label */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-2xl md:text-3xl font-medium mb-8">{capitalize(topValue)}</p>
            <div className="relative w-[280px] h-[280px]">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 280 280">
                {/* Background circle */}
                <circle
                  cx="140"
                  cy="140"
                  r={radius}
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth="8"
                />
                {/* Progress arc */}
                <circle
                  cx="140"
                  cy="140"
                  r={radius}
                  fill="none"
                  stroke="#171717"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500"
                />
              </svg>
              {/* Percent label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-medium">{topPercent}%</span>
              </div>
            </div>
          </div>

          {/* Right — scores table */}
          <div className="w-[280px] shrink-0">
            <div className="flex justify-between border-b border-neutral-200 pb-2 mb-2">
              <span className="text-[9px] uppercase tracking-widest font-medium">
                {categoryLabels[activeCategory]}
              </span>
              <span className="text-[9px] uppercase tracking-widest font-medium">
                A.I. Confidence
              </span>
            </div>
            {sorted.map(([key, value]) => {
              const isSelected = key === topValue
              const percent = (value * 100).toFixed(2)
              return (
                <button
                  key={key}
                  onClick={() => handleClickScore(key)}
                  className={`w-full flex justify-between items-center py-2.5 px-2 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-neutral-900 text-white -mx-2 px-4'
                      : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-neutral-300'}`} />
                    <span className="text-sm">{capitalize(key)}</span>
                  </div>
                  <span className="text-sm">{percent}%</span>
                </button>
              )
            })}
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
