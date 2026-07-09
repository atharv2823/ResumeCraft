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

    const formData = await request.formData();
    const file = formData.get("resume");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("Processing file:", file.name, "Type:", file.type);

    // Check file type and size
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF or Word document." },
        { status: 400 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB." },
        { status: 400 },
      );
    }

    // Convert file to base64 for processing
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const mimeType = file.type;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Analyze this resume file for ATS compatibility and provide detailed feedback.

The file is base64 encoded with MIME type: ${mimeType}
Base64 content: ${base64}

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

    let result;
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (err) {
        if (attempt === maxAttempts) throw err;
        console.warn(`Gemini API attempt ${attempt} failed. Retrying in 2s...`, err.message);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
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
    console.error("Resume scan error:", error);
    return NextResponse.json(
      { error: "Failed to scan resume", details: error.message },
      { status: 500 },
    );
  }
}
