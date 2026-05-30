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

export default function Summary() {
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
    <div className="min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-white">
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

      {/* Title area */}
      <div className="pt-4 px-6">
        <p className="text-xs uppercase tracking-widest text-neutral-500">A.I. Analysis</p>
        <h1 className="text-4xl md:text-6xl font-normal uppercase tracking-tight mt-1">
          Demographics
        </h1>
        <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">
          Predicted Race & Age
        </p>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-6 py-6">
        <div className="flex-1 flex flex-col md:flex-row w-full gap-6 md:gap-0">
          {/* Left sidebar — category selectors */}
          <div className="flex flex-col w-full md:w-[220px] shrink-0 self-start border-l-2 border-neutral-200">
            {(['race', 'age', 'gender'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-left px-5 py-4 cursor-pointer transition-colors border-l-2 -ml-[2px] ${
                  activeCategory === cat
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-900 border-transparent hover:bg-neutral-50'
                }`}
              >
                <p className="text-sm font-bold">{capitalize(selectedValues[cat])}</p>
                <p className="text-[9px] uppercase tracking-widest mt-0.5 opacity-60">
                  {categoryLabels[cat]}
                </p>
              </button>
            ))}
          </div>

          {/* Center — label + donut chart */}
          <div className="flex-1 flex flex-col md:flex-row items-stretch">
            {/* Selected value label */}
            <p className="text-4xl md:text-6xl font-normal pl-4 md:pl-8 pt-2 w-full md:w-[340px] shrink-0 leading-tight">
              {capitalize(topValue)}
            </p>

            {/* Donut chart */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-[280px] h-[280px] md:w-[440px] md:h-[440px]">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 280 280">
                  <circle
                    cx="140"
                    cy="140"
                    r={radius}
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="6"
                  />
                  <circle
                    cx="140"
                    cy="140"
                    r={radius}
                    fill="none"
                    stroke="#171717"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl md:text-6xl font-normal text-neutral-600">{topPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — scores table */}
          <div className="w-full md:w-[300px] shrink-0 self-start">
            <div className="flex justify-between border-b border-neutral-200 pb-2 mb-1">
              <span className="text-[10px] uppercase tracking-widest font-medium text-neutral-500">
                {categoryLabels[activeCategory]}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-medium text-neutral-500">
                A.I. Confidence
              </span>
            </div>
            {sorted.map(([key, value]) => {
              const isSelected = key === topValue
              const percent = Math.round(value * 100)
              return (
                <button
                  key={key}
                  onClick={() => handleClickScore(key)}
                  className={`w-full flex justify-between items-center py-2 px-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-neutral-900 text-white'
                      : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${isSelected ? 'text-white' : 'text-neutral-300'}`}>◆</span>
                    <span className="text-[15px]">{capitalize(key)}</span>
                  </div>
                  <span className="text-[15px]">{percent}%</span>
                </button>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
