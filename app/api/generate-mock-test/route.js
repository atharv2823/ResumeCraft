import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { resumeData, difficulty, questionCount } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
      You are an expert interviewer. Based on the following resume data, generate ${questionCount} multiple-choice questions (MCQs) for a technical mock test.
      
      Difficulty Level: ${difficulty}
      
      Resume Data:
      ${JSON.stringify(resumeData)}
      
      Requirements:
      1. Focus on the skills, technologies, and experience mentioned in the resume.
      2. For 'Low' difficulty, focus on fundamental concepts.
      3. For 'Medium' difficulty, focus on application and intermediate concepts.
      4. For 'High' difficulty, focus on advanced architecture, problem-solving, and edge cases.
      5. Each question must have exactly 4 options.
      6. Return ONLY a valid JSON array of objects with this exact structure:
      [
        {
          "question": "string",
          "options": ["option1", "option2", "option3", "option4"],
          "correctAnswer": "the exact string from options array",
          "explanation": "brief explanation why this is correct"
        }
      ]
      
      Do not include any markdown, code blocks, or extra text.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting
    const jsonString = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const questions = JSON.parse(jsonString);
      return NextResponse.json(questions);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, responseText);
      return NextResponse.json(
        { error: "Failed to parse AI response", details: responseText },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Mock test generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate mock test", details: error.message },
      { status: 500 }
    );
  }
}
