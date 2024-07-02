import React from "react"


export default function Component() {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Verify your email</h1>
      <p class="text-muted-foreground mb-6">We've sent a verification code to your email. Enter the code below to confirm your identity.</p>
      <div class="flex space-x-4 items-center justify-center">
        <button class="bg-card text-card-foreground border border-border py-2 px-4 rounded">Cancel</button>
        <button class="bg-black text-white text-background py-2 px-4 rounded hover">Verify</button>
      </div>
    </div>
  </div>
  )
}