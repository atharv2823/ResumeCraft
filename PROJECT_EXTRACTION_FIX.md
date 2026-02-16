# Resume Project Extraction - Fix Summary

## Issue
The `/api/extract-resume` endpoint was not extracting project information from uploaded PDF resumes.

## Root Cause
1. The AI prompt in `app/api/extract-resume/route.js` did not include a "projects" field in the expected JSON structure
2. The frontend transformation logic in `app/create-resume/page.js` did not map the projects data from the API response

## Changes Made

### 1. Updated API Route (`app/api/extract-resume/route.js`)
**Added projects field to the AI extraction prompt:**

```javascript
"projects": [
  {
    "title": "",
    "description": "",
    "technologies": [],
    "link": "",
    "duration": ""
  }
]
```

This tells the Gemini AI model to extract project information with:
- **title**: Project name
- **description**: Brief description of the project
- **technologies**: Array of technologies/tools used
- **link**: URL to project (GitHub, live demo, etc.)
- **duration**: Time period when the project was created/worked on (e.g., "Jan 2024 - Mar 2024", "Summer 2023", "2024")

### 2. Updated Frontend Page (`app/create-resume/page.js`)
**Added transformation logic for projects:**

```javascript
projects: (extractedData.projects || []).map((proj) => ({
  title: proj.title || "",
  description: proj.description || "",
  technologies: proj.technologies || [],
  link: proj.link || "",
  duration: proj.duration || "",
})),
```

This ensures that when a resume is uploaded:
1. Projects are extracted by the AI
2. Projects are properly transformed to match the component structure
3. Projects (including duration) are merged into the resume data state

## How It Works Now

### Upload Flow:
1. User uploads a PDF resume
2. PDF text is extracted using `pdfjs-dist`
3. Text is sent to Gemini AI with the updated prompt including projects
4. AI returns JSON with personalInfo, skills, experience, education, **and projects**
5. Frontend transforms and merges all data including projects
6. Projects appear in the resume builder

### Example Project Extraction:
If a resume contains:
```
Projects:
- E-commerce Website (Jan 2024 - Mar 2024)
  Built a full-stack e-commerce platform using React, Node.js, and MongoDB
  https://github.com/user/ecommerce
```

The AI will extract:
```json
{
  "title": "E-commerce Website",
  "description": "Built a full-stack e-commerce platform",
  "technologies": ["React", "Node.js", "MongoDB"],
  "link": "https://github.com/user/ecommerce",
  "duration": "Jan 2024 - Mar 2024"
}
```

## Testing
To test the fix:
1. Upload a resume PDF that contains a projects section
2. Verify that projects appear in the resume builder
3. Check that all project fields (title, description, technologies, link) are populated

## Notes
- The AI model (`gemini-3-flash-preview`) will intelligently extract project information even if the resume format varies
- Technologies are extracted as an array, making them easy to display as tags/chips
- The link field is optional and will be empty if no URL is found
- The duration field is flexible and can handle various formats:
  - Date ranges: "Jan 2024 - Mar 2024", "2023 - 2024"
  - Single periods: "Summer 2023", "Q1 2024"
  - Years only: "2024"
  - The AI will extract whatever format is present in the resume
