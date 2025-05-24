import { useAuth } from "@clerk/clerk-react";
import {
  CameraOff,
  CircleStop,
  Disc3Icon,
  Loader,
  Mic,
  RefreshCw,
  Save,
  SaveAll,
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
  const [sessionResults, setSessionResults] = useState([]);
  const [isNewSession, setIsNewSession] = useState(false);

  const { userId } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      console.error("Speech recognition error:", error);
    }
  }, [error]);

  useEffect(() => {
    // Combine final results with current interim result
    const finalTranscript = results
      .filter((result) => result.isFinal)
      .map((result) => result.transcript)
      .join(" ");

    const currentTranscript = interimResult
      ? `${finalTranscript} ${interimResult}`
      : finalTranscript;

    // Only update if we're in an active session
    if (isRecording || isNewSession) {
      setUserAnswer((prev) => {
        // Reset if new session
        if (isNewSession) {
          setIsNewSession(false);
          return currentTranscript;
        }
        return `${prev} ${currentTranscript}`.trim();
      });
    }
  }, [results, interimResult, isRecording, isNewSession]);

  // useEffect(() => {
  //   // Combine all final results and the current interim result
  //   const finalTranscript = results
  //     .filter((result) => result.isFinal)
  //     .map((result) => result.transcript)
  //     .join(" ");

  //   // Combine with interim result if available
  //   const fullTranscript = interimResult
  //     ? `${finalTranscript} ${interimResult}`
  //     : finalTranscript;

  //   setUserAnswer(fullTranscript);
  // }, [results, interimResult]);

  // const recordUserAnswer = async () => {
  //   if (isRecording) {
  //     stopSpeechToText();

  //     // Wait a moment for the final results to be processed
  //     await new Promise(resolve => setTimeout(resolve, 500));

  //     if (userAnswer?.length < 30) {
  //       toast.error("Error", {
  //         description: "Your answer should be more than 30 characters",
  //       });
  //       return;
  //     }

  //     // ai result
  //     const aiResult = await generateResult(
  //       question.question,
  //       question.answer,
  //       userAnswer,
  //       isWebCamEnable
  //     );

  //     console.log(aiResult)
  //     setAiResult(aiResult);
  //   } else {
  //     // Clear previous results when starting new recording

  //     startSpeechToText();
  //   }
  // };

  const recordUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      setIsNewSession(false);

      // Wait for final processing
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Get final answer from current state
      const finalAnswer = userAnswer.replace(interimResult || "", "").trim();

      if (finalAnswer.length < 30) {
        toast.error("Answer should be more than 30 characters");
        return;
      }

      // Generate AI result with final answer
      const aiResult = await generateResult(
        question.question,
        question.answer,
        finalAnswer,
        isWebCamEnable
      );
      console.log(aiResult);
      setAiResult(aiResult);
    } else {
      // Start new session
      setUserAnswer("");
      setSessionResults([]);
      setIsNewSession(true);
      startSpeechToText();
    }
  };

  // const recordNewAnswer = () => {
  //   setUserAnswer('');
  //   setSessionResults([]);
  //   stopSpeechToText();
  //   setIsNewSession(true);
  //   startSpeechToText();
  // };
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

      // if the user already answerd the question dont save it again
      if (!querySnap.empty) {
        console.log("Query Snap Size", querySnap.size);
        toast.info("Already Answered", {
          description: "You have already answered this question",
        });
        return;
      } else {
         // save the user answer
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

  const cleanResponse = (responseText) => {
    // Step 1: Trim any surrounding whitespace
    let cleanText = responseText.trim();

    // Step 2: Remove any occurrences of "json" or code block symbols (``` or `)
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    // Step 3: Parse the clean JSON text into an array of objects
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

      const parsedResult = cleanResponse(aiResult.response.text());
      return parsedResult;
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "An error occurred while generating feedback.",
      });
      return { ratings: 0, feedback: "Unable to generate feedback" };
    } finally {
      setIsAiGenerating(false);
    }
  };

  const recordNewAnswer = () => {
    setUserAnswer("");
    stopSpeechToText();
    startSpeechToText();
  };

  return (
    <>
      <div className="w-full flex flex-col items-center gap-8 mt-4">
        <SaveModal
          isOpen={open}
          onClose={() => setOpen(false)}
          loading={loading}
          onConfirm={saveUserAnswer}
        />
        <div className="relative w-[350px] h-[350px] max-w-md aspect-video bg-white border border-gray-300 shadow-md rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500 ease-in-out">
          {isWebCamEnable ? (
            <Webcam
              onUserMedia={() => setIsWebCamEnable(true)}
              onUserMediaError={() => setIsWebCamEnable(false)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 px-4">
              <CameraOff className="w-16 h-16 mb-3 text-gray-400" />
              <p className="text-sm font-medium">Webcam is disabled</p>
              <p className="text-xs text-muted-foreground">
                Click the below Camera to enable Webcam & Mic for answering
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-3">
          <TooltipButton
            content={isWebCamEnable ? "Turn Off" : "Turn On"}
            icon={
              isWebCamEnable ? (
                <VideoOff className="min-w-5 min-h-5" />
              ) : (
                <Video className="min-w-5 min-h-5" />
              )
            }
            onClick={() => setIsWebCamEnable(!isWebCamEnable)}
          />

          <TooltipButton
            content={isRecording ? "Stop Recording" : "Start Recording"}
            icon={
              isRecording ? (
                <Disc3Icon className="min-w-5 min-h-5 animate-spin" />
              ) : (
                <Mic className="min-w-5 min-h-5" />
              )
            }
            onClick={recordUserAnswer}
          />

          <TooltipButton
            content="Record Again"
            icon={<RefreshCw className="min-w-5 min-h-5" />}
            onClick={recordNewAnswer}
          />
          <TooltipButton
            content="Save Result"
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

        <div className="w-full -my-5 text-xs text-muted-foreground text-red-500">
          {" "}
          * stop recording once done with answer
        </div>
        <div className="w-full mt-0 p-4 border rounded-md bg-gray-50">
          <h2 className="text-lg font-bold">Your Answer:</h2>
          <p className="text-sm mt-2 text-green-900 whitespace-normal">
            {userAnswer || "Start recording to see your answer here"}
          </p>

          {interimResult &&
            !results.some((r) => r.transcript.includes(interimResult)) && (
              <p className="text-sm text-gray-400 mt-2">
                <strong>Current Speech:</strong> {interimResult}
              </p>
            )}
        </div>
      </div>
    </>
  );
};

export default RecordAnswer;
