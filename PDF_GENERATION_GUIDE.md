# PDF Generation with Puppeteer - Vercel Deployment Guide

## Overview
This API route (`/api/generate-pdf`) generates PDFs from HTML content using Puppeteer. It's configured to work both locally and on Vercel deployments.

## How It Works

### Environment Detection
The code automatically detects whether it's running on Vercel or locally:
```javascript
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
```

### Browser Configuration

#### On Vercel (Production)
- Uses `chrome-aws-lambda` which provides a pre-compiled Chromium binary optimized for AWS Lambda/Vercel
- Automatically configures the correct executable path and arguments

#### Local Development (Windows)
- Uses your local Chrome installation
- Default path: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- You can override this by setting the `CHROME_PATH` environment variable

### API Usage

**Endpoint:** `POST /api/generate-pdf`

**Request Body:**
```json
{
  "html": "<div>Your HTML content here</div>",
  "fileName": "custom-name.pdf"  // Optional, defaults to "resume.pdf"
}
```

**Response:**
- Content-Type: `application/pdf`
- The PDF file will be downloaded automatically

### Example Usage in Your App

```javascript
const generatePDF = async (htmlContent) => {
  const response = await fetch('/api/generate-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html: htmlContent,
      fileName: 'my-resume.pdf'
    }),
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-resume.pdf';
    a.click();
  }
};
```

## Local Development Setup

### If Chrome is not in the default location:
Create a `.env.local` file in your project root:
```
CHROME_PATH=C:\Path\To\Your\Chrome.exe
```

Common Chrome paths on Windows:
- `C:\Program Files\Google\Chrome\Application\chrome.exe`
- `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`

For Edge:
- `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`

## Vercel Deployment

### Required Configuration
No special configuration needed! The code automatically uses `chrome-aws-lambda` when deployed to Vercel.

### Important Notes
1. **Function Timeout**: PDF generation can take a few seconds. Make sure your Vercel plan supports adequate function execution time.
2. **Memory**: Chrome requires significant memory. Vercel's default should be sufficient, but if you encounter issues, you may need to upgrade your plan.

## Dependencies
- `puppeteer-core`: Lightweight version of Puppeteer (doesn't bundle Chromium)
- `chrome-aws-lambda`: Provides Chromium binary for serverless environments

## Troubleshooting

### Local Development Issues
**Error: "Failed to launch the browser process"**
- Solution: Verify Chrome is installed and the path is correct
- Set `CHROME_PATH` environment variable to your Chrome executable

### Vercel Deployment Issues
**Error: "Protocol error" or timeout**
- Solution: The function might be timing out. Check Vercel function logs
- Consider optimizing your HTML or upgrading your Vercel plan for longer execution time

**Error: "Cannot find module 'chrome-aws-lambda'"**
- Solution: Make sure dependencies are installed correctly
- Run `npm install` before deploying

## PDF Options
The current configuration uses:
- **Format**: A4
- **Print Background**: Yes (includes background colors and images)
- **Margins**: 20px on all sides

You can modify these in the `page.pdf()` call in `route.js`.
