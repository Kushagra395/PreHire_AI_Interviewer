import { useAuth } from "@clerk/clerk-react";
import {
  CameraOff,
  CircleStop,
  Disc3Icon,
  Loader,
  Mic,
  RefreshCw,
  Save,
  Video,
  VideoOff,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useParams } from "react-router";
import { TooltipButton } from "./toot-tipButton";
import Webcam from "react-webcam";
import { chatSession } from "@/scripts";
import { toast } from "sonner";
import SaveModal from "./SaveModal";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Button } from "./button";

const RecordAnswer = ({ question, setIsWebCamEnable, isWebCamEnable }) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();
  const { id } = useParams();

  const recordUserAnswer = async () => { // record useranswer from currentspeech
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer.length < 30) {
        toast.error("Error", { 
          description: "Answer should be more than 30 characters",
        });
        return;
      }

      const aiResult = await generateResult(
        question.question,
        question.answer,
        userAnswer,
        isWebCamEnable
      );
      setAiResult(aiResult);
    } else {
      startSpeechToText();
    }
  };

  const cleanResponse = (responseText) => {
    let cleanText = responseText.trim();
    cleanText = cleanText.replace(/(json|```|`)/g, "");
    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + error?.message);
    }
  };

  const generateResult = async (
    question,
    answer,
    userAnswer,
    isWebcamEnabled
  ) => {
    setIsAiGenerating(true);
    const prompt = `
      Question: "${question}"
      User Answer: "${userAnswer}"
      Correct Answer: "${answer}"
      Is Webcam Enabled: ${isWebcamEnabled}
      Please compare the user's answer to the correct answer, and provide a rating (from 1 to 10) based on answer quality. If the webcam is enabled, consider the user's engagement and non-verbal cues in addition to their answer, and adjust the rating accordingly. 
      Offer feedback for improvement.and also mention in your feedback that rating that you are giving also consider that camera was on or off as it show the confidence of the user.
      Return the result in JSON format with the fields "ratings" (number) and "feedback" (string).
    `;

    try {
      const aiResult = await chatSession.sendMessage(prompt);
      return cleanResponse(aiResult.response.text());
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate feedback");
      return { ratings: 0, feedback: "Error generating feedback" };
    } finally {
      setIsAiGenerating(false);
    }
  };

  const recordNewAnswer = () => {
    setUserAnswer("");
    stopSpeechToText();
    startSpeechToText();
  };

  const saveUserAnswer = async () => {
    setLoading(true);
    if (!aiResult) {
      return;
    }

    const currentQuestion = question.question;

    try {
      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", currentQuestion)
      );
      const querySnap = await getDocs(userAnswerQuery);

      if (!querySnap.empty) {
        console.log("Query Snap Size", querySnap.size);
        toast.info("Already Answered", {
          description: "You have already answered this question",
        });
        return;
      } else {
        await addDoc(collection(db, "userAnswers"), {
          mockIdRef: id,
          question: question.question,
          correct_ans: question.answer,
          user_ans: userAnswer,
          feedback: aiResult.feedback,
          rating: aiResult.ratings,
          userId,
          createdAt: serverTimestamp(),
        });

        toast("Saved", { description: "Your answer has been saved.." });
      }

      setUserAnswer("");
      stopSpeechToText();
    } catch (error) {
      console.error(error);
      toast("Error", { description: "Failed to Generate Feedback." });
    } finally {
      setLoading(false);
      setOpen(!open);
    }
  };

  useEffect(() => {
    const combineTranscripts = results
      .filter((result) => typeof result !== "string")
      .map((result) => result.transcript)
      .join(" ");
    setUserAnswer(combineTranscripts);
  }, [results]);
const handleFeedbackRedirect = async () => {
  try {
    const userAnswerQuery = query(
      collection(db, "userAnswers"),
      where("userId", "==", userId),
      where("mockIdRef", "==", id)
    );
    const querySnap = await getDocs(userAnswerQuery);

    const totalAnswered = querySnap.size;
    const totalQuestions = question.total; // Ensure this prop is passed to the component

    if (totalAnswered < totalQuestions) {
      toast.error("Answer all questions first", {
        description: `You have answered ${totalAnswered} out of ${totalQuestions} questions`,
      });
    } else {
      // Navigate to feedback page
      window.location.href = `/interview/feedback/${id}`;
    }
  } catch (error) {
    console.error("Error checking answers:", error);
    toast.error("Error", { description: "Something went wrong." });
  }
};

  
 
  return (
    <>
      <div className="w-full flex flex-col items-center gap-4 md:gap-8 mt-2 md:mt-4">
        <SaveModal
          isOpen={open}
          onClose={() => setOpen(false)}
          loading={loading}
          onConfirm={saveUserAnswer}
        />
        <div className="relative w-full max-w-[350px] h-[250px] md:h-[350px] aspect-video bg-white border border-gray-300 shadow-md rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500 ease-in-out">
          {isWebCamEnable ? (
            <Webcam
              onUserMedia={() => setIsWebCamEnable(true)}
              onUserMediaError={() => setIsWebCamEnable(false)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 px-4">
              <CameraOff className="w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-3 text-gray-400" />
              <p className="text-sm font-medium">Webcam is disabled</p>
              <p className="text-xs text-muted-foreground">
                Click the camera icon to enable Webcam & Mic
              </p>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-1 p-1 rounded-lg bg-gray-100 bg-gray-100 gap-2 md:gap-3  px-2">
           <TooltipButton
    content={isWebCamEnable ? "Turn Off" : "Turn On"}
    buttonVariant="default"
    buttonClassName={
      isWebCamEnable 
        ? "bg-red-100 hover:bg-red-200 text-red-700" 
        : "bg-green-100 hover:bg-green-200 text-green-700"
    }
    icon={
      isWebCamEnable ? (
        <VideoOff className="min-w-5 min-h-5" />
      ) : (
        <Video className="min-w-5 min-h-5" />
      )
    }
    onClick={() => setIsWebCamEnable(!isWebCamEnable)}
  />

  {/* Recording Button */}
  <TooltipButton
    content={isRecording ? "Stop Recording" : "Start Recording"}
    buttonVariant="default"
    buttonClassName={
      isRecording 
        ? "bg-purple-100 hover:bg-purple-200 text-purple-700" 
        : "bg-blue-100 hover:bg-blue-200 text-blue-700"
    }
    icon={
      isRecording ? (
        <Disc3Icon className="min-w-5 min-h-5 animate-spin" />
      ) : (
        <Mic className="min-w-5 min-h-5" />
      )
    }
    
    onClick={recordUserAnswer}
  />

  {/* Record Again Button */}
  <TooltipButton
    content="Record Again"
    buttonVariant="default"
    buttonClassName="bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
    icon={<RefreshCw className="min-w-5 min-h-5" />}
    onClick={recordNewAnswer}
  />
  
  {/* Save Result Button */}
  <TooltipButton
    content="Save Result"
    buttonVariant="default"
    buttonClassName="bg-sky-100 hover:bg-sky-200 text-sky-700"
    icon={
      isAiGenerating ? (
        <Loader className="min-w-5 min-h-5 animate-spin" />
      ) : (
        <Save className="min-w-5 min-h-5" />
      )
    }
    onClick={() => setOpen(!open)}
    disbaled={!aiResult}
          />
        </div>

        <div className="w-full text-xs text-center text-muted-foreground text-red-500 px-2">
          * Stop recording once done with answer
        </div>
        
        <div className="w-full p-3 md:p-4 border rounded-md bg-gray-50">
          <h2 className="text-base md:text-lg font-bold">Your Answer:</h2>
          <p className="text-sm mt-1 md:mt-2 text-green-900 whitespace-normal break-words">
            {userAnswer || "Start recording to see your answer here"}
          </p>

          {interimResult && (
            <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">
              <strong>Current Speech:</strong> {interimResult}
            </p>
          )}
        </div>
       <div className=" md:-my-4 w-full text-end px-3 text-xs text-muted-foreground text-red-500 mb-1">
  * Click Feedback Once Done with all 7 Questions
</div>
<div className=" md:-my-1  w-full text-end px-3 md:px-4">
  <Button onClick={handleFeedbackRedirect}>
    Feedback
  </Button>
</div>
 
      </div>
    </>
  );
};

export default RecordAnswer;