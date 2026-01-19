"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FeaturesPage = () => {
  const router = useRouter();
  const features = [
    {
      step: 1,
      title: "Login & Authentication",
      description:
        "Start by logging in using your email and password to access all features.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      step: 2,
      title: "Home Page & Options",
      description:
        "Access the landing page with two main options: Create New Resume or Scan Existing Resume.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      step: 3,
      title: "Resume Creation",
      description:
        "Create your resume with AI-powered suggestions, extract content from existing resumes, and see live ATS scores while editing.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      step: 4,
      title: "Resume Format Selection",
      description:
        "Choose from 3-4 professionally designed resume formats that best suit your needs and industry.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
    },
    {
      step: 5,
      title: "Resume Download",
      description:
        "Download your completed resume in PDF format, ready for job applications.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      ),
    },
    {
      step: 6,
      title: "Resume Scanner",
      description:
        "Upload existing resumes for ATS scoring and receive AI-powered suggestions using Gemini Flash model for improvements.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="container mx-auto relative z-10">
      <div className="flex items-center justify-between mb-16">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="group relative px-4 py-2 text-foreground hover:text-primary transition-colors duration-200 ease-in-out"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium">Back</span>
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
        </Button>
        <div className="flex-1 text-center">
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-muted-foreground text-lg">
            Your journey to creating the perfect resume
          </p>
        </div>
        <div className="w-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="mb-8 relative">
            {index !== features.length - 1 && (
              <div className="absolute left-6 top-14 w-0.5 h-full bg-border" />
            )}
            <Card className="p-6 flex items-start gap-4 relative bg-card/50 backdrop-blur-sm border-2 hover:border-primary transition-colors">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center relative z-10">
                <div className="text-primary">{feature.icon}</div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Step {feature.step}: {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
