"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { ResumeAnalysisResults } from "@/components/resume-analysis-results"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
// Import the FileUpload component
import { FileUpload } from "@/components/file-upload"

export default function ScanResumePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [file, setFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleScanResume = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a resume file to scan.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    const formData = new FormData()
    formData.append("resume", file)

    try {
      console.log("Scanning resume:", file.name)

      // Use mock data for development/testing to avoid API errors
      // In production, you would uncomment the API call below
      /*
      const response = await fetch("/api/scan-resume", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to scan resume")
      }

      const results = await response.json()
      */

      // Mock data for development/testing
      const results = {
        overall: 78,
        categories: [
          { name: "Content Quality", score: 82 },
          { name: "Keyword Optimization", score: 65 },
          { name: "Formatting", score: 90 },
          { name: "Experience Description", score: 75 },
        ],
        suggestions: [
          "Add more quantifiable achievements to your work experience.",
          "Include industry-specific keywords relevant to your target role.",
          "Ensure your resume has a clear and consistent formatting structure.",
          "Elaborate on technical skills with specific examples of implementation.",
          "Consider adding a brief professional summary at the top of your resume.",
        ],
        keywords: [
          "project management",
          "leadership",
          "communication",
          "teamwork",
          "problem-solving",
          "JavaScript",
          "React",
        ],
        missingKeywords: ["agile", "scrum", "data analysis", "strategic planning"],
        contentAnalysis: [
          {
            section: "Summary",
            analysis: "Your summary is concise but could be more impactful with specific achievements.",
            score: 70,
          },
          {
            section: "Experience",
            analysis: "Work experience is well-structured but lacks quantifiable results.",
            score: 75,
          },
          { section: "Education", analysis: "Education section is complete and well-formatted.", score: 90 },
          {
            section: "Skills",
            analysis: "Skills section could benefit from more industry-specific keywords.",
            score: 65,
          },
        ],
      }

      setAnalysisResults(results)
    } catch (error) {
      console.error("Error scanning resume:", error)
      toast({
        title: "Scan Failed",
        description: error.message || "Could not scan your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Scan Your Resume</h1>

          {!analysisResults ? (
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Upload Your Resume</CardTitle>
                <CardDescription>
                  Upload your resume to analyze its ATS score and get improvement suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FileUpload onFileSelect={setFile} accept=".pdf,.doc,.docx" maxSize={5} />
                {file && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="font-medium">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      Remove
                    </Button>
                  </div>
                )}

                <Button onClick={handleScanResume} disabled={!file || isAnalyzing} className="w-full">
                  {isAnalyzing ? "Analyzing Resume..." : "Scan Resume"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <ResumeAnalysisResults results={analysisResults} onScanAnother={() => setAnalysisResults(null)} />
          )}
        </main>
      </div>
    </div>
  )
}
