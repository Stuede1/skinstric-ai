'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

export default function Testing() {
  const diamond1Ref = useRef<HTMLDivElement>(null)
  const diamond2Ref = useRef<HTMLDivElement>(null)
  const diamond3Ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const proceedBtnRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  const [step, setStep] = useState<'name' | 'location' | 'success'>('name')
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing, step])

  const currentValue = step === 'name' ? name : location
  const setCurrentValue = step === 'name' ? setName : setLocation

  // Validation: only letters, spaces, hyphens, apostrophes allowed
  const validate = (value: string): string | null => {
    const trimmed = value.trim()
    if (!trimmed) return 'This field is required'
    if (/\d/.test(trimmed)) return 'Must not contain numbers'
    if (!/^[a-zA-Z\s\-'.,]+$/.test(trimmed)) return 'Must only contain letters'
    if (trimmed.length < 2) return 'Must be at least 2 characters'
    return null
  }

  const handleProceed = async () => {
    const validationError = validate(currentValue)
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')

    if (step === 'name') {
      // Move to location step
      setStep('location')
      setIsEditing(true)
    } else {
      // Both fields filled — submit to API
      setIsSubmitting(true)
      try {
        const payload = { name: name.trim(), location: location.trim() }

        // Store in localStorage
        localStorage.setItem('skinstric_name', payload.name)
        localStorage.setItem('skinstric_location', payload.location)

        // POST to API
        const res = await fetch(
          'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        )

        if (!res.ok) throw new Error('API request failed')

        const data = await res.json()
        console.log('Full API Response:', data)

        // Show success screen
        setStep('success')
      } catch (err) {
        console.error('Submission error:', err)
        setError('Something went wrong. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Animate proceed button sliding in on success
  useEffect(() => {
    if (step === 'success' && proceedBtnRef.current) {
      gsap.fromTo(
        proceedBtnRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.3 }
      )
    }
  }, [step])

  const handleBack = () => {
    setError('')
    if (step === 'success') {
      setStep('location')
      setIsEditing(false)
    } else if (step === 'location') {
      setStep('name')
      setIsEditing(false)
    } else {
      router.push('/')
    }
  }

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleProceed()
    }
  }

  const placeholderText = step === 'name' ? 'Introduce Yourself' : 'your city name'
  const subtitleText = 'To Start Analysis'

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden">
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
      <p className="absolute top-14 left-6 text-[10px] uppercase tracking-widest font-medium">
        {subtitleText}
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

        {/* Center text / input */}
        {step === 'success' ? (
          <div className="relative z-10 text-center">
            <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
              Thank you
            </p>
            <h1 className="text-3xl md:text-5xl font-medium text-neutral-800">
              {name}
            </h1>
            <p className="mt-2 text-lg text-neutral-400">
              from {location}
            </p>
            <p className="mt-6 text-sm uppercase tracking-widest text-neutral-500">
              Proceed for the next step
            </p>
          </div>
        ) : (
          <div className="relative z-10 text-center" onClick={handleClick}>
            <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
              Click to type
            </p>

            {isEditing ? (
              <div className="border-b border-neutral-300 pb-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentValue}
                  onChange={(e) => {
                    setCurrentValue(e.target.value)
                    setError('')
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholderText}
                  className="text-3xl md:text-5xl font-medium text-neutral-800 bg-transparent outline-none text-center placeholder:text-neutral-300 w-full min-w-[300px] md:min-w-[400px]"
                />
              </div>
            ) : (
              <h1 className="text-3xl md:text-5xl font-medium text-neutral-400 border-b border-neutral-300 pb-2 cursor-pointer">
                {currentValue || placeholderText}
              </h1>
            )}

            {error && (
              <p className="mt-3 text-xs text-red-500 uppercase tracking-widest">{error}</p>
            )}
          </div>
        )}
      </main>

      {/* Back button — bottom left */}
      <div className="absolute bottom-6 left-6">
        <button onClick={handleBack} className="flex items-center gap-3 cursor-pointer">
          <img src="/left.svg" alt="" className="w-[47px] h-[47px]" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Back</span>
        </button>
      </div>

      {/* Proceed button — bottom right (only visible on success) */}
      {step === 'success' && (
        <div className="absolute bottom-6 right-6">
          <button
            ref={proceedBtnRef}
            onClick={() => router.push('/results')}
            className="flex items-center gap-3 cursor-pointer opacity-0"
          >
            <span className="text-[10px] uppercase tracking-widest font-medium">Proceed</span>
            <img src="/right.svg" alt="" className="w-[47px] h-[47px]" />
          </button>
        </div>
      )}
    </div>
  )
}
