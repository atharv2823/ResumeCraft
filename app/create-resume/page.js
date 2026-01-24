"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { DashboardHeader } from "@/components/dashboard-header";
import { ResumeBuilder } from "@/components/resume-builder";
import { ResumePreview } from "@/components/resume-preview";
import { AtsScoreDisplay } from "@/components/ats-score-display";
import { ResumeFormatSelector } from "@/components/resume-format-selector";
import { AnimatedBackground } from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/file-upload";
import { Sparkles, Eye, Download, Upload, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LayoutTemplate } from "lucide-react";

export default function CreateResumePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      title: "",
      summary: "",
      photo: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      linkedin: "",
      portfolio: "",
      github: "",
      dribbble: "",
      behance: "",
      kaggle: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    hobbies: [],
    extraCurricular: [],
  });
  const [atsScore, setAtsScore] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState("modern");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleDataChange = (newData) => {
    setResumeData(newData);
  };

  const analyzeResume = async (data) => {
    setIsAnalyzing(true);
    try {
      console.log("Analyzing resume data");

      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze resume");
      }

      const result = await response.json();

      setAtsScore(result);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast({
        title: "Analysis Failed",
        description:
          error.message || "Could not analyze your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Update the handleUploadResume function with better error handling

  const handleUploadResume = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    setIsAnalyzing(true);
    setIsUploadDialogOpen(true);

    try {
      console.log("Extracting resume data from:", file.name);
      toast({
        title: "Uploading & Parsing...",
        description: "Please wait while we extract data from your resume.",
      });

      const response = await fetch("/api/extract-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.details ||
            errorData.error ||
            "Failed to extract resume data",
        );
      }

      const extractedData = await response.json();

      // Transform extracted data to match component structure
      const transformedData = {
        personalInfo: extractedData.personalInfo || {},
        skills: extractedData.skills || [],
        experience: (extractedData.experience || []).map((exp) => {
          if (exp.company && exp.role) {
            // Parse duration like "Jan 2025 – June 2025" to startDate and endDate
            let startDate = "", endDate = "";
            if (exp.duration) {
              const parts = exp.duration.split('–').map(p => p.trim());
              if (parts[0]) {
                const startMatch = parts[0].match(/(\w+)\s+(\d+)/);
                if (startMatch) {
                  const monthMap = {
                    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
                    'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
                  };
                  const month = monthMap[startMatch[1]];
                  const year = startMatch[2];
                  if (month && year) startDate = `${year}-${month}`;
                }
              }
              if (parts[1]) {
                const endMatch = parts[1].match(/(\w+)\s+(\d+)/);
                if (endMatch) {
                  const monthMap = {
                    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
                    'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
                  };
                  const month = monthMap[endMatch[1]];
                  const year = endMatch[2];
                  if (month && year) endDate = `${year}-${month}`;
                }
              }
            }
            return {
              company: exp.company,
              position: exp.role,
              startDate: startDate,
              endDate: endDate,
              description: exp.responsibilities?.join('. ') || ""
            };
          } else if (exp.project) {
            return {
              company: exp.project,
              position: "",
              startDate: "",
              endDate: "",
              description: exp.description || ""
            };
          }
          return {
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
          };
        }),
        education: (extractedData.education || []).map((edu) => ({
          degree: edu.degree || "",
          institution: edu.institution || "",
          field: "", // Could extract if available
          startDate: "", // Not provided in API
          endDate: edu.year || "",
          gpa: edu.score || ""
        })),
      };

      // Merge with existing structure
      const mergedData = {
        ...resumeData,
        ...transformedData,
        personalInfo: {
          ...resumeData.personalInfo,
          ...transformedData.personalInfo,
        },
      };

      setResumeData(mergedData);
      setIsUploadDialogOpen(false);

      toast({
        title: "Resume Extracted",
        description:
          "Your resume data has been successfully imported. Please review and edit.",
      });
    } catch (error) {
      console.error("Error extracting resume:", error);
      toast({
        title: "Extraction Failed",
        description:
          error.message ||
          "Could not extract data from your resume. Please try again.",
        variant: "destructive",
      });
      setIsUploadDialogOpen(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      // Get the rendered HTML content
      const resumeElement = document.getElementById("resume-preview-content");

      if (!resumeElement) {
        throw new Error("Resume preview element not found");
      }

      // Clone the node to manipulate it for PDF generation if needed
      // For now, innerHTML is sufficient, but we might want style computation
      // Sending HTML string to server
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: resumeElement.outerHTML }),
      });

      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resumeData.personalInfo.name || "resume"}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Resume Downloaded",
        description: "Your resume has been successfully downloaded as a PDF.",
      });
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        title: "Download Failed",
        description: "Could not download your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-4 md:py-8 lg:h-[calc(100vh-64px)]">
          <div className="max-w-[1600px] mx-auto h-full flex flex-col">
            <Tabs
              defaultValue="builder"
              className="w-full h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h1 className="text-3xl font-bold">Create Your Resume</h1>
                <TabsList className="grid w-[400px] grid-cols-2">
                  <TabsTrigger value="builder">Builder</TabsTrigger>
                  <TabsTrigger value="format">Format</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="builder" className="flex-1 mt-0 h-full">
                <ResumeBuilder data={resumeData} onChange={handleDataChange} />
              </TabsContent>
              <TabsContent
                value="format"
                className="mt-0 h-full flex flex-col relative"
              >
                {/* Format Selection Drawer */}
                <div className="absolute top-4 left-4 z-20">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        size="lg"
                        className="shadow-xl bg-white text-gray-900 border hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                      >
                        <LayoutTemplate className="mr-2 h-5 w-5" />
                        Change Template
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="w-[400px] sm:w-[540px] overflow-y-auto"
                    >
                      <SheetHeader className="mb-6">
                        <SheetTitle>Choose a Resume Template</SheetTitle>
                        <SheetDescription>
                          Select a layout that best fits your profession.
                        </SheetDescription>
                      </SheetHeader>
                      <ResumeFormatSelector
                        selectedFormat={selectedFormat}
                        onSelectFormat={setSelectedFormat}
                        data={resumeData}
                        gridClassName="grid-cols-1 sm:grid-cols-2"
                      />
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Main Preview Area */}
                <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden relative">
                  {/* Toolbar */}
                  <div className="bg-white dark:bg-gray-800 p-4 border-b flex justify-between items-center pl-48 sm:pl-4">
                    {" "}
                    {/* Increased padding-left to avoid button overlap on mobile if needed, though button is absolute */}
                    <div className="hidden sm:block">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Eye className="w-5 h-5 text-blue-600" />
                        Live Preview
                      </h2>
                    </div>
                    {/* Centered on mobile usually, right on desktop */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <Button
                        onClick={handleDownloadPdf}
                        className="bg-blue-600 hover:bg-blue-700 shadow-sm"
                      >
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                      </Button>
                    </div>
                  </div>

                  {/* Scrollable Preview Canvas */}
                  <div className="flex-1 w-full h-full overflow-y-auto p-4 md:p-8 flex justify-center items-start custom-scrollbar bg-[url('/grid.svg')]">
                    <div className="scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.85] origin-top transition-transform duration-300 ease-in-out shadow-2xl my-4">
                      <div id="resume-preview-content">
                        <ResumePreview
                          data={resumeData}
                          format={selectedFormat}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
          {/* Upload Button */}
          <Dialog
            open={isUploadDialogOpen}
            onOpenChange={setIsUploadDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="h-14 w-14 rounded-full shadow-lg bg-green-600 text-white hover:bg-green-700 p-0 animate-in zoom-in duration-300 delay-200"
              >
                <Upload className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Upload className="h-5 w-5" />
                  Upload Resume
                </DialogTitle>
                <DialogDescription>
                  Upload your existing resume to automatically extract
                  information.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                    <p className="text-sm text-muted-foreground">
                      Extracting resume data...
                    </p>
                  </div>
                ) : (
                  <FileUpload
                    onFileSelect={handleUploadResume}
                    accept=".pdf,.doc,.docx"
                    maxSize={5}
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Preview Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="h-14 w-14 rounded-full shadow-lg bg-gray-900 text-white hover:bg-gray-800 p-0 animate-in zoom-in duration-300 delay-100"
              >
                <Eye className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-full">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </DialogTitle>
                <DialogDescription>
                  Review your resume and download it as a PDF.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <ResumePreview data={resumeData} format={selectedFormat} />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    onClick={handleDownloadPdf}
                    className="w-full sm:w-auto gap-2"
                  >
                    <Download className="h-4 w-4" /> Download PDF
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* ATS Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-0 animate-in zoom-in duration-300"
              >
                <Sparkles className="h-6 w-6 text-white" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  AI Resume Analysis
                </DialogTitle>
                <DialogDescription>
                  Get detailed feedback and ATS compatibility scoring for your
                  resume.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                {!atsScore && !isAnalyzing ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Ready to Analyze?</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Our AI will scan your resume for ATS compatibility,
                      keyword optimization, and content quality.
                    </p>
                    <Button
                      onClick={() => analyzeResume(resumeData)}
                      size="lg"
                      className="gap-2"
                    >
                      <Sparkles className="h-4 w-4" /> Analyze Now
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg border">
                      <span className="text-sm font-medium">
                        Analysis based on current data
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => analyzeResume(resumeData)}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? "Analyzing..." : "Refresh Score"}
                      </Button>
                    </div>
                    <AtsScoreDisplay score={atsScore} isLoading={isAnalyzing} />
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
