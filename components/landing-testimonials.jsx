"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function LandingTestimonials() {
  const testimonials = [
    {
      quote: "My resume score went from 50 to 95 in minutes. I got calls from 3 top companies within a week!",
      author: "Sarah Jenkins",
      role: "Software Engineer",
      initials: "SJ",
      color: "bg-red-100 text-red-700"
    },
    {
      quote:
        "The AI suggestions are incredible. It helped me rephrase my experience to match exactly what recruiters look for.",
      author: "Michael Chen",
      role: "Product Manager",
      initials: "MC",
      color: "bg-blue-100 text-blue-700"
    },
    {
      quote:
        "Finally a resume builder that actually looks good and passes ATS. The creative templates are a game changer.",
      author: "Emily Rodriguez",
      role: "UX Designer",
      initials: "ER",
      color: "bg-orange-100 text-orange-700"
    },
  ]

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
           <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
              Testimonials
           </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Loved by Job Seekers</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Join thousands of professionals who accelerated their career with ResumeCraft.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-t-4 border-t-blue-500 shadow-md">
                <CardContent className="pt-8">
                  <div className="mb-6 relative">
                    <svg className="h-10 w-10 text-gray-200 dark:text-gray-700 absolute -top-4 -left-2" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-lg relative z-10 italic text-gray-700 dark:text-gray-300">"{testimonial.quote}"</p>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center space-x-4 border-t px-6 py-4 bg-gray-50/50 dark:bg-gray-900/50">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${testimonial.color}`}>
                     {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{testimonial.author}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{testimonial.role}</p>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
