"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function LandingTestimonials() {
  const testimonials = [
    {
      quote: "ResumeCraft helped me land interviews at top tech companies. The AI suggestions were spot on!",
      author: "Sarah J.",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      quote:
        "I was struggling with my resume for months. ResumeCraft's ATS analysis showed me exactly what I was missing.",
      author: "Michael T.",
      role: "Marketing Manager",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      quote:
        "The resume templates are professional and modern. I received compliments from recruiters about my resume design.",
      author: "Emily R.",
      role: "UX Designer",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ]

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Join thousands of job seekers who have improved their job search with ResumeCraft
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="text-lg">{testimonial.quote}</p>
                </CardContent>
                <CardFooter className="flex items-center space-x-4 border-t px-6 py-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
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
