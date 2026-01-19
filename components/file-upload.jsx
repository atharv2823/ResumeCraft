"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function FileUpload({ onFileSelect, accept = ".pdf,.doc,.docx", maxSize = 5 }) {
  const [dragActive, setDragActive] = useState(false)
  const { toast } = useToast()

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateFile = (file) => {
    // Check file type
    const acceptedTypes = accept.split(",").map((type) => type.trim())
    const fileExtension = "." + file.name.split(".").pop().toLowerCase()

    if (
      !acceptedTypes.some((type) => {
        // Handle mime types and extensions
        return type.startsWith(".") ? fileExtension === type : file.type.match(type)
      })
    ) {
      toast({
        title: "Invalid File Type",
        description: `Please upload a file with one of these formats: ${accept}`,
        variant: "destructive",
      })
      return false
    }

    // Check file size (in MB)
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: `Maximum file size is ${maxSize}MB`,
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        onFileSelect(file)
      }
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        onFileSelect(file)
      }
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input type="file" id="file-upload" accept={accept} onChange={handleChange} className="hidden" />
      <label htmlFor="file-upload" className="block cursor-pointer">
        <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <p className="text-lg font-medium">Click to upload or drag and drop</p>
        <p className="text-sm text-gray-500 mt-1">
          Supports {accept.replace(/\./g, "").toUpperCase()} (Max {maxSize}MB)
        </p>
      </label>
      <div className="mt-4">
        <Button variant="outline" onClick={() => document.getElementById("file-upload").click()}>
          Select File
        </Button>
      </div>
    </div>
  )
}
