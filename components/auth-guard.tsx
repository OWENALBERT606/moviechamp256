

"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function AuthGuard({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter()
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isAuthenticated && !hasRun.current) {
      hasRun.current = true
      toast.error("Please login to proceed")

      setTimeout(() => {
        router.push("/login")
      }, 1200)
    }
  }, [isAuthenticated, router])

  return null
}
