"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function LandingHero() {
  const router = useRouter()

  return (
    <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto mb-16">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
             <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6">
                ✨ AI-Powered Resume Builder
             </div>
             <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white">
                Craft Your Perfect Career Story <br className="hidden md:inline" /> 
                with <span className="text-blue-600 dark:text-blue-400">Intelligence.</span>
             </h1>
             <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl dark:text-gray-400 leading-relaxed">
                Build professional, ATS-friendly resumes in minutes. Our AI analyzes your profile to suggest the perfect keywords and formats effectively.
             </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
              <Button
                size="lg"
                onClick={() => router.push("/create-resume")}
                className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30 transition-all text-base"
              >
                Create My Resume
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => router.push("/dashboard")}
                className="h-12 px-8 rounded-full border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-base"
              >
                View Dashboard
              </Button>
          </motion.div>
        </div>
        
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mx-auto max-w-5xl rounded-xl border bg-gray-50/50 dark:bg-gray-900/50 p-2 shadow-2xl backdrop-blur-sm lg:rounded-2xl lg:p-4"
        >
            <div className="rounded-lg overflow-hidden border shadow-sm aspect-video bg-white dark:bg-black relative group">
               {/* Use a placeholder div if image is missing, or the image */}
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 z-10 group-hover:opacity-0 transition-opacity" />
               <img
                src="/landing.jpg"
                alt="Resume Builder Interface"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop";
                }}
              />
            </div>
            
            {/* Floating Badges */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -left-4 top-10 md:-left-12 md:top-20 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 z-20"
            >
               <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
               </div>
               <div>
                  <div className="font-bold text-sm">ATS Optimized</div>
                  <div className="text-xs text-gray-500">Score: 92/100</div>
               </div>
            </motion.div>

             <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -right-4 bottom-10 md:-right-12 md:bottom-20 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 z-20"
            >
               <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
               </div>
               <div>
                  <div className="font-bold text-sm">PDF Expert</div>
                  <div className="text-xs text-gray-500">One-click download</div>
               </div>
            </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
