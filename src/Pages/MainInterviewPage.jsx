import BreadCrumsCustom from "@/components/BreadCrumsCustom";
import { Button } from "@/components/button";
import InterviewPin from "@/components/InterviewPin";
import { db } from "@/config/firebaseConfig";
import { Label } from "@radix-ui/react-label";
import { doc, getDoc } from "firebase/firestore";
import { Camera, CameraOff, Lightbulb, LightbulbIcon, Sparkle, Sparkles, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Webcam from "react-webcam";

const MainInterviewPage = () => {
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
        <BreadCrumsCustom
          breadCrumbPage={interview ? interview?.position : " "}
          breadCrumpItems={[{ label: "Mock Interviews", link: "/interviews" }]}
        />

        {interview && (
          <Link to={`/interview/${interview.id}/start`}>
            <Button className="mx-10 hover:bg-violet-600 bg-black" size="sm">
              Start<Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {interview && <InterviewPin interview={interview} OnMockpage />}

      <div className="w-full  ">
        <Alert className="bg-sky-100 border border-sky-200 p-4 rounded-lg flex items-start gap-2">
         <LightbulbIcon className="h-4 w-4 b-0 p-0 text-sky-600" />
         <div>
           <AlertTitle className="text-sky-800 font-extrabold">
             Important Note
           </AlertTitle>
           <AlertDescription className="text-sm text-sky-700 mt-1 leading-relaxed">
             Once you start the interview, Press "Record Answer" to begin answering the question. Once you finish the interview, stop the recording and save your result. 
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

        {/* Webcam Section Starts Here */}
        <div className="flex flex-col items-center justify-center w-full mt-6 gap-4">
          <div className="relative w-[400px] h-[400px] max-w-md aspect-video bg-white border border-gray-300 shadow-md rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500 ease-in-out">
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
                  Click the button below to enable
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={() => setIsWebCamEnable(!isWebCamEnable)}
            className="hover:bg-violet-500 bg-black text-white rounded-md px-2 my-2 py-2"
          >
            <WebcamIcon className="ml-2 h-4 w-4" />
            {isWebCamEnable ? "Disable Webcam" : "Enable Webcam"}
             
          </Button>
        </div>
        {/* Webcam Section Ends Here */}
      </div>
    </div>
  </>
);

};

export default MainInterviewPage;
