"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

export function RecentResumes() {
  const router = useRouter()
  const [resumes, setResumes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching resumes from API
    const fetchResumes = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/resumes')
        // const data = await response.json()

        // Mock data for demonstration
        const mockData = [
          {
            id: "1",
            title: "Software Engineer Resume",
            lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            atsScore: 85,
          },
          {
            id: "2",
            title: "Product Manager Resume",
            lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            atsScore: 92,
          },
        ]

        setResumes(mockData)
      } catch (error) {
        console.error("Error fetching resumes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResumes()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Recent Resumes</h2>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-24 sm:h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Recent Resumes</h2>
      {resumes.length > 0 ? (
        <div className="space-y-4">
          {resumes.map((resume) => (
            <Card key={resume.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 sm:gap-0">
                <div>
                  <h3 className="font-medium text-base">{resume.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">
                    Last updated {formatDistanceToNow(resume.lastUpdated, { addSuffix: true })}
                  </p>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto border-t border-gray-100 dark:border-gray-800 sm:border-0 pt-3 sm:pt-0 sm:space-x-4">
                  <div className="flex items-center">
                    <div className="text-xs sm:text-sm font-medium mr-2">ATS Score:</div>
                    <div
                      className={`text-xs sm:text-sm font-bold px-2 py-0.5 sm:py-1 rounded ${
                        resume.atsScore >= 90
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : resume.atsScore >= 70
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                      }`}
                    >
                      {resume.atsScore}%
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="sm:border-transparent sm:bg-transparent" onClick={() => router.push(`/edit-resume/${resume.id}`)}>
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You haven't created any resumes yet</p>
          <Button onClick={() => router.push("/create-resume")}>Create Your First Resume</Button>
        </div>
      )}
    </div>
  )
}
