import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai";

// Initialize the Generative AI model
const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get("resume")

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

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

    try {
      // Convert file to base64 for processing
      const buffer = await file.arrayBuffer()
      const base64 = Buffer.from(buffer).toString("base64")
      const mimeType = file.type

      // Use Google Generative AI to extract resume data
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(`
        Extract structured information from this resume file.
        
        The file is base64 encoded with MIME type: ${mimeType}
        Base64 content: ${base64}
        
        Extract the following information and format it as a JSON object:
        
        {
          "personalInfo": {
            "name": string,
            "email": string,
            "phone": string,
            "location": string,
            "title": string,
            "summary": string
          },
          "experience": [
            {
              "company": string,
              "position": string,
              "startDate": string (YYYY-MM format),
              "endDate": string (YYYY-MM format or "Present"),
              "description": string
            }
          ],
          "education": [
            {
              "institution": string,
              "degree": string,
              "field": string,
              "startDate": string (YYYY-MM format),
              "endDate": string (YYYY-MM format),
              "gpa": string
            }
          ],
          "skills": [string, string, ...]
        }
        
        Ensure all fields are properly extracted and formatted.
      `);

      const response = await result.response;
      const extractedData = JSON.parse(response.text());
      return NextResponse.json(extractedData);

    } catch (aiError) {
      console.error("AI processing error:", aiError)
      return NextResponse.json({ error: "Failed to process resume: " + aiError.message }, { status: 500 })
    }
  } catch (error) {
    console.error("Error extracting resume data:", error)
    return NextResponse.json({ error: "Failed to extract resume data: " + error.message }, { status: 500 })
  }
}
