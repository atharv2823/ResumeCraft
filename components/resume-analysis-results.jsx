"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export function ResumeAnalysisResults({ results, onScanAnother }) {
  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressColor = (score) => {
    if (score >= 90) return "bg-green-600"
    if (score >= 70) return "bg-yellow-600"
    return "bg-red-600"
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Resume Analysis Results</CardTitle>
                <CardDescription>Here's how your resume performs against ATS systems</CardDescription>
              </div>
              <div className={`text-4xl font-bold ${getScoreColor(results.overall)}`}>{results.overall}%</div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={results.overall} className={`h-2 ${getProgressColor(results.overall)}`} />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.categories.map((category) => (
                <Card key={category.name}>
                  <CardHeader className="py-4">
                    <CardTitle className="text-sm">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Score</span>
                      <span className={`font-bold ${getScoreColor(category.score)}`}>{category.score}%</span>
                    </div>
                    <Progress value={category.score} className={getProgressColor(category.score)} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="suggestions">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="content">Content Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Improvement Suggestions</CardTitle>
                <CardDescription>AI-powered recommendations to improve your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {results.suggestions.map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="mr-4 mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div>
                        <p>{suggestion}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keywords" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Analysis</CardTitle>
                <CardDescription>Important keywords detected in your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Detected Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {results.keywords.map((keyword, index) => (
                        <span key={index} className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Missing Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {results.missingKeywords.map((keyword, index) => (
                        <span key={index} className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Analysis</CardTitle>
                <CardDescription>Detailed analysis of your resume content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results.contentAnalysis.map((section, index) => (
                    <div key={index}>
                      <h3 className="font-medium mb-2">{section.section}</h3>
                      <p className="text-sm mb-2">{section.analysis}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Strength</span>
                        <span className={`text-sm font-medium ${getScoreColor(section.score)}`}>{section.score}%</span>
                      </div>
                      <Progress value={section.score} className={`mt-1 ${getProgressColor(section.score)}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <div className="flex justify-center">
        <Button onClick={onScanAnother}>Scan Another Resume</Button>
      </div>
    </div>
  )
}
