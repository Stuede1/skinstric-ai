'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Camera } from 'lucide-react'

export default function CameraCapture() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  useEffect(() => {
    let currentStream: MediaStream | null = null

    const startCamera = async () => {
      try {
        currentStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 1280, height: 720 },
        })
        setStream(currentStream)

        if (videoRef.current) {
          videoRef.current.srcObject = currentStream
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play()
            setCameraReady(true)
          }
        }
      } catch (err) {
        console.error('Camera access denied:', err)
        router.push('/results')
      }
    }

    startCamera()

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [router])

  const handleTakePicture = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(video, 0, 0)
    const imageData = canvas.toDataURL('image/png')

    setCapturedImage(imageData)
  }

  const handleRetake = async () => {
    setCapturedImage(null)
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 1280, height: 720 },
      })
      setStream(newStream)
      if (videoRef.current) {
        videoRef.current.srcObject = newStream
      }
    } catch (err) {
      console.error('Failed to restart camera:', err)
    }
  }

  const handleUsePhoto = async () => {
    if (!capturedImage) return

    // Stop camera
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }

    // Store captured image in localStorage
    localStorage.setItem('skinstric_capture', capturedImage)

    // Extract base64 string (remove data:image/png;base64, prefix)
    const base64String = capturedImage.split(',')[1]

    setIsProcessing(true)
    try {
      const res = await fetch(
        'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64String }),
        }
      )
      const data = await res.json()
      console.log('Full API Response:', data)
      localStorage.setItem('skinstric_analysis', JSON.stringify(data))
      router.push('/select')
    } catch (err) {
      console.error('Phase Two API error:', err)
      setIsProcessing(false)
    }
  }

  const handleBack = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    router.push('/results')
  }

  return (
    <div className="relative h-screen w-full flex flex-col bg-neutral-500">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[10px] font-bold tracking-widest uppercase text-white">
            Skinstric
          </Link>
          <span className="text-[8px] uppercase tracking-widest text-neutral-300">[ Intro ]</span>
        </div>
        <span className="bg-white text-neutral-900 text-[8px] uppercase tracking-widest font-medium px-3 py-1.5">
          Enter Code
        </span>
      </header>

      {/* Camera feed */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Video element — fills the center area */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            cameraReady && !capturedImage ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hidden canvas for capturing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Captured image preview */}
        {capturedImage && (
          <img
            src={capturedImage}
            alt="Captured"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Instructions — shown when picture not yet taken */}
        {!capturedImage && (
          <div className="relative z-10 flex flex-col items-center text-white/60 mt-[22rem]">
            {/* Laptop with camera icon (only before camera loads) */}
            {!cameraReady && (
              <svg width="120" height="100" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-6">
                <rect x="20" y="10" width="80" height="55" rx="4" />
                <path d="M10 65 L110 65 L120 85 L0 85 Z" />
                <circle cx="60" cy="37" r="12" />
                <circle cx="60" cy="37" r="5" fill="currentColor" />
              </svg>
            )}

            <p className="text-sm uppercase tracking-widest text-white/80 text-center">
              To get better results make sure to have
            </p>
            <div className="mt-4 flex items-center gap-8">
              <span className="text-[10px] uppercase tracking-widest text-white/70 flex items-center gap-1">
                ◇ Neutral Expression
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/70 flex items-center gap-1">
                ◇ Frontal Pose
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/70 flex items-center gap-1">
                ◇ Adequate Lighting
              </span>
            </div>
          </div>
        )}

        {/* Confirmation overlay */}
        {capturedImage && (
          <div className="absolute inset-0 z-10 flex flex-col items-center">
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white font-medium mb-4">
                Great Shot!
              </p>
              <p className="text-[10px] uppercase tracking-widest text-white/70">
                Preview
              </p>
            </div>
            <div className="flex items-center gap-4 mb-10">
              <button
                onClick={handleRetake}
                disabled={isProcessing}
                className="px-6 py-2.5 bg-white text-neutral-900 text-[10px] uppercase tracking-widest font-medium hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
              >
                Retake
              </button>
              <button
                onClick={handleUsePhoto}
                disabled={isProcessing}
                className="px-6 py-2.5 bg-neutral-900 text-white text-[10px] uppercase tracking-widest font-medium border border-white hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Use This Photo'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Back button — bottom left */}
      <div className="absolute bottom-6 left-6 z-20">
        <button onClick={handleBack} className="flex items-center gap-3 cursor-pointer">
          <img src="/left.svg" alt="" className="w-[47px] h-[47px] invert" />
          <span className="text-[10px] uppercase tracking-widest font-medium text-white">Back</span>
        </button>
      </div>

      {/* Take Picture button — right side (hidden when photo captured) */}
      {!capturedImage && (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={handleTakePicture}
            disabled={!cameraReady || isProcessing}
            className="flex items-center gap-3 cursor-pointer disabled:opacity-30 transition-opacity"
          >
            <span className="text-[10px] uppercase tracking-widest font-medium text-white">
              Take Picture
            </span>
            <div className="w-[50px] h-[50px] rounded-full border-2 border-white flex items-center justify-center">
              <Camera size={24} className="text-white" />
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
