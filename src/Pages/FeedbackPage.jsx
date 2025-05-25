import { db } from "@/config/firebaseConfig";
import { useAuth } from "@clerk/clerk-react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import LoaderPage from "./LoaderPage";
import CustomBreadCrumb from "../components/BreadCrumsCustom";
import InterviewPin from "@/components/InterviewPin";
import HeaderInterview from "@/components/HeaderInterview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CircleCheck, Star } from "lucide-react";

const FeedbackPage = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeFeed, setActiveFeed] = useState("");
  const { userId } = useAuth();
  const navigate = useNavigate();

  if (!id) {
    navigate("/");
  }
  //   useEffect(() => {
  //     const fetchInterview = async () => {
  //       try {
  //         const docRef = doc(db, "mockinterviews", id);
  //         const docSnap = await getDoc(docRef);
  //         if (docSnap.exists()) {
  //           setInterview({ id: docSnap.id, ...docSnap.data() });
  //         } else {
  //           console.error("No such document!");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching interview:", error);
  //       }  const fetchFeedbacks = async () => {
  //         setIsLoading(true);
  //         try {
  //           const querSanpRef = query(
  //             collection(db, "userAnswers"),
  //             where("userId", "==", userId),
  //             where("mockIdRef", "==", id)
  //           );

  //           const querySnap = await getDocs(querSanpRef);

  //           const interviewData = querySnap.docs.map((doc) => {
  //             return { id: doc.id, ...doc.data() } ;
  //           });

  //           setFeedbacks(interviewData);
  //         } catch (error) {
  //           console.log(error);
  //           toast("Error", {
  //             description: "Something went wrong. Please try again later..",
  //           });
  //         } finally {
  //           setIsLoading(false);
  //         }
  //       };
  //       fetchInterview();
  //       fetchFeedbacks();
  //     }
  //   }, [id, navigate, userId]);

  //   calculate the ratings out of 10

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const docRef = doc(db, "mockinterviews", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInterview({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching interview:", error);
      }
    };
    fetchInterview();
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const querSanpRef = query(
          collection(db, "userAnswers"),
          where("userId", "==", userId),
          where("mockIdRef", "==", id)
        );

        const querySnap = await getDocs(querSanpRef);

        const interviewData = querySnap.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        setFeedbacks(interviewData);
      } catch (error) {
        console.log(error);
               toast.error("Answer should be more than 30 characters");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedbacks();
  }, [id]);

  const overAllRating = useMemo(() => {
    if (feedbacks.length === 0) return "0.0";

    const totalRatings = feedbacks.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    );

    return (totalRatings / feedbacks.length).toFixed(1);
  }, [feedbacks]);

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  return (
    <>
      <div className="flex flex-col w-full gap-5 py-5 p-7 my-5">
        <div className="flex items-center justify-between w-full gap-2">
          <CustomBreadCrumb
            breadCrumbPage="Start"
            breadCrumpItems={[
              { label: "Mock Interviews", link: "/interviews" },
              {
                label: interview ? interview?.position : " ",
                link: `/interview/${interview?.id}`,
              },
            ]}
          />
        </div>
        <HeaderInterview
          title="Congratulations !"
          description="Your personalized feedback is now available. Dive in to see your strengths, areas for improvement, and tips to help you ace your next interview."
        />

        <p className="text-base text-muted-foreground">
          Your overall interview ratings :{" "}
          <span className="text-emerald-500 font-semibold text-xl">
            {overAllRating} / 10
          </span>
        </p>

        {interview && <InterviewPin interview={interview} OnMockpage />}

        <HeaderInterview title="Interview Feedback" subheading />

        {feedbacks && (
          <Accordion type="single" collapsible className="space-y-6">
            {feedbacks.map((feed) => (
              <AccordionItem
                key={feed.id}
                value={feed.id}
                className="border rounded-lg shadow-md"
              >
                <AccordionTrigger
                  onClick={() => setActiveFeed(feed.id)}
                  className={cn(
                    "px-5 py-3 flex items-center justify-between text-base rounded-t-lg transition-colors hover:no-underline",
                    activeFeed === feed.id
                      ? "bg-gradient-to-r from-purple-50 to-blue-50"
                      : "hover:bg-gray-50"
                  )}
                >
                  <span>{feed.question}</span>
                </AccordionTrigger>

                <AccordionContent className="px-5 py-6 bg-white rounded-b-lg space-y-5 shadow-inner">
                  <div className="text-lg font-semibold to-gray-700">
                    <Star className="inline mr-2 text-yellow-400" />
                    Rating : {feed.rating}
                  </div>

                  <Card className="border-none space-y-3 p-4 bg-green-50 rounded-lg shadow-md">
                    <CardTitle className="flex items-center text-lg">
                      <CircleCheck className="mr-2 text-green-600" />
                      Expected Answer
                    </CardTitle>

                    <CardDescription className="font-medium text-gray-700">
                      {feed.correct_ans}
                    </CardDescription>
                  </Card>

                  <Card className="border-none space-y-3 p-4 bg-yellow-50 rounded-lg shadow-md">
                    <CardTitle className="flex items-center text-lg">
                      <CircleCheck className="mr-2 text-yellow-600" />
                      Your Answer
                    </CardTitle>

                    <CardDescription className="font-medium text-gray-700">
                      {feed.user_ans}
                    </CardDescription>
                  </Card>

                  <Card className="border-none space-y-3 p-4 bg-red-50 rounded-lg shadow-md">
                    <CardTitle className="flex items-center text-lg">
                      <CircleCheck className="mr-2 text-red-600" />
                      Feedback
                    </CardTitle>

                    <CardDescription className="font-medium text-gray-700">
                      {feed.feedback}
                    </CardDescription>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </>
  );
};

export default FeedbackPage;
