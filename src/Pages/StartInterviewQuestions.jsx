import { db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import LoaderPage from "@/Pages/LoaderPage";
import CustomBreadCrumb from "../components/BreadCrumsCustom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LightbulbIcon } from "lucide-react";
import QuestionForm from "@/components/QuestionForm";

const StartInterviewQuestions = () => {
  const { id } = useParams();
  const [interview, setinterview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWebCamEnable, setIsWebCamEnable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const docRef = doc(db, "mockinterviews", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setinterview({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching interview:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterview();
  }, [id]);

  if (isLoading) return <LoaderPage />;

  return (
    <>
      <div className="flex flex-col w-full gap-5 py-5 p-7 my-5">
        <div className="flex items-center justify-between w-full gap-2">
          <CustomBreadCrumb
            breadCrumbPage="Start"
            breadCrumpItems={[
              { label: "Mock Interviews", link: "/interviews" },
              {
                label: interview?.position || "",
                link: `/interview/${interview?.id}`,
              },
            ]}
          />
        </div>

        <div className="w-full mt-5 px-3">
        <Alert className="bg-sky-100 border border-sky-200 p-4 rounded-lg flex items-start gap-2">
  <LightbulbIcon className="h-4 w-4 b-0 p-0 text-sky-600" />
  <div>
    <AlertTitle className="text-sky-800 font-extrabold">
      Important Note
    </AlertTitle>
    <AlertDescription className="text-sm text-sky-700 mt-1 leading-relaxed">
      Press "Record Answer" to begin answering the question. Once you finish the interview, stop the recording and save your result. 
      You'll receive feedback comparing your responses with the ideal answers.{" "}
      <strong>Note:</strong>{" "}
      <span className="font-medium">
        • Your video is never recorded.
      </span>{" "}
      • You can disable the webcam anytime if preferred.{" "}
      <strong>• After saving, you will not be able to answer the same question again.</strong>
    </AlertDescription>
  </div>
</Alert>

        </div>

        {interview?.questions && interview?.questions.length > 0 && (
          <div className="mt-4 w-full flex flex-col items-start gap-4 px-3">
            <QuestionForm questions={interview?.questions} />
          </div>
        )}
      </div>
    </>
  );
};

export default StartInterviewQuestions;
