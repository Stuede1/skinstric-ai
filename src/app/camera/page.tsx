'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Camera() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [status, setStatus] = useState<'requesting' | 'granted' | 'denied'>('requesting')

  useEffect(() => {
    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 1280, height: 720 },
        })
        setStatus('granted')

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        // Once camera is working, navigate to capture route
        router.push('/camera/capture')
      } catch (err) {
        console.error('Camera access denied:', err)
        setStatus('denied')
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [router])

  return (
    <div className="relative h-screen w-full flex flex-col bg-neutral-100">
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

      {/* Hidden video element to establish camera stream */}
      <video ref={videoRef} autoPlay playsInline muted className="hidden" />

      {/* Center content */}
      <main className="flex-1 flex items-center justify-center">
        {status === 'requesting' && (
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-neutral-400 border-t-neutral-900 rounded-full animate-spin mx-auto mb-6" />
            <p className="text-sm uppercase tracking-widest text-neutral-500">
              Requesting camera access...
            </p>
          </div>
        )}

        {status === 'denied' && (
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-red-500 mb-4">
              Camera access was denied
            </p>
            <p className="text-xs text-neutral-400 mb-6">
              Please allow camera access in your browser settings and try again.
            </p>
            <button
              onClick={() => router.push('/results')}
              className="border border-neutral-900 px-6 py-3 text-xs uppercase tracking-widest font-medium hover:bg-neutral-900 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Go Back
            </button>
          </div>
        )}
      </main>

      {/* Back button — bottom left */}
      <div className="absolute bottom-6 left-6">
        <Link href="/results" className="flex items-center gap-3">
          <img src="/left.svg" alt="" className="w-[47px] h-[47px]" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Back</span>
        </Link>
      </div>
    </div>
  )
}
