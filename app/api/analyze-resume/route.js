import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai";

// Initialize the Generative AI model
const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY);

export async function POST(request) {
  try {
    const resumeData = await request.json()
    const resumeText = JSON.stringify(resumeData, null, 2)

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(`
        Analyze this resume data for ATS compatibility and provide detailed feedback:
        
        ${resumeText}
        
        Please provide:
        1. An overall ATS compatibility score (0-100)
        2. Category scores for: Content Quality, Keyword Optimization, Formatting, Experience Description
        3. 5 specific improvement suggestions
        4. A list of detected keywords that are valuable for ATS
        5. A list of potentially missing keywords based on the job title
        6. Content analysis for each section
        
        Format the response as a JSON object with the following structure:
        {
          "overall": number,
          "categories": [
            {"name": "Content Quality", "score": number},
            {"name": "Keyword Optimization", "score": number},
            {"name": "Formatting", "score": number},
            {"name": "Experience Description", "score": number}
          ],
          "suggestions": [string, string, string, string, string],
          "keywords": [string, string, ...],
          "missingKeywords": [string, string, ...],
          "contentAnalysis": [
            {"section": "Summary", "analysis": string, "score": number},
            {"section": "Experience", "analysis": string, "score": number},
            {"section": "Education", "analysis": string, "score": number},
            {"section": "Skills", "analysis": string, "score": number}
          ]
        }
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
