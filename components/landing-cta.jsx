"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function LandingCTA() {
  const router = useRouter()

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900 z-0">
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
         <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="max-w-3xl mx-auto space-y-6"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Build Your Career?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
             Join thousands of professionals who have secured their dream jobs with ResumeCraft. 
             It takes less than 5 minutes to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
             <Button 
               size="lg" 
               onClick={() => router.push("/create-resume")}
               className="bg-white text-blue-600 hover:bg-gray-100 h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
             >
               Build My Resume Now
             </Button>
             <Button 
               variant="outline" 
               size="lg" 
               onClick={() => router.push("/mock-test")}
               className="bg-transparent border-white text-white hover:bg-white/10 h-14 px-8 text-lg font-semibold"
             >
               Try AI Mock Test
             </Button>
          </div>
          <p className="text-sm text-blue-200 mt-6">
             No credit card required. Free templates available.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
