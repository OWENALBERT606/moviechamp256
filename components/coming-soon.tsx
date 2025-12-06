"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef } from "react"

interface ComingSoonPageProps {
  featureName: string
  description?: string
  returnLink?: string
}

export default function ComingSoonPage({
  featureName,
  description = `We're working hard to bring you ${featureName}. Stay tuned for updates!`,
  returnLink = "/",
}: ComingSoonPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load and play Lottie animation
    const loadLottie = async () => {
      const lottie = await import("lottie-web")

      if (containerRef.current) {
        lottie.default.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "https://lottie.host/a7e8c9d1-4b2f-4c5f-8e3a-1b2c3d4e5f6g/5K8mL9oP2qR3sT4uV5wX.json", // Construction/building animation
        })
      }
    }

    loadLottie()
  }, [])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Lottie Animation Container */}
          <div ref={containerRef} className="w-64 h-64 md:w-80 md:h-80" aria-label="Coming soon animation" />

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{featureName} is Coming Soon</h1>
            <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full" />
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-md">{description}</p>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm font-medium text-orange-500">Coming Soon</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href={returnLink}>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Back to Home
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-muted-foreground/30 hover:bg-muted/50 bg-transparent">
              Notify Me
            </Button>
          </div>

          {/* Footer Text */}
          <p className="text-xs text-muted-foreground/60 pt-8">
            We're excited to launch this feature. Check back soon for updates!
          </p>
        </div>
      </div>
    </main>
  )
}
