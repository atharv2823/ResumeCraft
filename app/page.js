"use client"

import { LandingHero } from "@/components/landing-hero"
import { LandingFeatures } from "@/components/landing-features"
import { LandingTestimonials } from "@/components/landing-testimonials"
import { LandingFooter } from "@/components/landing-footer"
import { LandingHeader } from "@/components/landing-header"
import { LandingCTA } from "@/components/landing-cta"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <LandingHeader />
        <LandingHero />
        <LandingFeatures />
        <LandingTestimonials />
        <LandingCTA />
        <LandingFooter />
      </div>
    </div>
  )
}
