import { useAuth } from "@clerk/clerk-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./toot-tipButton";
import { Eye, Newspaper, Sparkles, Trash2 } from "lucide-react";
import DeleteInterview from "@/Pages/DeleteInterview";
 


function InterviewPin({ interview, OnMockpage = false }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  // Function to convert Firestore Timestamp to readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return "No date set";
    // If timestamp is a Firestore Timestamp object
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }
    // If it's already a string or other format
    return timestamp;
  };

  return (
    // <Card className="bg-white hover:bg-violet-50 shadow-xl">
    //   <CardHeader>
    //     <CardTitle className="text-xl font-bold">
    //       {interview.position}
    //     </CardTitle>
    //     <CardDescription className="w-full">
    //       {interview.description.substring(0, 120)}
    //       {interview.description.length > 20 ? "..." : ""}
    //     </CardDescription>
    //   </CardHeader>

    //     {interview.techStack.split(",").map((word, index) => (

    //        <div className="flex item-center flex-w  gap-2">
    //         <Badge
    //           className="   bg-white text-black text-xs  hover:bg-violet-100 hover:border-violet-600"
    //           key={index}
    //           varient="outline"
    //         >
    //           {word}
    //         </Badge>

    //        </div>

    //     ))}
    //     {/* <p>Created at: {formatDate(interview.createdAt)}</p>
    //     {interview.time && <p>Interview Time: {formatDate(interview.time)}</p>} */}

    //   {/* <CardFooter>
    //     <Button
    //       onClick={() => {
    //         navigate(`/takeinterview/${interview.id}`);
    //       }}
    //       disabled={loading}
    //     >
    //       {loading ? "Loading..." : "Take Interview"}
    //     </Button>
    //   </CardFooter> */}
    // </Card>

  <Card
  className={cn(
    OnMockpage ? "bg-purple-50" : "bg-white hover:bg-violet-50 shadow-xl "
  )}
>
  <CardHeader>
    <CardTitle className="text-xl font-bold">
      {interview.position}
    </CardTitle>
    <CardDescription className="w-full">
      {OnMockpage ? interview.description : interview.description.substring(0, 120)}
      {OnMockpage || interview.description.length <= 20 ? "" : "..."}
    </CardDescription>
  </CardHeader>
  {/* ... rest of the code remains the same ... */}
      <CardContent>
        <div className=" mx-(-2) flex flex-wrap justify-start gap-2">
          {interview.techStack.split(",").map((word, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-white text-black text-small hover:bg-violet-200 hover:border-violet-700"
            >
              {word.trim()}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter
        className={cn(
          "w-full flex items-center mx-0.5 -my-3 ",
          OnMockpage ? "justify-end" : "justify-between"
        )}
      >
        <p className="text-[12px] text-muted-foreground truncate whitespace-nowrap">
          {`${new Date(interview?.createdAt.toDate()).toLocaleDateString(
            "en-US",
            { dateStyle: "long" }
          )} - ${new Date(interview?.createdAt.toDate()).toLocaleTimeString(
            "en-US",
            { timeStyle: "short" }
          )}`}
        </p>
        {!OnMockpage && (
          <div className="flex items-center justify-center">
            <TooltipButton
              content="View"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/interview/edit/${interview.id}`, { replace: true });
              }}
              disbaled={false}
              buttonClassName="hover:text-sky-500"
              icon={<Eye />}
              loading={false}
            />

            <TooltipButton
              content="Start"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/interview/${interview?.id}`, {
                  replace: true,
                });
              }}
              disbaled={false}
              buttonClassName="hover:text-green-500"
              icon={<Sparkles />}
              loading={false}
            />

            <TooltipButton
              content="Feedback"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/interview/feedback/${interview?.id}`, {
                  replace: true,
                });
              }}
              disbaled={false}
              buttonClassName="hover:text-yellow-500"
              icon={<Newspaper />}
              loading={false}
            />

            <TooltipButton
              content="Delete"
              buttonVariant="ghost"
              onClick={() => DeleteInterview(interview?.id, navigate)}
              disbaled={false}
              buttonClassName="hover:text-red-500"
              icon={<Trash2 />}
              loading={false}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default InterviewPin;
