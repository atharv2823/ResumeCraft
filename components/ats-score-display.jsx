"use client"

import { Progress } from "@/components/ui/progress"

export function AtsScoreDisplay({ score, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!score) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Add content to your resume to see your ATS score</p>
      </div>
    )
  }

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
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <span className="text-sm font-medium">ATS Compatibility Score</span>
        <span className={`text-2xl font-bold ${getScoreColor(score.overall)}`}>{score.overall}%</span>
      </div>

      <Progress value={score.overall} className={getProgressColor(score.overall)} />

      <div className="space-y-4 mt-6">
        <h3 className="font-medium">Score Breakdown</h3>

        <div className="space-y-2">
          {score.categories.map((category) => (
            <div key={category.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{category.name}</span>
                <span className={getScoreColor(category.score)}>{category.score}%</span>
              </div>
              <Progress value={category.score} className={getProgressColor(category.score)} />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">AI Suggestions</h3>
          <ul className="space-y-2 text-sm">
            {score.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Detected Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {score.keywords.map((keyword, index) => (
              <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
