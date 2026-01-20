import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const pdfParse = (await import('pdf-parse')).default ?? (await import('pdf-parse'));

    if (typeof pdfParse !== 'function') {
      throw new Error('pdf-parse is not a function');
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Missing GEMINI_API_KEY' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('resume');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const pdfData = await pdfParse(buffer);
    const pdfText = pdfData.text;

    if (!pdfText?.trim()) {
      return NextResponse.json(
        { error: 'Could not extract text from PDF' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
    });

    const prompt = `
Return STRICT JSON only.

{
  "personalInfo": {
    "name": "",
    "email": "",
    "phone": ""
  },
  "skills": [],
  "experience": [],
  "education": []
}

Resume Text:
"""${pdfText.slice(0, 15000)}"""
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonString = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    return NextResponse.json(JSON.parse(jsonString));

  } catch (error) {
    console.error('Resume parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to process resume', details: error.message },
      { status: 500 }
    );
  }
}
