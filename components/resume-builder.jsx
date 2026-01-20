"use client"

import { useState } from "react"
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Heart, 
  Languages, 
  Star, 
  PlusCircle, 
  Trash2,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Globe,
  Github,
  Award,
  X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function ResumeBuilder({ data, onChange }) {
  const [activeTab, setActiveTab] = useState("personal")
  const [hobbyInput, setHobbyInput] = useState("")
  const [languageInput, setLanguageInput] = useState("")
  const [activityInput, setActivityInput] = useState("")
  const [skillInput, setSkillInput] = useState("")

  const handleAddSkill = () => {
    if (!skillInput.trim()) return
    const currentSkills = data.skills || []
    if (!currentSkills.includes(skillInput.trim())) {
       onChange({
         ...data,
         skills: [...currentSkills, skillInput.trim()]
       })
    }
    setSkillInput("")
  }

  const handleRemoveSkill = (index) => {
    const currentSkills = [...(data.skills || [])]
    currentSkills.splice(index, 1)
    onChange({
      ...data,
      skills: currentSkills
    })
  }

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handlePersonalInfoChange = (field, value) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    })
  }

  const handleAddExperience = () => {
    onChange({
      ...data,
      experience: [...data.experience, { company: "", position: "", startDate: "", endDate: "", description: "" }],
    })
  }

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...data.experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    }
    onChange({
      ...data,
      experience: updatedExperience,
    })
  }

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...data.experience]
    updatedExperience.splice(index, 1)
    onChange({
      ...data,
      experience: updatedExperience,
    })
  }

  const handleAddEducation = () => {
    onChange({
      ...data,
      education: [...data.education, { institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" }],
    })
  }

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...data.education]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    }
    onChange({
      ...data,
      education: updatedEducation,
    })
  }

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...data.education]
    updatedEducation.splice(index, 1)
    onChange({
      ...data,
      education: updatedEducation,
    })
  }

  const handleSkillsChange = (skills) => {
    onChange({
      ...data,
      skills: skills,
    })
  }

  const handleAddProject = () => {
    onChange({
      ...data,
      projects: [...(data.projects || []), { title: "", link: "", duration: "", tools: "", frameworks: "", description: "", other: "" }],
    })
  }

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...(data.projects || [])]
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    }
    onChange({
      ...data,
      projects: updatedProjects,
    })
  }

  const handleRemoveProject = (index) => {
    const updatedProjects = [...(data.projects || [])]
    updatedProjects.splice(index, 1)
    onChange({
      ...data,
      projects: updatedProjects,
    })
  }

  const handleAddHobby = () => {
    if (!hobbyInput.trim()) return
    const currentHobbies = data.hobbies || []
    onChange({
      ...data,
      hobbies: [...currentHobbies, hobbyInput.trim()]
    })
    setHobbyInput("")
  }

  const handleRemoveHobby = (index) => {
    const currentHobbies = [...(data.hobbies || [])]
    currentHobbies.splice(index, 1)
    onChange({
      ...data,
      hobbies: currentHobbies
    })
  }

  const handleHobbyKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddHobby()
    }
  }

  const handleAddLanguage = () => {
    if (!languageInput.trim()) return
    const currentLanguages = data.languages || []
    onChange({
      ...data,
      languages: [...currentLanguages, languageInput.trim()]
    })
    setLanguageInput("")
  }

  const handleRemoveLanguage = (index) => {
    const currentLanguages = [...(data.languages || [])]
    currentLanguages.splice(index, 1)
    onChange({
      ...data,
      languages: currentLanguages
    })
  }

  const handleLanguageKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddLanguage()
    }
  }

  const handleAddActivity = () => {
    if (!activityInput.trim()) return
    const currentActivities = data.extraCurricular || []
    onChange({
      ...data,
      extraCurricular: [...currentActivities, activityInput.trim()]
    })
    setActivityInput("")
  }

  const handleRemoveActivity = (index) => {
    const currentActivities = [...(data.extraCurricular || [])]
    currentActivities.splice(index, 1)
    onChange({
      ...data,
      extraCurricular: currentActivities
    })
  }

  const handleActivityKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddActivity()
    }
  }

  const tabs = [
    { id: "personal", label: "Personal", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "hobbies", label: "Hobbies", icon: Heart },
    { id: "languages", label: "Languages", icon: Languages },
    { id: "extra", label: "Activities", icon: Star },
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[600px] rounded-xl border border-neutral-800 bg-neutral-950 shadow-sm overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col md:flex-row">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-neutral-800 bg-neutral-900/50 flex flex-col">
            <div className="p-4 border-b border-neutral-800 hidden md:block">
                <h2 className="font-semibold text-white">Sections</h2>
                <p className="text-xs text-neutral-400">Manage your resume content</p>
            </div>
            <ScrollArea className="flex-1 w-full">
            <TabsList className="h-auto w-full flex flex-row md:flex-col justify-start gap-1 bg-transparent p-2 md:p-3">
                {tabs.map((tab) => (
                <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="w-full justify-start gap-3 px-3 py-2.5 rounded-lg text-neutral-400 transition-all 
                    data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md
                    hover:bg-neutral-800 hover:text-blue-400
                    data-[state=active]:hover:bg-blue-700 data-[state=active]:hover:text-white"
                >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm font-medium hidden md:inline">{tab.label}</span>
                    <span className="text-sm font-medium md:hidden">{tab.label}</span>
                </TabsTrigger>
                ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="md:hidden" />
            </ScrollArea>
        </div>

        <div className="flex-1 overflow-y-auto bg-neutral-950">
           <div className="max-w-3xl mx-auto p-6 md:p-8">
          <TabsContent value="personal" className="mt-0 space-y-8 focus-visible:outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
            <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight text-white">Personal Information</h3>
                <p className="text-sm text-neutral-400">Basic details to help recruiters identify you.</p>
            </div>
            
            <div className="space-y-8"> 
                {/* Basic Info Section */}
                <div className="grid gap-5 p-5 border border-blue-900/30 rounded-xl bg-blue-900/10">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-blue-400">
                    <User className="w-4 h-4" /> Basic Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Full Name</label>
                      <Input
                        value={data.personalInfo.name || ""}
                        onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                        placeholder="John Doe"
                        className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Job Title</label>
                      <Input
                        value={data.personalInfo.title || ""}
                        onChange={(e) => handlePersonalInfoChange("title", e.target.value)}
                        placeholder="Software Engineer"
                         className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Professional Summary</label>
                    <Textarea
                      value={data.personalInfo.summary || ""}
                      onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
                      placeholder="Brief overview of your career..."
                      className="min-h-[100px] resize-none bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                    />
                  </div>
                </div>


                {/* Contact Section */}
                <div className="grid gap-5">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-blue-400 border-b pb-2 border-neutral-800">
                    <Mail className="w-4 h-4" /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Email</label>
                      <Input
                        type="email"
                        value={data.personalInfo.email || ""}
                        onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Phone</label>
                      <Input
                        value={data.personalInfo.phone || ""}
                        onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                        placeholder="+1 234 567 890"
                        className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="grid gap-5">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-blue-400 border-b pb-2 border-neutral-800">
                    <MapPin className="w-4 h-4" /> Location
                  </h3>
                   <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Street Address</label>
                    <Input
                       value={data.personalInfo.location || ""}
                       onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                       placeholder="123 Main St"
                       className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">City</label>
                      <Input
                        value={data.personalInfo.city || ""}
                        onChange={(e) => handlePersonalInfoChange("city", e.target.value)}
                        placeholder="New York"
                        className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">State</label>
                      <Input
                        value={data.personalInfo.state || ""}
                        onChange={(e) => handlePersonalInfoChange("state", e.target.value)}
                        placeholder="NY"
                        className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Country</label>
                      <Input
                        value={data.personalInfo.country || ""}
                        onChange={(e) => handlePersonalInfoChange("country", e.target.value)}
                        placeholder="USA"
                        className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Pincode</label>
                      <Input
                        value={data.personalInfo.pincode || ""}
                        onChange={(e) => handlePersonalInfoChange("pincode", e.target.value)}
                        placeholder="10001"
                        className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Socials Section */}
                <div className="grid gap-5">
                   <h3 className="text-sm font-semibold flex items-center gap-2 text-blue-400 border-b pb-2 border-neutral-800">
                    <Globe className="w-4 h-4" /> Social Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">LinkedIn</label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                        <Input
                            value={data.personalInfo.linkedin || ""}
                            onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                            placeholder="linkedin.com/in/john"
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 pl-9 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">GitHub</label>
                      <div className="relative">
                        <Github className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                        <Input
                            value={data.personalInfo.github || ""}
                            onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
                            placeholder="github.com/john"
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 pl-9 text-white"
                        />
                      </div>
                    </div>
                     <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Portfolio</label>
                      <Input
                        value={data.personalInfo.portfolio || ""}
                        onChange={(e) => handlePersonalInfoChange("portfolio", e.target.value)}
                        placeholder="www.johndoe.com"
                        className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                      />
                    </div>
                     <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Photo URL</label>
                      <Input
                        value={data.personalInfo.photo || ""}
                        onChange={(e) => handlePersonalInfoChange("photo", e.target.value)}
                        placeholder="https://..."
                        className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
          </TabsContent>

          <TabsContent value="experience" className="mt-0 space-y-6 focus-visible:outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-end mb-6 border-b border-neutral-800 pb-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight text-white">Work Experience</h3>
                <p className="text-sm text-neutral-400">Add your relevant past positions.</p>
              </div>
              <Button onClick={handleAddExperience} size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                <PlusCircle className="h-4 w-4" /> Add Position
              </Button>
            </div>
            
            {data.experience.length === 0 ? (
               <div className="text-center py-16 border-2 border-dashed border-neutral-800 rounded-xl bg-neutral-900/50">
                 <div className="bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-blue-400" />
                 </div>
                 <h3 className="text-lg font-medium text-white">No experience yet</h3>
                 <p className="text-neutral-400 max-w-sm mx-auto mt-2 mb-4">Start building your resume by adding your work history.</p>
                 <Button variant="outline" onClick={handleAddExperience} className="border-blue-900 text-blue-400 hover:bg-blue-900/20">Add Description</Button>
               </div>
            ) : (
                <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-0">
                {data.experience.map((exp, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-neutral-800 rounded-xl px-2 bg-neutral-950 data-[state=open]:ring-1 data-[state=open]:ring-blue-500 transition-all">
                    <AccordionTrigger className="hover:no-underline px-4 py-4 data-[state=open]:pb-2">
                        <div className="text-left flex items-center gap-3">
                            <div className="bg-blue-900/20 p-2 rounded-lg hidden sm:block">
                                <Briefcase className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="font-semibold text-white">{exp.position || "(No Position)"}</div>
                                <div className="text-sm text-neutral-400">{exp.company || "(No Company)"}</div>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Company</label>
                            <Input
                            value={exp.company || ""}
                            onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                            placeholder="Company Name"
                             className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Position</label>
                            <Input
                            value={exp.position || ""}
                            onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                            placeholder="Job Title"
                             className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Start Date</label>
                            <Input
                            type="month"
                            value={exp.startDate || ""}
                            onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">End Date</label>
                            <Input
                                type="month"
                                value={exp.endDate || ""}
                                onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                                disabled={exp.isCurrent}
                                className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 disabled:opacity-50 text-white"
                            />
                        </div>
                        </div>

                        <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Description</label>
                        <Textarea
                            value={exp.description || ""}
                            onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                            placeholder="• Achieved X by doing Y..."
                            className="min-h-[120px] bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 font-mono text-sm text-white"
                        />
                        </div>
                        
                        <div className="flex justify-end pt-2 border-t border-neutral-800">
                            <Button variant="ghost" size="sm" onClick={() => handleRemoveExperience(index)} className="gap-2 text-red-400 hover:text-red-500 hover:bg-red-900/20">
                                <Trash2 className="h-4 w-4" /> Remove Position
                            </Button>
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            )}
          </TabsContent>

          <TabsContent value="education" className="mt-0 space-y-6 focus-visible:outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
             <div className="flex justify-between items-end mb-6 border-b border-neutral-800 pb-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight text-white">Education</h3>
                <p className="text-sm text-neutral-400">Your academic background.</p>
              </div>
              <Button onClick={handleAddEducation} size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                <PlusCircle className="h-4 w-4" /> Add Education
              </Button>
            </div>

            {data.education.length === 0 ? (
               <div className="text-center py-16 border-2 border-dashed border-neutral-800 rounded-xl bg-neutral-900/50">
                 <div className="bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-blue-400" />
                 </div>
                 <h3 className="text-lg font-medium text-white">No education listed</h3>
                 <p className="text-neutral-400 max-w-sm mx-auto mt-2 mb-4">Add your university, degrees, and certifications.</p>
                 <Button variant="outline" onClick={handleAddEducation} className="border-blue-900 text-blue-400 hover:bg-blue-900/20">Add Education</Button>
               </div>
            ) : (
                <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="edu-0">
                {data.education.map((edu, index) => (
                    <AccordionItem key={index} value={`edu-${index}`} className="border border-neutral-800 rounded-xl px-2 bg-neutral-950 data-[state=open]:ring-1 data-[state=open]:ring-blue-500 transition-all">
                    <AccordionTrigger className="hover:no-underline px-4 py-4 data-[state=open]:pb-2">
                        <div className="text-left flex items-center gap-3">
                             <div className="bg-blue-900/20 p-2 rounded-lg hidden sm:block">
                                <GraduationCap className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="font-semibold text-white">{edu.institution || "(No Institution)"}</div>
                                <div className="text-sm text-neutral-400">{edu.degree ? `${edu.degree} ${edu.field ? `- ${edu.field}` : ""}` : "(No Degree)"}</div>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Institution/University</label>
                            <Input
                                value={edu.institution || ""}
                                onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                                placeholder="University Name"
                                className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Degree</label>
                            <Input
                            value={edu.degree || ""}
                            onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                            placeholder="e.g. Bachelor's"
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Field of Study</label>
                            <Input
                            value={edu.field || ""}
                            onChange={(e) => handleEducationChange(index, "field", e.target.value)}
                            placeholder="e.g. Computer Science"
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Start Date</label>
                            <Input
                            type="month"
                            value={edu.startDate || ""}
                            onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">End Date</label>
                            <Input
                            type="month"
                            value={edu.endDate || ""}
                            onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                            placeholder="Present"
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">GPA / Grade (Optional)</label>
                            <Input
                            value={edu.gpa || ""}
                            onChange={(e) => handleEducationChange(index, "gpa", e.target.value)}
                            placeholder="e.g. 3.8/4.0"
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                        </div>

                         <div className="flex justify-end pt-2 border-t border-neutral-800">
                            <Button variant="ghost" size="sm" onClick={() => handleRemoveEducation(index)} className="gap-2 text-red-400 hover:text-red-500 hover:bg-red-900/20">
                                <Trash2 className="h-4 w-4" /> Remove Education
                            </Button>
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            )}
          </TabsContent>

          <TabsContent value="skills" className="mt-0 focus-visible:outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
             <div className="space-y-6">
                 <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">Skills & Expertise</h3>
                    <p className="text-sm text-neutral-400">List your technical, professional, and soft skills.</p>
                </div>
                
                <div className="grid gap-6 p-6 border border-neutral-800 rounded-xl bg-neutral-950 shadow-sm">
                    <div className="space-y-3">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Add Skills</label>
                        <div className="flex gap-2">
                           <Input 
                             value={skillInput || ""}
                             onChange={(e) => setSkillInput(e.target.value)}
                             onKeyDown={handleSkillKeyDown}
                             placeholder="Type a skill and press Enter (e.g. React)"
                             className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                           />
                           <Button onClick={handleAddSkill} size="icon" className="shrink-0 bg-blue-600 hover:bg-blue-700">
                              <PlusCircle className="h-5 w-5" />
                           </Button>
                        </div>
                        <p className="text-xs text-neutral-500">Press Enter or click the + button to add.</p>
                    </div>

                    <div>
                         <h4 className="text-xs font-semibold uppercase text-neutral-500 tracking-wider mb-3">Your Skills</h4>
                         <div className="flex flex-wrap gap-2 p-4 bg-neutral-900/50 rounded-xl min-h-[100px] border border-neutral-800">
                        {data.skills.length > 0 ? (
                            data.skills.map((skill, index) => (
                                <div
                                key={index}
                                className="bg-neutral-800 text-blue-400 border border-blue-900/30 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 group animate-in zoom-in duration-200"
                                >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                {skill}
                                <button 
                                  onClick={() => handleRemoveSkill(index)}
                                  className="text-neutral-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                                >
                                   <X className="h-3.5 w-3.5" />
                                </button>
                                </div>
                            ))
                        ) : (
                            <span className="text-neutral-500 text-sm italic flex items-center gap-2">
                                <Wrench className="w-4 h-4" /> Added skills will appear here...
                            </span>
                        )}
                        </div>
                    </div>
                </div>
             </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-0 space-y-6 focus-visible:outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-end mb-6 border-b border-neutral-800 pb-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight text-white">Projects</h3>
                <p className="text-sm text-neutral-400">Showcase your case studies and personal projects.</p>
              </div>
              <Button onClick={handleAddProject} size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                <PlusCircle className="h-4 w-4" /> Add Project
              </Button>
            </div>
            
            {(!data.projects || data.projects.length === 0) ? (
               <div className="text-center py-16 border-2 border-dashed border-neutral-800 rounded-xl bg-neutral-900/50">
                 <div className="bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FolderGit2 className="h-8 w-8 text-blue-400" />
                 </div>
                 <h3 className="text-lg font-medium text-white">No projects listed</h3>
                 <p className="text-neutral-400 max-w-sm mx-auto mt-2 mb-4">Highlight your best work and personal projects.</p>
                 <Button variant="outline" onClick={handleAddProject} className="border-blue-900 text-blue-400 hover:bg-blue-900/20">Add Project</Button>
               </div>
            ) : (
                <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="proj-0">
                {data.projects.map((proj, index) => (
                    <AccordionItem key={index} value={`proj-${index}`} className="border border-neutral-800 rounded-xl px-2 bg-neutral-950 data-[state=open]:ring-1 data-[state=open]:ring-blue-500 transition-all">
                    <AccordionTrigger className="hover:no-underline px-4 py-4 data-[state=open]:pb-2">
                        <div className="text-left flex items-center gap-3">
                            <div className="bg-blue-900/20 p-2 rounded-lg hidden sm:block">
                                <FolderGit2 className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="font-semibold text-white">{proj.title || "(No Title)"}</div>
                                <div className="text-sm text-neutral-400">{proj.link || "(No Link)"}</div>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Project Title</label>
                            <Input
                            value={proj.title || ""}
                            onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                            placeholder="Project Name"
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                         <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Hosted Link</label>
                            <Input
                            value={proj.link || ""}
                            onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                            placeholder="https://..."
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Duration</label>
                            <Input
                            value={proj.duration || ""}
                            onChange={(e) => handleProjectChange(index, "duration", e.target.value)}
                            placeholder="e.g. 3 Months, or Jan 2023 - Mar 2023"
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                         <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Tools Used</label>
                            <Input
                            value={proj.tools || ""}
                            onChange={(e) => handleProjectChange(index, "tools", e.target.value)}
                            placeholder="e.g. VS Code, Figma, Git"
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Frameworks Used</label>
                            <Input
                            value={proj.frameworks || ""}
                            onChange={(e) => handleProjectChange(index, "frameworks", e.target.value)}
                            placeholder="e.g. React, Next.js, Tailwind"
                            className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                        </div>
                        </div>

                        <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Description</label>
                        <Textarea
                            value={proj.description || ""}
                            onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                            placeholder="Describe the project..."
                            className="min-h-[100px] bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 font-mono text-sm text-white"
                        />
                        </div>

                         <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Other Info</label>
                        <Textarea
                            value={proj.other || ""}
                            onChange={(e) => handleProjectChange(index, "other", e.target.value)}
                            placeholder="Any additional details..."
                            className="min-h-[80px] bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 font-mono text-sm text-white"
                        />
                        </div>
                        
                        <div className="flex justify-end pt-2 border-t border-neutral-800">
                            <Button variant="ghost" size="sm" onClick={() => handleRemoveProject(index)} className="gap-2 text-red-400 hover:text-red-500 hover:bg-red-900/20">
                                <Trash2 className="h-4 w-4" /> Remove Project
                            </Button>
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            )}
          </TabsContent>

          <TabsContent value="hobbies" className="mt-0 focus-visible:outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
               <div className="space-y-6">
                 <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">Interests & Hobbies</h3>
                    <p className="text-sm text-neutral-400">Share your personality outside of work.</p>
                </div>
                
                <div className="p-6 border border-neutral-800 rounded-xl bg-neutral-950 shadow-sm space-y-4">
                     <div className="space-y-2">
                         <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Add Hobbies</label>
                         <div className="flex gap-2">
                            <Input
                                value={hobbyInput}
                                onChange={(e) => setHobbyInput(e.target.value)}
                                onKeyDown={handleHobbyKeyDown}
                                placeholder="e.g. Photography, Hiking, Cooking..."
                                className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                            <Button onClick={handleAddHobby} size="icon" className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white">
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                         </div>
                         <p className="text-xs text-neutral-500">Press Enter or click add to save a hobby.</p>
                    </div>

                     <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Your Hobbies</label>
                        {(!data.hobbies || data.hobbies.length === 0) ? (
                            <div className="text-sm text-neutral-500 italic py-2">No hobbies added yet.</div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {data.hobbies.map((hobby, index) => (
                                    <div
                                    key={index}
                                    className="group bg-green-900/20 text-green-400 pl-3 pr-1 py-1 rounded-full text-sm font-medium border border-green-900/30 flex items-center gap-2 transition-all hover:bg-green-900/30"
                                    >
                                    <span className="flex items-center gap-1">
                                        {hobby}
                                    </span>
                                    <button 
                                        onClick={() => handleRemoveHobby(index)}
                                        className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-green-900/50 text-green-400/70 hover:text-green-300 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="languages" className="mt-0 focus-visible:outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
              <div className="space-y-6">
                 <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">Languages</h3>
                    <p className="text-sm text-neutral-400">Languages you speak and your proficiency level.</p>
                </div>
                  <div className="p-6 border border-neutral-800 rounded-xl bg-neutral-950 shadow-sm space-y-4">
                      <div className="space-y-2">
                          <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Add Languages</label>
                          <div className="flex gap-2">
                            <Input
                                value={languageInput}
                                onChange={(e) => setLanguageInput(e.target.value)}
                                onKeyDown={handleLanguageKeyDown}
                                placeholder="e.g. English (Native), Spanish (Fluent)..."
                                className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                            <Button onClick={handleAddLanguage} size="icon" className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white">
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                         </div>
                         <p className="text-xs text-neutral-500">Press Enter or click add to save a language.</p>
                      </div>

                       <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Your Languages</label>
                        {(!data.languages || data.languages.length === 0) ? (
                            <div className="text-sm text-neutral-500 italic py-2">No languages added yet.</div>
                        ) : (
                             <div className="flex flex-wrap gap-2">
                                {data.languages.map((lang, index) => (
                                    <div
                                    key={index}
                                    className="group bg-indigo-900/20 text-indigo-400 pl-3 pr-1 py-1 rounded-full text-sm font-medium border border-indigo-900/30 flex items-center gap-2 transition-all hover:bg-indigo-900/30"
                                    >
                                    <span className="flex items-center gap-1">
                                         {lang}
                                    </span>
                                    <button 
                                        onClick={() => handleRemoveLanguage(index)}
                                        className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-indigo-900/50 text-indigo-400/70 hover:text-indigo-300 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
             </div>
          </TabsContent>

          <TabsContent value="extra" className="mt-0 focus-visible:outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
              <div className="space-y-6">
                 <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">Activities</h3>
                    <p className="text-sm text-neutral-400">Volunteering, Awards, or Certifications.</p>
                </div>
                 <div className="p-6 border border-neutral-800 rounded-xl bg-neutral-950 shadow-sm space-y-4">
                      <div className="space-y-2">
                         <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Add Activities</label>
                          <div className="flex gap-2">
                            <Input
                                value={activityInput}
                                onChange={(e) => setActivityInput(e.target.value)}
                                onKeyDown={handleActivityKeyDown}
                                placeholder="e.g. Volunteer at Local Shelter, Chess Club President..."
                                className="bg-neutral-900 border-neutral-800 focus-visible:ring-blue-500 text-white"
                            />
                            <Button onClick={handleAddActivity} size="icon" className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white">
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                         </div>
                         <p className="text-xs text-neutral-500">Press Enter or click add to save an activity.</p>
                      </div>
                       <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">Your Activities</label>
                        {(!data.extraCurricular || data.extraCurricular.length === 0) ? (
                            <div className="text-sm text-neutral-500 italic py-2">No activities added yet.</div>
                        ) : (
                             <div className="flex flex-wrap gap-2">
                                {data.extraCurricular.map((activity, index) => (
                                    <div
                                    key={index}
                                    className="group bg-purple-900/20 text-purple-400 pl-3 pr-1 py-1 rounded-full text-sm font-medium border border-purple-900/30 flex items-center gap-2 transition-all hover:bg-purple-900/30"
                                    >
                                    <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-purple-400" />
                                        {activity}
                                    </span>
                                    <button 
                                        onClick={() => handleRemoveActivity(index)}
                                        className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-purple-900/50 text-purple-400/70 hover:text-purple-300 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
