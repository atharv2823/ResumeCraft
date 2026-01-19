"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function LandingHero() {
  const router = useRouter()

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Create ATS-Friendly Resumes with AI
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Build professional resumes that pass Applicant Tracking Systems and impress recruiters. Get real-time
                feedback and suggestions powered by AI.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                onClick={() => router.push("/create-resume")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Create Resume
              </Button>
              <Button variant="outline" size="lg" onClick={() => router.push("/scan-resume")}>
                Scan Existing Resume
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto w-full max-w-[500px] aspect-video relative"
          >
            <img
              src="/landing.jpg"
              alt="Resume builder interface"
              className="mx-auto rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
