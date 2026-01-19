import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

// Initialize the Gemini API with your API key
const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY)

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get("resume")

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("Processing file:", file.name, "Type:", file.type)

    // Check file type and size
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Please upload a PDF or Word document." }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 })
    }

    // Convert file to base64 for processing
    const buffer = await file.arrayBuffer()
    const base64 = Buffer.from(buffer).toString("base64")
    const mimeType = file.type

    try {
      // Use Gemini Pro model to analyze the resume
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(`
        Analyze this resume file for ATS compatibility and provide detailed feedback.
        
        The file is base64 encoded with MIME type: ${mimeType}
        Base64 content: ${base64}
        
        Please provide:
        1. An overall ATS compatibility score (0-100)
        2. Category scores for: Content Quality, Keyword Optimization, Formatting, Experience Description
        3. 5 specific improvement suggestions
        4. A list of detected keywords that are valuable for ATS
      `);

      const response = await result.response;
      const analysisResult = JSON.parse(response.text());
      return NextResponse.json(analysisResult);

    } catch (aiError) {
      console.error("AI processing error:", aiError)
      return NextResponse.json(
        { 
          error: "Failed to analyze resume", 
          message: aiError.message 
        }, 
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { 
        error: "Failed to process request", 
        message: error.message 
      }, 
      { status: 500 }
    )
  }
}
