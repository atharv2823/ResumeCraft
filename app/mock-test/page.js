"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { DashboardHeader } from "@/components/dashboard-header";
import { AnimatedBackground } from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/file-upload";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Brain, CheckCircle2, XCircle, ArrowRight, RefreshCw, Trophy, AlertCircle, LogOut } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MockTestPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [step, setStep] = useState("upload"); // upload, settings, loading, quiz, results
  const [resumeData, setResumeData] = useState(null);
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState("10");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleResumeUpload = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    setIsGenerating(true);

    try {
      const response = await fetch("/api/extract-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to extract resume data");
      }

      const data = await response.json();
      setResumeData(data);
      setStep("settings");
    } catch (error) {
      console.error("Extraction error:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Could not process your resume.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const startTest = async () => {
    setIsGenerating(true);
    setStep("loading");

    try {
      const response = await fetch("/api/generate-mock-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData,
          difficulty,
          questionCount: parseInt(questionCount),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate test questions");
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("AI returned an invalid response format");
      }
      setQuestions(data);
      setStep("quiz");
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "Could not generate questions.",
        variant: "destructive",
      });
      setStep("settings");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSelect = (option) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: option,
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    let correctCount = 0;
    // Only iterate through questions that have been answered
    const answeredIndices = Object.keys(userAnswers).map(Number);
    answeredIndices.forEach((index) => {
      if (userAnswers[index] === questions[index].correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setStep("results");
  };

  const restart = () => {
    setStep("upload");
    setResumeData(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!isAuthenticated) return null;

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <AnimatePresence mode="wait">
            {step === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-1">
                  <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">AI Mock Test</h1>
                  <p className="text-muted-foreground text-sm sm:text-lg">
                    Upload your resume to start a personalized test.
                  </p>
                </div>
                <Card className="border-dashed border shadow-none bg-transparent">
                  <CardContent className="p-4 sm:p-6">
                    {isGenerating ? (
                      <div className="flex flex-col items-center justify-center py-8 space-y-3">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <p className="text-sm font-medium">Analyzing...</p>
                      </div>
                    ) : (
                      <FileUpload
                        onFileSelect={handleResumeUpload}
                        accept=".pdf,.doc,.docx"
                        maxSize={5}
                      />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="shadow-lg border-none">
                  <CardHeader className="p-4 sm:p-6 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    {resumeData?.detectedField && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800/30 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
                          <Brain className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-blue-600 uppercase">Field</p>
                          <h3 className="text-sm font-bold leading-tight">{resumeData.detectedField}</h3>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Difficulty</label>
                        <Select value={difficulty} onValueChange={setDifficulty}>
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Questions</label>
                        <Select value={questionCount} onValueChange={setQuestionCount}>
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 Qs</SelectItem>
                            <SelectItem value="10">10 Qs</SelectItem>
                            <SelectItem value="15">15 Qs</SelectItem>
                            <SelectItem value="20">20 Qs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between gap-3">
                    <Button variant="ghost" onClick={() => setStep("upload")} className="h-10">
                      Back
                    </Button>
                    <Button onClick={startTest} className="h-10 bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none px-6">
                      Start <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 space-y-6"
              >
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-blue-600 animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Generating Your Test</h2>
                  <p className="text-muted-foreground text-center max-w-md">
                    ResumeCraft is creating questions tailored to your profile in <span className="font-semibold text-blue-600 dark:text-blue-400">{resumeData?.detectedField || "your professional field"}</span>...
                  </p>
                </div>
              </motion.div>
            )}

            {step === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3 sm:space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 px-1">
                  <div className="flex items-center justify-between w-full sm:w-auto">
                    <div className="space-y-0.5">
                      <p className="text-[9px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest">
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </p>
                      <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
                        {difficulty} Test
                      </h2>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <motion.button 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="sm:hidden w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <LogOut className="w-5 h-5" />
                        </motion.button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Quit Mock Test?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to end the test now? You'll see results for the questions you've already answered.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={calculateResults} className="bg-red-600 hover:bg-red-700">
                            Quit & See Results
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <div className="w-full sm:w-auto flex flex-col items-end gap-2 sm:gap-0">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="flex-1 sm:flex-none flex flex-col items-end">
                        <div className="flex justify-between w-full sm:w-32 mb-1">
                          <span className="text-[9px] sm:text-xs font-semibold text-muted-foreground uppercase">Progress</span>
                          <span className="text-[9px] sm:text-xs font-bold text-blue-600">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
                        </div>
                        <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-full sm:w-32 h-1 sm:h-2" />
                      </div>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <motion.div whileHover={{ x: 3 }}>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="hidden sm:flex text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600 gap-2 font-bold group"
                            >
                              <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Leave
                            </Button>
                          </motion.div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Quit Mock Test?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to end the test now? You'll see results for the questions you've already answered.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={calculateResults} className="bg-red-600 hover:bg-red-700">
                              Quit & See Results
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>

                <Card className="shadow-xl border-none bg-white dark:bg-gray-900 overflow-hidden rounded-xl sm:rounded-2xl">
                  <CardHeader className="p-4 sm:p-8 bg-gray-50/50 dark:bg-gray-800/10 border-b">
                    <CardTitle className="text-lg sm:text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                      {questions[currentQuestionIndex].question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-8 space-y-2 sm:space-y-4">
                    {questions[currentQuestionIndex].options.map((option, idx) => {
                      const letters = ['A', 'B', 'C', 'D'];
                      const isSelected = userAnswers[currentQuestionIndex] === option;
                      return (
                        <motion.button
                          key={idx}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleAnswerSelect(option)}
                          className={`w-full text-left p-3 sm:p-5 rounded-lg sm:rounded-2xl border transition-all duration-200 flex items-start gap-3 sm:gap-4 group relative ${
                            isSelected
                              ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm"
                              : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300"
                          }`}
                        >
                          <div className={`w-6 h-6 sm:w-10 sm:h-10 rounded-md sm:rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-xs sm:text-base transition-colors duration-200 ${
                            isSelected 
                              ? "bg-blue-600 text-white" 
                              : "bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                          }`}>
                            {letters[idx]}
                          </div>
                          <div className="flex-1 pt-0.5 sm:pt-2">
                            <span className={`text-sm sm:text-base font-medium leading-tight transition-colors duration-200 ${
                              isSelected ? "text-blue-900 dark:text-blue-100" : "text-gray-600 dark:text-gray-400"
                            }`}>
                              {option}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <CheckCircle2 className="w-4 h-4 text-blue-600" />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </CardContent>
                  <CardFooter className="p-3 sm:p-8 pt-0 border-t-0 flex justify-end">
                    <Button
                      disabled={!userAnswers[currentQuestionIndex]}
                      onClick={nextQuestion}
                      size="lg"
                      className={`w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-lg sm:rounded-xl font-bold transition-all duration-300 ${
                        !userAnswers[currentQuestionIndex] 
                          ? "bg-gray-100 text-gray-400" 
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
                      <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-2">
                    <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold">Test Results</h1>
                  <div className="flex flex-col items-center">
                    <span className="text-5xl sm:text-6xl font-black text-blue-600">
                      {Object.keys(userAnswers).length > 0 
                        ? Math.round((score / Object.keys(userAnswers).length) * 100) 
                        : 0}%
                    </span>
                    <p className="text-lg sm:text-xl text-muted-foreground font-medium mt-2">
                      You got {score} out of {Object.keys(userAnswers).length} attempted questions correct
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold px-1">Answered Questions Review</h3>
                  {questions.map((q, idx) => {
                    // Only show questions that have been answered
                    if (userAnswers[idx] === undefined) return null;
                    
                    return (
                      <Card key={idx} className={`border-l-4 overflow-hidden shadow-md ${userAnswers[idx] === q.correctAnswer ? "border-l-green-500" : "border-l-red-500"}`}>
                        <CardHeader className="p-4 sm:p-6 bg-white dark:bg-gray-900/50">
                          <div className="flex items-start justify-between gap-3">
                            <CardTitle className="text-base sm:text-lg font-bold leading-snug">{q.question}</CardTitle>
                            {userAnswers[idx] === q.correctAnswer ? (
                              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 space-y-4 pt-0">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/30 border">
                              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">Your Answer</p>
                              <p className={`text-sm font-semibold ${userAnswers[idx] === q.correctAnswer ? "text-green-600" : "text-red-600"}`}>
                                {userAnswers[idx]}
                              </p>
                            </div>
                            {userAnswers[idx] !== q.correctAnswer && (
                              <div className="p-3 rounded-lg bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
                                <p className="text-[10px] uppercase tracking-wider text-green-600 dark:text-green-400 font-bold mb-1">Correct Answer</p>
                                <p className="text-sm text-green-700 dark:text-green-300 font-bold">{q.correctAnswer}</p>
                              </div>
                            )}
                          </div>
                          <div className="p-3 sm:p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 flex gap-3">
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="text-xs sm:text-sm font-bold text-blue-600 mb-1">Explanation</p>
                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Button size="lg" variant="outline" onClick={() => router.push("/dashboard")} className="h-14 px-8 rounded-xl font-bold border-2 hover:bg-gray-50">
                    Go to Dashboard
                  </Button>
                  <Button size="lg" onClick={restart} className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-xl font-bold gap-2 shadow-lg shadow-blue-600/20">
                    <RefreshCw className="w-4 h-4" /> Start New Test
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
