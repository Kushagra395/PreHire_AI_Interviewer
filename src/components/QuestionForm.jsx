import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./toot-tipButton";
import { Volume2, VolumeX } from "lucide-react";
import RecordAnswer from "./RecordAnswer";
import { Check } from "lucide-react";

const QuestionForm = ({ questions }) => {
  const [isPlaying, SetisPlaying] = useState(false);
  const [isWebCamEnable, setIsWebCamEnable] = useState(false);
  const [currentSpeech, SetcurrentSpeech] = useState(null);
  const [activeTab, setActiveTab] = useState(questions[0]?.question);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
 const totalQuestions = questions.length;
  const handlePlayQuestion = (qst) => {
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      SetisPlaying(false);
      SetcurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        SetisPlaying(true);
        SetcurrentSpeech(speech);

        speech.onend = () => {
          SetisPlaying(false);
          SetcurrentSpeech(null);
        };
      }
    }
  };
  const handleAnswerSubmitted = (questionText) => {
    setAnsweredQuestions(prev => new Set([...prev, questionText]));
    const currentIndex = questions.findIndex(q => q.question === questionText);
    if (currentIndex < questions.length - 1) {
      setActiveTab(questions[currentIndex + 1].question);
    }
  };

  return (
    <div className="w-full min-h-100 border-2 bg-gray-50 rounded-md p-2 md:p-4">
      <Tabs
        defaultValue={questions[0]?.question}
        className="w-full space-y-6 md:space-y-10"
        orientation="vertical"
      >
        <TabsList className="bg-transparent w-full flex flex-wrap items-center justify-center gap-2 md:gap-8 overflow-x-auto ">
          {questions?.map((tab, i) => (
            <TabsTrigger
              className={cn(
                "data-[state=active]:bg-violet-300 data-[static=active]:shadow-md hover:bg-violet-50 text-xs px-1 py-1 md:px-4 md:py-4",
                "whitespace-nowrap"
              )}
              key={tab.question}
              value={tab.question}
            >
              <span className="md:hidden">Q{i + 1}</span> {/* Mobile only */}
              <span className="hidden md:inline">Question #{i + 1}</span> {/* Laptop only */}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {questions?.map((tab, i) => (
          <TabsContent key={i} value={tab.question} className="px-1 md:px-0">
            <p className="text-sm md:text-base text-left mx-1 md:mx-2 tracking-wide text-red-950 break-words">
              {tab.question}
            </p>

            <div className="w-full flex items-center justify-end mt-2 md:mt-0">
              <TooltipButton
                 content={isPlaying ? "Stop" : "Start"}
                icon={
                  isPlaying ? (
                    <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                  ) : (
                    <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                  )
                }
                onClick={() => handlePlayQuestion(tab.question)}
              />
            </div>

            <div className="mt-4 md:mt-6">
              <RecordAnswer
                question={tab}
                isWebCamEnable={isWebCamEnable}
                setIsWebCamEnable={setIsWebCamEnable}
                onAnswerSubmitted={() => handleAnswerSubmitted(tab.question)}
                total={totalQuestions}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QuestionForm;