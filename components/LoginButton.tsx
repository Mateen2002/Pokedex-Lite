'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LoginButton() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await signIn('google')
    } catch (error: any) {
      console.error("Failed to sign in:", error)
      setError("Failed to sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await signOut()
    } catch (error: any) {
      console.error("Failed to sign out:", error)
      setError("Failed to sign out. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return <Button disabled>Loading...</Button>
  }

  return (
    <div>
      {session ? (
        <Button onClick={handleSignOut} disabled={isLoading}>
          {isLoading ? 'Signing out...' : 'Sign out'}
        </Button>
      ) : (
        <Button onClick={handleSignIn} disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}
