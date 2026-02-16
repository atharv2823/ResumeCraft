import { NextResponse } from 'next/server';

export async function POST(req) {
  let browser;
  
  try {
    const { html, fileName = 'resume.pdf' } = await req.json();

    if (!html) {
      return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
    }

    // Dynamically import puppeteer to avoid bundling issues
    let puppeteer;
    let launchOptions;

    // Detect if running on Vercel or production
    const isProduction = process.env.VERCEL === '1' || process.env.VERCEL_ENV || process.env.NODE_ENV === 'production';

    if (isProduction) {
      // For production/Vercel - use chromium
      const chromium = await import('@sparticuz/chromium');
      puppeteer = await import('puppeteer-core');
      
      launchOptions = {
        executablePath: await chromium.default.executablePath(),
        headless: chromium.default.headless,
        args: chromium.default.args,
      };
    } else {
      // For local development - use full puppeteer with bundled Chromium
      puppeteer = await import('puppeteer');
      
      launchOptions = {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      };
    }

    // Launch puppeteer
    browser = await puppeteer.default.launch(launchOptions);

    const page = await browser.newPage();

    // Set HTML content with Tailwind CDN for styling
    // Note: In a production app, you might want to use your compiled CSS instead of CDN for exact consistency
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
          <script>
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    border: "hsl(var(--border))",
                    input: "hsl(var(--input))",
                    ring: "hsl(var(--ring))",
                    background: "hsl(var(--background))",
                    foreground: "hsl(var(--foreground))",
                    primary: {
                      DEFAULT: "hsl(var(--primary))",
                      foreground: "hsl(var(--primary-foreground))",
                    },
                    secondary: {
                      DEFAULT: "hsl(var(--secondary))",
                      foreground: "hsl(var(--secondary-foreground))",
                    },
                    destructive: {
                      DEFAULT: "hsl(var(--destructive))",
                      foreground: "hsl(var(--destructive-foreground))",
                    },
                    muted: {
                      DEFAULT: "hsl(var(--muted))",
                      foreground: "hsl(var(--muted-foreground))",
                    },
                    accent: {
                      DEFAULT: "hsl(var(--accent))",
                      foreground: "hsl(var(--accent-foreground))",
                    },
                    popover: {
                      DEFAULT: "hsl(var(--popover))",
                      foreground: "hsl(var(--popover-foreground))",
                    },
                    card: {
                      DEFAULT: "hsl(var(--card))",
                      foreground: "hsl(var(--card-foreground))",
                    },
                  },
                },
              },
            }
          </script>
          <style>
              /* Add any custom fonts or extra styles here */
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
              @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap');
              body { font-family: 'Inter', sans-serif; }
          </style>
        </head>
        <body class="bg-gray-100 p-0 m-0 flex justify-center">
            ${html}
        </body>
      </html>
    `;

    await page.setContent(fullHtml, {
      waitUntil: 'networkidle0', // Wait for assets like fonts or images to load
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });

    // Create response with PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}