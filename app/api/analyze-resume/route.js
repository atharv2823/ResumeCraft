import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 },
      );
    }

    const resumeData = await request.json();
    const resumeText = JSON.stringify(resumeData, null, 2);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
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
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response text
    const jsonString = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysisResult = JSON.parse(jsonString);
    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Resume analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume", details: error.message },
      { status: 500 },
    );
  }
}
