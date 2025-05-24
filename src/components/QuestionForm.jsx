import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./toot-tipButton";
import { Volume2, VolumeX } from "lucide-react";
import RecordAnswer from "./RecordAnswer";

const QuestionForm = ({ questions }) => {
  const [isPlaying, SetisPlaying] = useState(false);
  const [isWebCamEnable, setIsWebCamEnable] = useState(false);
  const [currentSpeech, SetcurrentSpeech] = useState(null);

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

  return (
    <div className="w-full min-h-100 boarder-2  bg-gray-50 rounded-md p-2 ">
      <Tabs
        defaultValue={questions[0]?.question}
        className="w-full space-y-10"
        orientation="vertical"
      >
        <TabsList className="bg-transparent w-full flex flex-wrap items-center justify-center gap-8">
          {questions?.map((tab, i) => (
            <TabsTrigger
              className={cn(
                "data-[state=active]:bg-violet-300 data-[static=active]:shadow-md hover:bg-violet-50 text-xs px-2"
              )}
              key={tab.question}
              value={tab.question}
            >
              {`Question #${i + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>
        {questions?.map((tab, i) => (
          <TabsContent key={i} value={tab.question}>
            <p className="text-base text-left mx-2 tracking-wide text-red-950">
              {tab.question}
            </p>

            <div className="w-full flex items-center justify-end">
              <TooltipButton
                content={isPlaying ? "Stop" : "Start"}
                icon={
                  isPlaying ? (
                    <VolumeX className="min-w-5 min-h-5 text-muted-foreground" />
                  ) : (
                    <Volume2 className="min-w-5 min-h-5 text-muted-foreground" />
                  )
                }
                onClick={() => handlePlayQuestion(tab.question)}
              />
            </div>

            <RecordAnswer
              question={tab}
              isWebCamEnable={isWebCamEnable}
             setIsWebCamEnable ={setIsWebCamEnable}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QuestionForm;
