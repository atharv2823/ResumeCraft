"use client"

import { useRef } from "react"

export function ResumePreview({ data, format }) {
  const previewRef = useRef(null)

  const renderModernTemplate = () => (
    <div className="p-6 bg-white text-black" ref={previewRef}>
      <div className="text-center mb-6">
        {data.personalInfo.photo && (
          <div className="mb-4 flex justify-center">
            <img 
              src={data.personalInfo.photo} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-sm"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight">{data.personalInfo.name || "Your Name"}</h1>
        <p className="text-xl text-gray-600 mt-1">{data.personalInfo.title || "Professional Title"}</p>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
          {data.personalInfo.email && (
            <span className="flex items-center">
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center">
              • {data.personalInfo.phone}
            </span>
          )}
          {(data.personalInfo.city || data.personalInfo.country) && (
            <span className="flex items-center">
               • {[data.personalInfo.city, data.personalInfo.state, data.personalInfo.country].filter(Boolean).join(", ")} {data.personalInfo.pincode}
            </span>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-sm text-blue-600">
          {data.personalInfo.linkedin && (
             <a href={data.personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
          )}
          {data.personalInfo.portfolio && (
             <a href={data.personalInfo.portfolio} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
          )}
           {data.personalInfo.github && (
             <a href={data.personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
          )}
           {data.personalInfo.dribbble && (
             <a href={data.personalInfo.dribbble} target="_blank" rel="noreferrer" className="hover:underline">Dribbble</a>
          )}
        </div>
      </div>

      {data.personalInfo.summary && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">Summary</h2>
          <p className="text-sm">{data.personalInfo.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{exp.position || "Position"}</h3>
                  <p className="text-sm">{exp.company || "Company"}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {exp.startDate || "Start Date"} - {exp.endDate || "Present"}
                </p>
              </div>
              <p className="text-sm mt-1">{exp.description || "Description"}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{edu.institution || "Institution"}</h3>
                  <p className="text-sm">
                    {edu.degree || "Degree"} {edu.field ? `in ${edu.field}` : ""}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                </p>
              </div>
              {edu.gpa && <p className="text-sm mt-1">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {(data.languages?.length > 0 || data.hobbies?.length > 0 || data.extraCurricular?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {data.languages?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">Languages</h2>
              <ul className="list-disc list-inside text-sm">
                {data.languages.map((lang, index) => (
                  <li key={index}>{lang}</li>
                ))}
              </ul>
            </div>
          )}

          {data.hobbies?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">Hobbies</h2>
               <p className="text-sm">{data.hobbies.join(", ")}</p>
            </div>
          )}
        </div>
      )}
      
       {data.extraCurricular?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 mb-2">Extra-Curricular Activities</h2>
          <ul className="list-disc list-inside text-sm">
            {data.extraCurricular.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  const renderMinimalistTemplate = () => (
    <div className="p-6 bg-white text-black" ref={previewRef}>
      <div className="mb-6 flex gap-6 items-start">
        {data.personalInfo.photo && (
           <img 
              src={data.personalInfo.photo} 
              alt="Profile" 
              className="w-24 h-24 rounded object-cover grayscale"
            />
        )}
        <div>
          <h1 className="text-4xl font-light uppercase tracking-widest">{data.personalInfo.name || "Your Name"}</h1>
          <p className="text-gray-500 uppercase tracking-widest mt-1 text-sm">{data.personalInfo.title || "Professional Title"}</p>
          <div className="flex flex-col gap-1 mt-3 text-xs text-gray-500">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
             {(data.personalInfo.city || data.personalInfo.country) && (
              <span>
                 {[data.personalInfo.city, data.personalInfo.state, data.personalInfo.country].filter(Boolean).join(", ")} {data.personalInfo.pincode}
              </span>
            )}
             <div className="flex gap-2 text-black mt-1">
                {data.personalInfo.linkedin && <a href={data.personalInfo.linkedin} className="hover:underline">LinkedIn</a>}
                {data.personalInfo.portfolio && <a href={data.personalInfo.portfolio} className="hover:underline">Portfolio</a>}
             </div>
          </div>
        </div>
      </div>

      {data.personalInfo.summary && (
        <div className="mb-4">
          <h2 className="text-md font-semibold uppercase tracking-wider mb-2">Profile</h2>
          <p className="text-sm">{data.personalInfo.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-md font-semibold uppercase tracking-wider mb-2">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{exp.position || "Position"}</h3>
                <p className="text-sm text-gray-600">
                  {exp.startDate || "Start Date"} - {exp.endDate || "Present"}
                </p>
              </div>
              <p className="text-sm text-gray-600">{exp.company || "Company"}</p>
              <p className="text-sm mt-1">{exp.description || "Description"}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-md font-semibold uppercase tracking-wider mb-2">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">
                  {edu.degree || "Degree"} {edu.field ? `in ${edu.field}` : ""}
                </h3>
                <p className="text-sm text-gray-600">
                  {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                </p>
              </div>
              <p className="text-sm text-gray-600">{edu.institution || "Institution"}</p>
              {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mt-6">
          <h2 className="text-md font-semibold uppercase tracking-wider mb-2">Skills</h2>
          <p className="text-sm border-t pt-2">{data.skills.join(" • ")}</p>
        </div>
      )}

      {(data.languages?.length > 0) && (
        <div className="mt-4">
          <h2 className="text-md font-semibold uppercase tracking-wider mb-2">Languages</h2>
          <p className="text-sm">{data.languages.join(" • ")}</p>
        </div>
      )}

       {(data.hobbies?.length > 0) && (
        <div className="mt-4">
          <h2 className="text-md font-semibold uppercase tracking-wider mb-2">Interests</h2>
          <p className="text-sm">{data.hobbies.join(" • ")}</p>
        </div>
      )}

       {(data.extraCurricular?.length > 0) && (
        <div className="mt-4">
          <h2 className="text-md font-semibold uppercase tracking-wider mb-2">Activities</h2>
           <ul className="text-sm list-none space-y-1">
            {data.extraCurricular.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  const renderProfessionalTemplate = () => (
    <div className="p-6 bg-white text-black" ref={previewRef}>
      <div className="border-b-4 border-blue-800 pb-6 mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-blue-900 uppercase">{data.personalInfo.name || "Your Name"}</h1>
          <p className="text-xl font-medium text-gray-700 mt-2">{data.personalInfo.title || "Professional Title"}</p>
        </div>
        
         {data.personalInfo.photo && (
           <img 
              src={data.personalInfo.photo} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-900"
            />
        )}
      </div>

       <div className="bg-gray-50 p-4 mb-6 rounded text-sm grid grid-cols-2 gap-4 border-l-4 border-blue-900">
          <div>
            {data.personalInfo.email && <div className="font-medium">{data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
             {(data.personalInfo.city || data.personalInfo.country) && (
              <div>
                 {[data.personalInfo.city, data.personalInfo.state, data.personalInfo.country].filter(Boolean).join(", ")} {data.personalInfo.pincode}
              </div>
            )}
          </div>
          <div className="text-right">
             {data.personalInfo.linkedin && <div><a href={data.personalInfo.linkedin} className="text-blue-800 hover:underline">LinkedIn Profile</a></div>}
             {data.personalInfo.portfolio && <div><a href={data.personalInfo.portfolio} className="text-blue-800 hover:underline">Portfolio</a></div>}
             {data.personalInfo.github && <div><a href={data.personalInfo.github} className="text-blue-800 hover:underline">GitHub</a></div>}
          </div>
        </div>

      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Professional Summary</h2>
          <p className="text-sm">{data.personalInfo.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Professional Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold">{exp.position || "Position"}</h3>
                <p className="text-sm">
                  {exp.startDate || "Start Date"} - {exp.endDate || "Present"}
                </p>
              </div>
              <p className="text-sm font-semibold">{exp.company || "Company"}</p>
              <p className="text-sm mt-1">{exp.description || "Description"}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold">{edu.institution || "Institution"}</h3>
                <p className="text-sm">
                  {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                </p>
              </div>
              <p className="text-sm font-semibold">
                {edu.degree || "Degree"} {edu.field ? `in ${edu.field}` : ""}
              </p>
              {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {(data.languages?.length > 0) && (
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-2">Languages</h2>
             <ul className="text-sm space-y-1">
                {data.languages.map((lang, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    {lang}
                  </li>
                ))}
            </ul>
          </div>
        )}

         {(data.hobbies?.length > 0) && (
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-2">Hobbies</h2>
            <p className="text-sm">{data.hobbies.join(", ")}</p>
          </div>
        )}
      </div>

       {(data.extraCurricular?.length > 0) && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Extra-Curricular Activities</h2>
           <ul className="text-sm space-y-1">
            {data.extraCurricular.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  const renderTemplate = () => {
    switch (format) {
      case "modern":
        return renderModernTemplate()
      case "minimalist":
        return renderMinimalistTemplate()
      case "professional":
        return renderProfessionalTemplate()
      default:
        return renderModernTemplate()
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
      <div className="max-h-[500px] overflow-y-auto scale-[0.8] origin-top">{renderTemplate()}</div>
    </div>
  )
}
