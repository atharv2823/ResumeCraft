import { NextResponse } from "next/server"
import puppeteer from "puppeteer"

export async function POST(request) {
  try {
    const { resumeData, format } = await request.json()

    // Create HTML template based on the selected format
    const htmlContent = generateResumeHTML(resumeData, format)

    // Launch a headless browser
    const browser = await puppeteer.launch({ 
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // Added for better compatibility
    })
    const page = await browser.newPage()

    // Set content and generate PDF
    await page.setContent(htmlContent)
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0.5in",
        right: "0.5in",
        bottom: "0.5in",
        left: "0.5in",
      },
    })

    await browser.close()

    // Return the PDF
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${resumeData.personalInfo.name || "resume"}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}

function generateResumeHTML(data, format) {
  // Different HTML templates based on format
  let template = ''
  
  switch (format) {
    case 'modern':
      template = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${data.personalInfo.name || 'Resume'}</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 5px 0; color: #666; }
            .contact-info { display: flex; justify-content: center; gap: 20px; margin-top: 10px; font-size: 14px; }
            .section { margin-bottom: 25px; }
            .section-title { border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 15px; font-size: 18px; }
            .item { margin-bottom: 15px; }
            .item-header { display: flex; justify-content: space-between; }
            .item-title { font-weight: bold; }
            .item-subtitle { color: #666; }
            .item-date { color: #666; font-size: 14px; }
            .item-description { margin-top: 5px; font-size: 14px; }
            .skills { display: flex; flex-wrap: wrap; gap: 8px; }
            .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              ${data.personalInfo.photo ? `<img src="${data.personalInfo.photo}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 10px;" />` : ''}
              <h1>${data.personalInfo.name || 'Your Name'}</h1>
              <p>${data.personalInfo.title || 'Professional Title'}</p>
              <div class="contact-info" style="flex-wrap: wrap;">
                ${data.personalInfo.email ? `<span>${data.personalInfo.email}</span>` : ''}
                ${data.personalInfo.phone ? `<span>${data.personalInfo.phone}</span>` : ''}
                ${(data.personalInfo.city || data.personalInfo.country) ? `<span>${[data.personalInfo.city, data.personalInfo.state, data.personalInfo.country].filter(Boolean).join(", ")} ${data.personalInfo.pincode || ''}</span>` : ''}
              </div>
               <div class="contact-info" style="font-size: 12px; margin-top: 5px; color: #2563eb;">
                ${data.personalInfo.linkedin ? `<a href="${data.personalInfo.linkedin}" style="color: #2563eb; text-decoration: none; margin: 0 5px;">LinkedIn</a>` : ''}
                ${data.personalInfo.portfolio ? `<a href="${data.personalInfo.portfolio}" style="color: #2563eb; text-decoration: none; margin: 0 5px;">Portfolio</a>` : ''}
                 ${data.personalInfo.github ? `<a href="${data.personalInfo.github}" style="color: #2563eb; text-decoration: none; margin: 0 5px;">GitHub</a>` : ''}
              </div>
            </div>
            
            ${data.personalInfo.summary ? `
            <div class="section">
              <h2 class="section-title">Summary</h2>
              <p>${data.personalInfo.summary}</p>
            </div>
            ` : ''}
            
            ${data.experience.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Experience</h2>
              ${data.experience.map(exp => `
                <div class="item">
                  <div class="item-header">
                    <div>
                      <div class="item-title">${exp.position || 'Position'}</div>
                      <div class="item-subtitle">${exp.company || 'Company'}</div>
                    </div>
                    <div class="item-date">
                      ${exp.startDate || 'Start Date'} - ${exp.endDate || 'Present'}
                    </div>
                  </div>
                  <div class="item-description">${exp.description || 'Description'}</div>
                </div>
              `).join('')}
            </div>
            ` : ''}
            
            ${data.education.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Education</h2>
              ${data.education.map(edu => `
                <div class="item">
                  <div class="item-header">
                    <div>
                      <div class="item-title">${edu.institution || 'Institution'}</div>
                      <div class="item-subtitle">${edu.degree || 'Degree'} ${edu.field ? `in ${edu.field}` : ''}</div>
                    </div>
                    <div class="item-date">
                      ${edu.startDate || 'Start Date'} - ${edu.endDate || 'End Date'}
                    </div>
                  </div>
                  ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ''}
                </div>
              `).join('')}
            </div>
            ` : ''}
            
            ${data.skills.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Skills</h2>
              <div class="skills">
                ${data.skills.map(skill => `
                  <div class="skill">${skill}</div>
                `).join('')}
              </div>
            </div>
            ` : ''}

            ${data.languages && data.languages.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Languages</h2>
              <div class="skills">
                ${data.languages.map(lang => `
                  <div class="skill">${lang}</div>
                `).join('')}
              </div>
            </div>
            ` : ''}

            ${data.hobbies && data.hobbies.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Hobbies</h2>
               <p>${data.hobbies.join(', ')}</p>
            </div>
            ` : ''}
            
             ${data.extraCurricular && data.extraCurricular.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Extra-Curricular Activities</h2>
              <ul style="padding-left: 20px; margin: 0;">
                ${data.extraCurricular.map(item => `
                  <li>${item}</li>
                `).join('')}
              </ul>
            </div>
            ` : ''}
          </div>
        </body>
        </html>
      `
      break
      
    case 'professional':
      template = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${data.personalInfo.name || 'Resume'}</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 40px; }
            .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { margin: 0; font-size: 32px; color: #2563eb; }
            .header p { margin: 5px 0; font-size: 18px; }
            .contact-info { display: flex; gap: 20px; margin-top: 10px; font-size: 14px; }
            .section { margin-bottom: 30px; }
            .section-title { color: #2563eb; margin-bottom: 15px; font-size: 20px; }
            .item { margin-bottom: 20px; }
            .item-header { display: flex; justify-content: space-between; }
            .item-title { font-weight: bold; font-size: 16px; }
            .item-subtitle { font-weight: 600; color: #555; }
            .item-date { color: #666; font-size: 14px; }
            .item-description { margin-top: 5px; font-size: 14px; }
            .skills { display: flex; flex-wrap: wrap; gap: 8px; }
            .skill { background: #e6f0ff; color: #2563eb; padding: 5px 12px; border-radius: 20px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                   <h1>${data.personalInfo.name || 'Your Name'}</h1>
                   <p>${data.personalInfo.title || 'Professional Title'}</p>
                </div>
                 ${data.personalInfo.photo ? `<img src="${data.personalInfo.photo}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid #2563eb;" />` : ''}
              </div>
             
              <div class="contact-info" style="display: block; margin-top: 15px;">
                 <div style="display: flex; gap: 15px; margin-bottom: 5px;">
                  ${data.personalInfo.email ? `<span>${data.personalInfo.email}</span>` : ''}
                  ${data.personalInfo.phone ? `<span>${data.personalInfo.phone}</span>` : ''}
                   ${(data.personalInfo.city || data.personalInfo.country) ? `<span>${[data.personalInfo.city, data.personalInfo.state, data.personalInfo.country].filter(Boolean).join(", ")} ${data.personalInfo.pincode || ''}</span>` : ''}
                 </div>
                 <div style="display: flex; gap: 15px; font-size: 13px;">
                    ${data.personalInfo.linkedin ? `<a href="${data.personalInfo.linkedin}" style="color: #2563eb;">LinkedIn</a>` : ''}
                    ${data.personalInfo.portfolio ? `<a href="${data.personalInfo.portfolio}" style="color: #2563eb;">Portfolio</a>` : ''}
                 </div>
              </div>
            </div>
            
            ${data.personalInfo.summary ? `
            <div class="section">
              <h2 class="section-title">Professional Summary</h2>
              <p>${data.personalInfo.summary}</p>
            </div>
            ` : ''}
            
            ${data.experience.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Professional Experience</h2>
              ${data.experience.map(exp => `
                <div class="item">
                  <div class="item-header">
                    <div class="item-title">${exp.position || 'Position'}</div>
                    <div class="item-date">
                      ${exp.startDate || 'Start Date'} - ${exp.endDate || 'Present'}
                    </div>
                  </div>
                  <div class="item-subtitle">${exp.company || 'Company'}</div>
                  <div class="item-description">${exp.description || 'Description'}</div>
                </div>
              `).join('')}
            </div>
            ` : ''}
            
            ${data.education.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Education</h2>
              ${data.education.map(edu => `
                <div class="item">
                  <div class="item-header">
                    <div class="item-title">${edu.institution || 'Institution'}</div>
                    <div class="item-date">
                      ${edu.startDate || 'Start Date'} - ${edu.endDate || 'End Date'}
                    </div>
                  </div>
                  <div class="item-subtitle">${edu.degree || 'Degree'} ${edu.field ? `in ${edu.field}` : ''}</div>
                  ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ''}
                </div>
              `).join('')}
            </div>
            ` : ''}
            
            ${data.skills.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Skills</h2>
              <div class="skills">
                ${data.skills.map(skill => `
                  <div class="skill">${skill}</div>
                `).join('')}
              </div>
            </div>
            ` : ''}

            ${data.languages && data.languages.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Languages</h2>
               <ul style="padding-left: 20px;">
                ${data.languages.map(lang => `
                  <li>${lang}</li>
                `).join('')}
              </ul>
            </div>
            ` : ''}

             ${data.hobbies && data.hobbies.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Hobbies</h2>
               <p>${data.hobbies.join(', ')}</p>
            </div>
            ` : ''}
            
             ${data.extraCurricular && data.extraCurricular.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Extra-Curricular Activities</h2>
              <ul style="padding-left: 20px;">
                ${data.extraCurricular.map(item => `
                  <li>${item}</li>
                `).join('')}
              </ul>
            </div>
            ` : ''}
          </div>
        </body>
        </html>
      `
      break
      
    case 'minimalist':
    default:
      template = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${data.personalInfo.name || 'Resume'}</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; color: #333; line-height: 1.6; }
            .container { max-width: 800px; margin: 0 auto; padding: 40px; }
            .header { margin-bottom: 30px; }
            .header h1 { margin: 0; font-size: 24px; }
            .header p { margin: 5px 0; color: #666; }
            .contact-info { margin-top: 10px; font-size: 14px; }
            .contact-info span { display: block; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; }
            .item { margin-bottom: 15px; }
            .item-header { margin-bottom: 5px; }
            .item-title { font-weight: bold; }
            .item-subtitle { color: #666; }
            .item-date { font-size: 14px; color: #666; }
            .item-description { font-size: 14px; }
            .skills { display: flex; flex-wrap: wrap; gap: 10px; }
            .skill { font-size: 14px; background: #f5f5f5; padding: 4px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${data.personalInfo.name || 'Your Name'}</h1>
              <p>${data.personalInfo.title || 'Professional Title'}</p>
              <div class="contact-info">
                ${data.personalInfo.email ? `<span>${data.personalInfo.email}</span>` : ''}
                ${data.personalInfo.phone ? `<span>${data.personalInfo.phone}</span>` : ''}
                ${data.personalInfo.location ? `<span>${data.personalInfo.location}</span>` : ''}
              </div>
            </div>
            
            ${data.personalInfo.summary ? `
            <div class="section">
              <h2 class="section-title">Summary</h2>
              <p>${data.personalInfo.summary}</p>
            </div>
            ` : ''}
            
            ${data.experience.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Experience</h2>
              ${data.experience.map(exp => `
                <div class="item">
                  <div class="item-header">
                    <div class="item-header">
                      <div class="item-title">${exp.position || 'Position'}</div>
                      <div class="item-subtitle">${exp.company || 'Company'}</div>
                    </div>
                    <div class="item-date">${exp.startDate || 'Start Date'} - ${exp.endDate || 'Present'}</div>
                  </div>
                  <div class="item-description">${exp.description || ''}</div>
                </div>
              `).join('')}
            </div>
            ` : ''}
            
            ${data.education.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Education</h2>
              ${data.education.map(edu => `
                <div class="item">
                  <div class="item-header">
                    <div class="item-title">${edu.institution || 'Institution'}</div>
                    <div class="item-subtitle">${edu.degree || 'Degree'} ${edu.field ? `in ${edu.field}` : ''}</div>
                    <div class="item-date">${edu.startDate || 'Start Date'} - ${edu.endDate || 'End Date'}</div>
                  </div>
                  ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ''}
                </div>
              `).join('')}
            </div>
            ` : ''}
            
            ${data.skills.length > 0 ? `
            <div class="section">
              <h2 class="section-title">Skills</h2>
              <div class="skills">
                ${data.skills.map(skill => `
                  <div class="skill">${skill}</div>
                `).join('')}
              </div>
            </div>
            ` : ''}
          </div>
        </body>
        </html>
      `
      break
  }
  
  return template
}
            