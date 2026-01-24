import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const runtime = "nodejs";

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("resume");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Use pdfjs-dist for text extraction
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
    let pdfText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      pdfText += content.items.map((item) => item.str).join(" ") + "\n";
    }

    if (!pdfText?.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from PDF" },
        { status: 400 },
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
Extract information from the resume text and return ONLY a valid JSON object with this exact structure. Do not include any markdown, code blocks, or extra text.

{
  "personalInfo": {
    "name": "",
    "email": "",
    "phone": ""
  },
  "skills": [],
  "experience": [
    {
      "company": "",
      "role": "",
      "duration": "",
      "responsibilities": []
    }
  ],
  "education": [
    {
      "degree": "",
      "institution": "",
      "year": "",
      "score": ""
    }
  ]
}

Resume Text:
"""${pdfText.slice(0, 15000)}"""
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonString = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return NextResponse.json(JSON.parse(jsonString));
  } catch (error) {
    console.error("Resume parsing error:", error);
    return NextResponse.json(
      { error: "Failed to process resume", details: error.message },
      { status: 500 },
    );
  }
}
