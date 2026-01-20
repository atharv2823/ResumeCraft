"use client"
import { useState, useEffect, useRef } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function ResumeFormatSelector({ selectedFormat, onSelectFormat, data, gridClassName }) {
  const formats = [
    {
      id: "modern",
      name: "Modern",
      description: "Sleek split layout with a strong sidebar.",
      component: ModernFormat
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional top-header with clear hierarchy.",
      component: ProfessionalFormat
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Clean, centered, and distraction-free.",
      component: MinimalistFormat
    },
    {
      id: "creative",
      name: "Creative",
      description: "Unique right-sidebar layout for creatives.",
      component: CreativeFormat
    },
    {
      id: "tech",
      name: "Technical",
      description: "Monospace accents for code-savvy profiles.",
      component: TechFormat
    },
    {
      id: "elegant",
      name: "Elegant",
      description: "Sophisticated serif typography.",
      component: ElegantFormat
    }
  ]

  return (
    <div className="h-full">
      <RadioGroup
        value={selectedFormat}
        onValueChange={onSelectFormat}
        className={cn(
          "grid gap-6 pb-6",
           gridClassName || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {formats.map((format) => (
          <div key={format.id} className="relative group">
            <RadioGroupItem value={format.id} id={format.id} className="sr-only" />
            <Label htmlFor={format.id} className="cursor-pointer block relative">
              <div
                className={cn(
                  "relative overflow-hidden rounded-xl border-2 transition-all duration-300 aspect-[210/297] bg-white shadow-sm",
                  selectedFormat === format.id 
                    ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg scale-[1.02]" 
                    : "border-neutral-800 hover:border-neutral-700 hover:shadow-md opacity-80 hover:opacity-100"
                )}
              >
                 <ScaledResumePreview component={format.component} data={data} />
                 
                 {/* Selection Overlay */}
                 {selectedFormat === format.id && (
                    <div className="absolute inset-0 bg-blue-900/10 z-10 flex items-center justify-center">
                        <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                    </div>
                 )}
              </div>
              
              <div className="mt-3">
                 <div className="flex justify-between items-center">
                    <span className={cn("font-medium transition-colors", selectedFormat === format.id ? "text-blue-400" : "text-neutral-300")}>
                        {format.name}
                    </span>
                 </div>
                 <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{format.description}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

function ScaledResumePreview({ component: Component, data }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(0.4) // Initial fallback scale

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        // A4 width in pixels at 96 DPI is approximately 794px (210mm)
        const a4Width = 794
        const newScale = containerWidth / a4Width
        setScale(newScale)
      }
    }

    // Initial calculation
    updateScale()

    const observer = new ResizeObserver(updateScale)
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-white">
      <div 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top left',
          width: '794px', // Fixed A4 width
          height: '1123px' // Fixed A4 height
        }}
        className="pointer-events-none select-none"
      >
        <Component data={data || {}} />
      </div>
    </div>
  )
}

// --- Dynamic Format Components ---

const ModernFormat = ({ data }) => (
  <div className="flex h-full w-full bg-white font-sans text-xs leading-normal">
    <div className="w-1/3 bg-slate-900 text-white p-8 space-y-6">
      <div className="space-y-2">
         {data.personalInfo?.photo && (
            <img src={data.personalInfo.photo} className="w-24 h-24 rounded-full object-cover border-4 border-slate-700 mx-auto" />
         )}
         <div className="space-y-1 text-center">
             <h3 className="text-sm font-semibold text-slate-400 tracking-wider uppercase">Contact</h3>
             <div className="text-[10px] text-slate-300 space-y-1">
                <div>{data.personalInfo?.email}</div>
                <div>{data.personalInfo?.phone}</div>
                <div>{data.personalInfo?.location}</div>
             </div>
         </div>
      </div>

      <Section title="Skills" className="text-white border-slate-700">
         <div className="flex flex-wrap gap-1">
             {data.skills?.map((s, i) => <Badge key={i} variant="secondary" className="bg-slate-700 text-white hover:bg-slate-600 text-[10px] px-1 py-0">{s}</Badge>)}
         </div>
      </Section>
       <Section title="Languages" className="text-white border-slate-700">
         <div className="flex flex-col gap-1">
             {data.languages?.map((s, i) => <div key={i} className="text-[10px] text-slate-300">• {s}</div>)}
         </div>
      </Section>
    </div>
    
    <div className="w-2/3 p-8 space-y-6">
       <div className="border-b-2 border-slate-900 pb-4">
          <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900">{data.personalInfo?.name || "Your Name"}</h1>
          <p className="text-lg text-slate-500 font-medium tracking-wide">{data.personalInfo?.title || "Job Title"}</p>
          <p className="text-[11px] text-slate-600 mt-2">{data.personalInfo?.summary}</p>
       </div>

       <Section title="Experience">
           {data.experience?.map((exp, i) => (
               <div key={i} className="mb-3">
                   <div className="flex justify-between font-bold text-slate-800">
                       <span>{exp.position}</span>
                       <span className="text-slate-500 text-[10px]">{exp.startDate} - {exp.endDate}</span>
                   </div>
                   <div className="text-[10px] font-semibold text-slate-600">{exp.company}</div>
                   <p className="text-[10px] mt-1 text-slate-600">{exp.description}</p>
               </div>
           ))}
       </Section>

       <Section title="Projects">
           {data.projects?.map((exp, i) => (
               <div key={i} className="mb-3">
                   <div className="flex justify-between font-bold text-slate-800">
                       <span>{exp.title}</span>
                       <span className="text-slate-500 text-[10px]">{exp.duration}</span>
                   </div>
                   <div className="text-[10px] font-semibold text-blue-600">{exp.link}</div>
                   <p className="text-[10px] mt-1 text-slate-600">{exp.description}</p>
               </div>
           ))}
       </Section>

       <Section title="Education">
          {data.education?.map((edu, i) => (
             <div key={i} className="mb-2">
                 <div className="font-bold text-slate-800">{edu.institution}</div>
                 <div className="text-[10px] text-slate-600">{edu.degree} in {edu.field} ({edu.startDate} - {edu.endDate})</div>
             </div>
          ))}
       </Section>
    </div>
  </div>
)

const ProfessionalFormat = ({ data }) => (
  <div className="bg-white h-full w-full p-10 font-serif text-slate-800">
      <div className="border-b-4 border-black pb-4 mb-6">
          <div className="flex justify-between items-end">
             <div>
                <h1 className="text-4xl font-bold uppercase">{data.personalInfo?.name}</h1>
                <p className="text-xl italic text-slate-600">{data.personalInfo?.title}</p>
             </div>
             <div className="text-right text-[10px]">
                <div>{data.personalInfo?.email}</div>
                <div>{data.personalInfo?.phone}</div>
                <div>{data.personalInfo?.location}</div>
             </div>
          </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
          <SectionSimple title="Professional Summary">
              <p className="text-[11px]">{data.personalInfo?.summary}</p>
          </SectionSimple>
          
           <SectionSimple title="Experience">
              {data.experience?.map((exp, i) => (
                 <div key={i} className="mb-4">
                     <h4 className="font-bold text-sm">{exp.position} <span className="font-normal italic text-slate-600">at {exp.company}</span>  <span className="float-right text-[10px] font-normal">{exp.startDate} - {exp.endDate}</span></h4>
                     <p className="text-[11px] mt-1">{exp.description}</p>
                 </div>
              ))}
          </SectionSimple>

          <div className="grid grid-cols-2 gap-6">
             <SectionSimple title="Education">
                  {data.education?.map((edu, i) => (
                     <div key={i} className="mb-2">
                         <div className="font-bold text-xs">{edu.institution}</div>
                         <div className="text-[10px]">{edu.degree}</div>
                         <div className="text-[10px] italic">{edu.endDate}</div>
                     </div>
                  ))}
             </SectionSimple>
             <SectionSimple title="Skills">
                <div className="text-[11px] leading-relaxed">
                   {data.skills?.join(" • ")}
                </div>
             </SectionSimple>
          </div>
      </div>
  </div>
)

const MinimalistFormat = ({ data }) => (
  <div className="bg-white h-full w-full p-12 text-center font-sans">
     <div className="mb-8 space-y-3">
        <h1 className="text-3xl font-light tracking-[0.2em] uppercase text-slate-900">{data.personalInfo?.name}</h1>
        <p className="text-xs uppercase tracking-widest text-slate-500">{data.personalInfo?.title} | {data.personalInfo?.location}</p>
        <p className="text-[10px] text-slate-400">{data.personalInfo?.email} • {data.personalInfo?.phone} • {data.personalInfo?.linkedin}</p>
     </div>
     
     <div className="max-w-[80%] mx-auto text-left space-y-8">
        <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-1 text-center">Summary</h3>
            <p className="text-[11px] text-slate-600 text-center leading-relaxed">{data.personalInfo?.summary}</p>
        </div>

        <div className="space-y-4">
             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-1 text-center">Experience</h3>
              {data.experience?.map((exp, i) => (
               <div key={i} className="text-center">
                   <div className="font-bold text-xs">{exp.position}</div>
                   <div className="text-[10px] text-slate-500 mb-1">{exp.company} | {exp.startDate} - {exp.endDate}</div>
                   <p className="text-[10px] text-slate-600">{exp.description}</p>
               </div>
           ))}
        </div>

        <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-1 text-center">Skills</h3>
            <p className="text-[11px] text-slate-600 text-center">{data.skills?.join("   /   ")}</p>
        </div>
     </div>
  </div>
)

const CreativeFormat = ({ data }) => (
  <div className="flex h-full w-full bg-white font-sans">
      <div className="w-2/3 p-8 space-y-6">
          <div>
             <h1 className="text-5xl font-extrabold text-blue-600 leading-none">{data.personalInfo?.name?.split(" ")[0]}</h1>
             <h1 className="text-5xl font-light text-slate-800 leading-none">{data.personalInfo?.name?.split(" ").slice(1).join(" ")}</h1>
             <p className="text-lg text-slate-500 mt-2 font-medium bg-blue-50 inline-block px-2 rounded-md text-blue-600">{data.personalInfo?.title}</p>
          </div>
          
           <div>
              <h3 className="text-sm font-bold text-slate-900 border-l-4 border-blue-500 pl-3 mb-3">WORK EXPERIENCE</h3>
              <div className="space-y-4">
                 {data.experience?.map((exp, i) => (
                    <div key={i} className="relative pl-4 border-l border-slate-200">
                        <div className="absolute w-2 h-2 bg-blue-500 rounded-full -left-[5px] top-1.5"></div>
                        <h4 className="font-bold text-sm text-slate-800">{exp.position}</h4>
                        <div className="text-[10px] font-bold text-blue-600 mb-1">{exp.company}</div>
                        <p className="text-[10px] text-slate-600">{exp.description}</p>
                    </div>
                ))}
              </div>
          </div>
          
          <div>
              <h3 className="text-sm font-bold text-slate-900 border-l-4 border-blue-500 pl-3 mb-3">PROJECTS</h3>
               <div className="grid grid-cols-2 gap-4">
                 {data.projects?.map((proj, i) => (
                    <div key={i} className="bg-slate-50 p-2 rounded border border-slate-100">
                        <h4 className="font-bold text-xs text-slate-800">{proj.title}</h4>
                        <p className="text-[9px] text-slate-600 line-clamp-3">{proj.description}</p>
                    </div>
                 ))}
               </div>
          </div>
      </div>
      <div className="w-1/3 bg-slate-100 p-8 space-y-8 border-l border-slate-200">
           <div className="bg-white p-4 rounded-xl shadow-sm text-center -mt-16 border-t-4 border-blue-500">
               {data.personalInfo?.photo && <img src={data.personalInfo.photo || "/placeholder.svg"} className="w-20 h-20 rounded-full mx-auto mb-2 object-cover" />}
               <div className="text-[10px] text-slate-500 break-words">{data.personalInfo?.email}</div>
               <div className="text-[10px] text-slate-500">{data.personalInfo?.phone}</div>
                <div className="flex gap-2 justify-center mt-2">
                   {/* Icons placeholder */}
                   <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                   <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                </div>
           </div>

           <div>
              <h3 className="font-bold text-xs mb-3 text-slate-900">SKILLS</h3>
              <div className="flex flex-wrap gap-1">
                  {data.skills?.map((s,i) => <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-[9px] font-semibold text-slate-600">{s}</span>)}
              </div>
           </div>
           
           <div>
               <h3 className="font-bold text-xs mb-3 text-slate-900">EDUCATION</h3>
                {data.education?.map((edu, i) => (
                    <div key={i} className="mb-3 text-[10px]">
                        <div className="font-bold text-slate-800">{edu.institution}</div>
                        <div className="text-slate-500">{edu.degree}</div>
                    </div>
                ))}
           </div>
      </div>
  </div>
)

const TechFormat = ({ data }) => (
  <div className="bg-slate-900 h-full w-full text-slate-300 font-mono text-[10px] p-8">
     <div className="border-b border-green-500/50 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-green-400">
           <span className="text-green-600">&lt;</span>{data.personalInfo?.name} <span className="text-green-600">/&gt;</span>
        </h1>
        <p className="text-slate-400 mt-1">const title = "{data.personalInfo?.title}";</p>
        <div className="flex gap-4 mt-2 text-[9px] text-slate-500">
           <span>{data.personalInfo?.email}</span>
           <span>{data.personalInfo?.github ? `github.com/${data.personalInfo.github}` : ""}</span>
        </div>
     </div>

     <div className="grid grid-cols-[2fr_1fr] gap-8">
         <div className="space-y-6">
            <div>
               <h3 className="text-green-400 font-bold mb-2">// EXPERIENCE</h3>
               {data.experience?.map((exp, i) => (
                   <div key={i} className="mb-4 text-xs font-mono border-l-2 border-slate-700 pl-3">
                       <div className="text-white font-bold">{exp.position}</div>
                       <div className="text-green-500/80 text-[10px] mb-1">@ {exp.company}</div>
                       <p className="text-slate-400 text-[9px]">{exp.description}</p>
                   </div>
               ))}
            </div>
            <div>
               <h3 className="text-green-400 font-bold mb-2">// PROJECTS</h3>
               <div className="space-y-3">
                 {data.projects?.map((proj, i) => (
                    <div key={i} className="bg-slate-800/50 p-2 border border-slate-700 rounded">
                        <div className="flex justify-between">
                            <span className="text-white font-bold">{proj.title}</span>
                             {proj.link && <span className="text-blue-400 truncate max-w-[50px]">{proj.link}</span>}
                        </div>
                        <div className="text-[8px] text-slate-500 mt-1">{proj.tools}</div>
                    </div>
                 ))}
               </div>
            </div>
         </div>
         
         <div className="space-y-6">
             <div>
                 <h3 className="text-green-400 font-bold mb-2">// SKILLS_ARRAY</h3>
                 <div className="text-[9px] flex flex-wrap gap-2 text-slate-400">
                     <span className="text-purple-400">const</span> skills = [
                     {data.skills?.map((s,i) => (
                         <span key={i} className="block pl-2 text-orange-300">"{s}",</span>
                     ))}
                     ]
                 </div>
             </div>
             
             <div>
                <h3 className="text-green-400 font-bold mb-2">// EDUCATION</h3>
                 {data.education?.map((edu, i) => (
                     <div key={i} className="mb-2 text-[9px]">
                         <div className="text-white">{edu.institution}</div>
                         <div className="text-slate-500">{edu.degree}</div>
                     </div>
                 ))}
             </div>
         </div>
     </div>
  </div>
)

const ElegantFormat = ({ data }) => (
  <div className="bg-[#fdfbf7] h-full w-full p-10 font-serif text-slate-800">
      <div className="text-center border-b border-neutral-300 pb-6 mb-8">
          <h1 className="text-4xl italic font-normal text-neutral-800">{data.personalInfo?.name}</h1>
          <p className="text-xs uppercase tracking-widest mt-2 text-neutral-500">{data.personalInfo?.title}</p>
          <div className="flex justify-center gap-3 mt-3 text-[9px] text-neutral-400 font-sans uppercase tracking-wider">
             <span>{data.personalInfo?.email}</span>
             <span>|</span>
             <span>{data.personalInfo?.location}</span>
          </div>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-8">
          <div className="space-y-8 text-right border-r border-neutral-200 pr-6">
              <div className="space-y-2">
                 <h3 className="font-bold text-xs uppercase tracking-widest text-neutral-900">Summary</h3>
                 <p className="text-[10px] leading-relaxed text-neutral-600">{data.personalInfo?.summary}</p>
              </div>
              <div className="space-y-2">
                 <h3 className="font-bold text-xs uppercase tracking-widest text-neutral-900">Expertise</h3>
                  <div className="flex flex-wrap justify-end gap-2">
                      {data.skills?.map((s,i)=><span key={i} className="text-[10px] text-neutral-600">{s}</span>)}
                  </div>
              </div>
               <div className="space-y-2">
                 <h3 className="font-bold text-xs uppercase tracking-widest text-neutral-900">Education</h3>
                 {data.education?.map((edu, i) => (
                     <div key={i} className="mb-2">
                         <div className="font-bold text-[10px] text-neutral-700">{edu.institution}</div>
                         <div className="text-[9px] text-neutral-500">{edu.degree}</div>
                     </div>
                 ))}
              </div>
          </div>
          
          <div className="space-y-6">
              <h3 className="font-bold text-lg italic text-neutral-800 border-b border-neutral-200 pb-2 inline-block pr-10">Experience</h3>
              <div className="space-y-5">
                  {data.experience?.map((exp, i) => (
                      <div key={i}>
                          <div className="flex justify-between items-baseline mb-1">
                             <h4 className="font-bold text-sm text-neutral-900">{exp.position}</h4>
                             <span className="text-[10px] font-sans text-neutral-400">{exp.startDate} - {exp.endDate}</span>
                          </div>
                          <div className="text-[11px] font-medium text-neutral-700 mb-1">{exp.company}</div>
                          <p className="text-[10px] text-neutral-600 leading-relaxed font-sans">{exp.description}</p>
                      </div>
                  ))}
              </div>
              
              <h3 className="font-bold text-lg italic text-neutral-800 border-b border-neutral-200 pb-2 inline-block pr-10 mt-4">Projects</h3>
               <div className="space-y-3">
                  {data.projects?.map((proj, i) => (
                      <div key={i}>
                          <div className="flex justify-between items-baseline mb-1">
                             <h4 className="font-bold text-xs text-neutral-900">{proj.title}</h4>
                             <span className="text-[9px] font-sans text-neutral-400">{proj.duration}</span>
                          </div>
                          <p className="text-[9px] text-neutral-600 font-sans">{proj.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  </div>
)

// Helper Components
const Section = ({ title, className, children }) => (
    <div className="space-y-2">
        <h3 className={cn("text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2", className)}>{title}</h3>
        {children}
    </div>
)

const SectionSimple = ({ title, children }) => (
    <div className="space-y-1">
        <h3 className="text-xs font-bold uppercase text-slate-900">{title}</h3>
        {children}
    </div>
)
