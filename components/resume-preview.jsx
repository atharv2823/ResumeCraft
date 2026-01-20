"use client"

import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function ResumePreview({ data, format }) {
  const renderTemplate = () => {
    switch (format) {
      case "modern":
        return <ModernFormat data={data} />
      case "professional":
        return <ProfessionalFormat data={data} />
      case "minimalist":
        return <MinimalistFormat data={data} />
      case "creative":
        return <CreativeFormat data={data} />
      case "tech":
        return <TechFormat data={data} />
      case "elegant":
        return <ElegantFormat data={data} />
      default:
        return <ModernFormat data={data} />
    }
  }

  return (
    <div className="bg-white shadow-2xl mx-auto w-[210mm] min-h-[297mm] flex flex-col origin-top relative overflow-hidden">
      {renderTemplate()}
    </div>
  )
}

// --- Helper Components ---
const Section = ({ title, className, children }) => (
    <div className="space-y-4">
        <h3 className={cn("text-sm font-bold uppercase tracking-wider border-b pb-2 mb-3", className)}>{title}</h3>
        {children}
    </div>
)

const SectionSimple = ({ title, children }) => (
    <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-slate-900 border-b border-gray-200 pb-1">{title}</h3>
        {children}
    </div>
)

// --- Format Components ---

const ModernFormat = ({ data }) => (
  <div className="flex flex-1 w-full bg-white font-sans text-sm leading-normal">
    <div className="w-1/3 bg-slate-900 text-white p-8 space-y-8 flex-shrink-0">
      <div className="space-y-4">
         {data.personalInfo?.photo && (
            <img src={data.personalInfo.photo} className="w-32 h-32 rounded-full object-cover border-4 border-slate-700 mx-auto" />
         )}
         <div className="space-y-3 text-center">
             <h3 className="text-base font-semibold text-slate-400 tracking-wider uppercase border-b border-slate-700 pb-2">Contact</h3>
             <div className="text-xs text-slate-300 space-y-2">
                <div>{data.personalInfo?.email}</div>
                <div>{data.personalInfo?.phone}</div>
                <div>{[data.personalInfo?.city, data.personalInfo?.state, data.personalInfo?.country].filter(Boolean).join(", ")}</div>
                {data.personalInfo?.linkedin && <div className="break-all">{data.personalInfo.linkedin.replace(/^https?:\/\//, '')}</div>}
             </div>
         </div>
      </div>

      <Section title="Skills" className="text-white border-slate-700">
         <div className="flex flex-wrap gap-2">
             {data.skills?.map((s, i) => <Badge key={i} variant="secondary" className="bg-slate-700 text-white hover:bg-slate-600 border-none">{s}</Badge>)}
         </div>
      </Section>
       
       {(data.languages?.length > 0) && (
        <Section title="Languages" className="text-white border-slate-700">
          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
              {data.languages.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
       </Section>
       )}
    </div>
    
    <div className="w-2/3 p-8 space-y-8">
       <div className="border-b-2 border-slate-900 pb-6">
          <h1 className="text-5xl font-bold uppercase tracking-tight text-slate-900">{data.personalInfo?.name || "Your Name"}</h1>
          <p className="text-2xl text-slate-500 font-medium tracking-wide mt-2">{data.personalInfo?.title || "Job Title"}</p>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed">{data.personalInfo?.summary}</p>
       </div>

       {data.experience?.length > 0 && (
         <Section title="Experience">
            {data.experience.map((exp, i) => (
                <div key={i} className="mb-6 last:mb-0">
                    <div className="flex justify-between items-baseline font-bold text-slate-800">
                        <span className="text-lg">{exp.position}</span>
                        <span className="text-slate-500 text-xs font-normal whitespace-nowrap ml-4">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-sm font-semibold text-blue-600 mb-2">{exp.company}</div>
                    <p className="text-sm text-slate-600 whitespace-pre-line">{exp.description}</p>
                </div>
            ))}
         </Section>
       )}

       {data.projects?.length > 0 && (
         <Section title="Projects">
            {data.projects.map((proj, i) => (
                <div key={i} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-baseline font-bold text-slate-800">
                        <span>{proj.title}</span>
                        <span className="text-slate-500 text-xs font-normal whitespace-nowrap ml-4">{proj.duration}</span>
                    </div>
                    {proj.link && <a href={proj.link} target="_blank" className="text-xs text-blue-600 hover:underline block mb-1">{proj.link}</a>}
                    <p className="text-sm text-slate-600 mt-1">{proj.description}</p>
                </div>
            ))}
         </Section>
       )}

       {data.education?.length > 0 && (
         <Section title="Education">
            {data.education.map((edu, i) => (
               <div key={i} className="mb-3">
                   <div className="font-bold text-slate-800">{edu.institution}</div>
                   <div className="text-sm text-slate-600">{edu.degree} {edu.field && `in ${edu.field}`} <span className="text-slate-400 text-xs">({edu.startDate} - {edu.endDate})</span></div>
               </div>
            ))}
         </Section>
       )}
    </div>
  </div>
)

const ProfessionalFormat = ({ data }) => (
  <div className="bg-white flex-1 w-full p-12 font-serif text-slate-800 text-base">
      <div className="border-b-2 border-black pb-8 mb-8">
          <div className="flex justify-between items-end">
             <div>
                <h1 className="text-5xl font-bold uppercase tracking-tight">{data.personalInfo?.name}</h1>
                <p className="text-2xl italic text-slate-600 mt-2">{data.personalInfo?.title}</p>
             </div>
             <div className="text-right text-sm leading-relaxed">
                <div>{data.personalInfo?.email}</div>
                <div>{data.personalInfo?.phone}</div>
                <div>{[data.personalInfo?.city, data.personalInfo?.state, data.personalInfo?.country].filter(Boolean).join(", ")}</div>
             </div>
          </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
          {data.personalInfo?.summary && (
            <SectionSimple title="Professional Summary">
                <p className="text-sm leading-relaxed text-slate-700">{data.personalInfo.summary}</p>
            </SectionSimple>
          )}
          
           {data.experience?.length > 0 && (
             <SectionSimple title="Experience">
                {data.experience.map((exp, i) => (
                   <div key={i} className="mb-6 last:mb-0">
                       <div className="flex justify-between items-baseline">
                           <h4 className="font-bold text-lg">{exp.position} <span className="font-normal italic text-slate-600 text-base">at {exp.company}</span></h4>
                           <span className="text-sm font-sans text-slate-500">{exp.startDate} - {exp.endDate}</span>
                       </div>
                       <p className="text-sm mt-2 text-slate-700 whitespace-pre-line">{exp.description}</p>
                   </div>
                ))}
            </SectionSimple>
           )}

           <div className="grid grid-cols-2 gap-8">
              {data.education?.length > 0 && (
               <SectionSimple title="Education">
                    {data.education.map((edu, i) => (
                       <div key={i} className="mb-4">
                           <div className="font-bold">{edu.institution}</div>
                           <div>{edu.degree} {edu.field}</div>
                           <div className="text-sm italic text-slate-500">{edu.startDate} - {edu.endDate}</div>
                       </div>
                    ))}
               </SectionSimple>
              )}
              
              {data.skills?.length > 0 && (
                <SectionSimple title="Skills">
                   <div className="text-sm leading-relaxed">
                      {data.skills.join(" • ")}
                   </div>
                </SectionSimple>
              )}
           </div>
      </div>
  </div>
)

const MinimalistFormat = ({ data }) => (
  <div className="bg-white flex-1 w-full p-16 text-center font-sans text-sm">
     <div className="mb-12 space-y-4">
        <h1 className="text-5xl font-light tracking-[0.25em] uppercase text-slate-900">{data.personalInfo?.name}</h1>
        <p className="text-sm uppercase tracking-widest text-slate-500">{data.personalInfo?.title} | {[data.personalInfo?.city, data.personalInfo?.country].filter(Boolean).join(", ")}</p>
        <p className="text-xs text-slate-400">{[data.personalInfo?.email, data.personalInfo?.phone].filter(Boolean).join(" • ")}</p>
     </div>
     
     <div className="max-w-2xl mx-auto text-left space-y-10">
        <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2 text-center">Summary</h3>
            <p className="text-sm text-slate-600 text-center leading-relaxed">{data.personalInfo?.summary}</p>
        </div>

        {data.experience?.length > 0 && (
          <div className="space-y-6">
               <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2 text-center">Experience</h3>
                {data.experience.map((exp, i) => (
                 <div key={i} className="text-center">
                     <div className="font-bold text-base">{exp.position}</div>
                     <div className="text-xs text-slate-500 mb-2 uppercase tracking-wide">{exp.company} | {exp.startDate} - {exp.endDate}</div>
                     <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                 </div>
             ))}
          </div>
        )}

        {data.skills?.length > 0 && (
          <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2 text-center">Skills</h3>
              <p className="text-sm text-slate-600 text-center leading-relaxed">{data.skills.join("   /   ")}</p>
          </div>
        )}
     </div>
  </div>
)

const CreativeFormat = ({ data }) => (
  <div className="flex flex-1 w-full bg-white font-sans text-sm">
      <div className="w-2/3 p-10 space-y-8">
          <div>
             <h1 className="text-6xl font-extrabold text-blue-600 leading-none">{data.personalInfo?.name?.split(" ")[0]}</h1>
             <h1 className="text-6xl font-light text-slate-800 leading-none">{data.personalInfo?.name?.split(" ").slice(1).join(" ")}</h1>
             <p className="text-xl text-slate-500 mt-4 font-medium bg-blue-50 inline-block px-3 py-1 rounded-md text-blue-600">{data.personalInfo?.title}</p>
          </div>
          
           {data.experience?.length > 0 && (
             <div>
                <h3 className="text-base font-bold text-slate-900 border-l-4 border-blue-500 pl-4 mb-6 uppercase tracking-wider">Work Experience</h3>
                <div className="space-y-6">
                   {data.experience.map((exp, i) => (
                      <div key={i} className="relative pl-6 border-l border-slate-200 ml-2">
                          <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5 border-2 border-white"></div>
                          <h4 className="font-bold text-lg text-slate-800">{exp.position}</h4>
                          <div className="text-xs font-bold text-blue-600 mb-2 uppercase">{exp.company} | {exp.startDate} - {exp.endDate}</div>
                          <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                      </div>
                  ))}
                </div>
            </div>
           )}
          
           {data.projects?.length > 0 && (
             <div>
                <h3 className="text-base font-bold text-slate-900 border-l-4 border-blue-500 pl-4 mb-6 uppercase tracking-wider">Projects</h3>
                 <div className="grid grid-cols-2 gap-4">
                   {data.projects.map((proj, i) => (
                      <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-100 hover:shadow-sm transition-shadow">
                          <h4 className="font-bold text-sm text-slate-800">{proj.title}</h4>
                          <p className="text-xs text-slate-600 mt-2 line-clamp-4">{proj.description}</p>
                      </div>
                   ))}
                 </div>
            </div>
           )}
      </div>
      
      <div className="w-1/3 bg-slate-100 p-8 space-y-10 border-l border-slate-200">
           <div className="bg-white p-6 rounded-2xl shadow-sm text-center -mt-20 border-t-4 border-blue-500">
               {data.personalInfo?.photo ? (
                 <img src={data.personalInfo.photo} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md" />
               ) : (
                 <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 border-4 border-white shadow-md flex items-center justify-center text-slate-400 text-3xl">
                   {data.personalInfo?.name?.charAt(0)}
                 </div>
               )}
               <div className="text-xs text-slate-500 font-medium break-all">{data.personalInfo?.email}</div>
               <div className="text-xs text-slate-500 font-medium mt-1">{data.personalInfo?.phone}</div>
               <div className="text-xs text-slate-500 font-medium mt-1">{[data.personalInfo?.city, data.personalInfo?.country].filter(Boolean).join(", ")}</div>
           </div>

           {data.skills?.length > 0 && (
             <div>
                <h3 className="font-bold text-sm mb-4 text-slate-900 uppercase tracking-widest">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {data.skills.map((s,i) => <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 shadow-sm">{s}</span>)}
                </div>
             </div>
           )}
           
           {data.education?.length > 0 && (
             <div>
                 <h3 className="font-bold text-sm mb-4 text-slate-900 uppercase tracking-widest">Education</h3>
                  {data.education.map((edu, i) => (
                      <div key={i} className="mb-4 text-sm last:mb-0">
                          <div className="font-bold text-slate-800">{edu.institution}</div>
                          <div className="text-slate-500 text-xs">{edu.degree}</div>
                          <div className="text-slate-400 text-xs italic">{edu.startDate} - {edu.endDate}</div>
                      </div>
                  ))}
             </div>
           )}
           
           {data.hobbies?.length > 0 && (
              <div>
                 <h3 className="font-bold text-sm mb-4 text-slate-900 uppercase tracking-widest">Interests</h3>
                 <p className="text-sm text-slate-600">{data.hobbies.join(", ")}</p>
              </div>
           )}
      </div>
  </div>
)

const TechFormat = ({ data }) => (
  <div className="bg-slate-900 flex-1 w-full text-slate-300 font-mono text-sm p-12 overflow-hidden">
     <div className="border-b border-green-500/50 pb-8 mb-8">
        <h1 className="text-5xl font-bold text-green-400 tracking-tighter">
           <span className="text-green-600/50">&lt;</span>{data.personalInfo?.name} <span className="text-green-600/50">/&gt;</span>
        </h1>
        <p className="text-xl text-slate-400 mt-2">const title = <span className="text-yellow-300">"{data.personalInfo?.title}"</span>;</p>
        <div className="flex flex-wrap gap-6 mt-4 text-xs text-slate-500 font-bold">
           <span>{data.personalInfo?.email}</span>
           <span>{data.personalInfo?.phone}</span>
           <span>{[data.personalInfo?.city, data.personalInfo?.country].filter(Boolean).join(", ")}</span>
           {data.personalInfo?.github && <span>github.com/{data.personalInfo.github.replace(/^https?:\/\//, '')}</span>}
        </div>
     </div>

     <div className="grid grid-cols-[2fr_1fr] gap-12">
         <div className="space-y-8">
            {data.experience?.length > 0 && (
               <div>
                  <h3 className="text-green-400 font-bold mb-4 text-lg">// WORK_EXPERIENCE</h3>
                  {data.experience.map((exp, i) => (
                      <div key={i} className="mb-6 pl-4 border-l-2 border-slate-700">
                          <div className="text-white font-bold text-base">{exp.position}</div>
                          <div className="text-green-500/80 text-xs mb-2">@ {exp.company} <span className="text-slate-600 ml-2">// {exp.startDate} - {exp.endDate}</span></div>
                          <p className="text-slate-400 text-xs leading-relaxed">{exp.description}</p>
                      </div>
                  ))}
               </div>
            )}
            
            {data.projects?.length > 0 && (
               <div>
                  <h3 className="text-green-400 font-bold mb-4 text-lg">// PROJECTS</h3>
                  <div className="space-y-4">
                    {data.projects.map((proj, i) => (
                       <div key={i} className="bg-slate-800/30 p-4 border border-slate-700/50 rounded-lg">
                           <div className="flex justify-between items-start">
                               <span className="text-blue-300 font-bold">{proj.title}</span>
                                {proj.link && <span className="text-slate-600 text-xs truncate max-w-[150px]">{proj.link}</span>}
                           </div>
                           <p className="text-slate-400 text-xs mt-2 mb-2">{proj.description}</p>
                           {proj.tools && (
                              <div className="flex gap-2 text-[10px] text-green-300/70 border-t border-slate-700/50 pt-2">
                                 <span>tools: [{proj.tools}]</span>
                              </div>
                           )}
                       </div>
                    ))}
                  </div>
               </div>
            )}
         </div>
         
         <div className="space-y-8">
             {data.skills?.length > 0 && (
                <div>
                    <h3 className="text-green-400 font-bold mb-4">// TECH_STACK</h3>
                    <div className="text-xs font-mono bg-slate-950 p-4 rounded-lg border border-slate-800">
                        <span className="text-purple-400">const</span> <span className="text-blue-300">skills</span> = [<br/>
                        {data.skills.map((s,i) => (
                            <span key={i} className="block pl-4 text-orange-300">"{s}",</span>
                        ))}
                        ]
                    </div>
                </div>
             )}
             
             {data.education?.length > 0 && (
                <div>
                   <h3 className="text-green-400 font-bold mb-4">// ORIGIN</h3>
                    {data.education.map((edu, i) => (
                        <div key={i} className="mb-4 text-xs">
                            <div className="text-white font-bold">{edu.institution}</div>
                            <div className="text-slate-500">{edu.degree}</div>
                            <div className="text-slate-600 italic">{edu.startDate} - {edu.endDate}</div>
                        </div>
                    ))}
                </div>
             )}
         </div>
     </div>
  </div>
)

const ElegantFormat = ({ data }) => (
  <div className="bg-[#fdfbf7] flex-1 w-full p-16 font-serif text-slate-800 text-base leading-relaxed">
      <div className="text-center border-b border-neutral-300 pb-8 mb-10">
          <h1 className="text-6xl italic font-normal text-neutral-800">{data.personalInfo?.name}</h1>
          <p className="text-sm uppercase tracking-widest mt-4 text-neutral-500">{data.personalInfo?.title}</p>
          <div className="flex justify-center gap-4 mt-6 text-xs text-neutral-400 font-sans uppercase tracking-wider">
             <span>{data.personalInfo?.email}</span>
             <span>|</span>
             <span>{data.personalInfo?.phone}</span>
             <span>|</span>
             <span>{[data.personalInfo?.city, data.personalInfo?.country].filter(Boolean).join(", ")}</span>
          </div>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-12 h-full">
          <div className="space-y-10 text-right border-r border-neutral-200 pr-10">
              {data.personalInfo?.summary && (
                <div className="space-y-3">
                   <h3 className="font-bold text-sm uppercase tracking-widest text-neutral-900 border-b border-neutral-100 pb-1">Summary</h3>
                   <p className="text-xs leading-loose text-neutral-600 font-sans text-justify">{data.personalInfo.summary}</p>
                </div>
              )}
              
              {data.skills?.length > 0 && (
                <div className="space-y-3">
                   <h3 className="font-bold text-sm uppercase tracking-widest text-neutral-900 border-b border-neutral-100 pb-1">Expertise</h3>
                    <div className="flex flex-wrap justify-end gap-x-2 gap-y-1">
                        {data.skills.map((s,i)=><span key={i} className="text-xs text-neutral-600 font-sans">{s}</span>)}
                    </div>
                </div>
              )}

              {data.education?.length > 0 && (
                 <div className="space-y-4">
                   <h3 className="font-bold text-sm uppercase tracking-widest text-neutral-900 border-b border-neutral-100 pb-1">Education</h3>
                   {data.education.map((edu, i) => (
                       <div key={i} className="mb-2">
                           <div className="font-bold text-xs text-neutral-800">{edu.institution}</div>
                           <div className="text-xs text-neutral-500 italic">{edu.degree}</div>
                           <div className="text-[10px] text-neutral-400 font-sans mt-1">{edu.startDate} - {edu.endDate}</div>
                       </div>
                   ))}
                </div>
              )}
          </div>
          
          <div className="space-y-8">
              {data.experience?.length > 0 && (
                <div>
                  <h3 className="font-bold text-2xl italic text-neutral-800 border-b border-neutral-200 pb-3 inline-block pr-12 mb-6">Experience</h3>
                  <div className="space-y-8">
                      {data.experience.map((exp, i) => (
                          <div key={i}>
                              <div className="flex justify-between items-baseline mb-2">
                                 <h4 className="font-bold text-lg text-neutral-900">{exp.position}</h4>
                                 <span className="text-xs font-sans text-neutral-400">{exp.startDate} - {exp.endDate}</span>
                              </div>
                              <div className="text-sm font-medium text-neutral-700 mb-2">{exp.company}</div>
                              <p className="text-sm text-neutral-600 leading-relaxed font-sans">{exp.description}</p>
                          </div>
                      ))}
                  </div>
                </div>
              )}
              
              {data.projects?.length > 0 && (
                 <div>
                   <h3 className="font-bold text-2xl italic text-neutral-800 border-b border-neutral-200 pb-3 inline-block pr-12 mb-6 mt-4">Projects</h3>
                    <div className="space-y-6">
                       {data.projects.map((proj, i) => (
                           <div key={i}>
                               <div className="flex justify-between items-baseline mb-1">
                                  <h4 className="font-bold text-base text-neutral-900">{proj.title}</h4>
                                  <span className="text-xs font-sans text-neutral-400">{proj.duration}</span>
                               </div>
                               <p className="text-sm text-neutral-600 font-sans leading-relaxed">{proj.description}</p>
                           </div>
                       ))}
                   </div>
                 </div>
              )}
          </div>
      </div>
  </div>
)
