import { Button } from '@/components/button';
import HeaderInterview from '@/components/HeaderInterview';
import { Separator } from "@/components/ui/separator";
import { db } from '@/config/firebaseConfig';
import { useAuth } from '@clerk/clerk-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { FolderOpenIcon, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // corrected from 'react-router'
import { toast } from 'sonner'; // assuming you're using 'sonner' for toast notifications
import { Skeleton } from "@/components/ui/skeleton"
import InterviewPin from '@/components/InterviewPin';
  


const Interview = () => {
  const [interview, setinterview] = useState([]);
  const [loading, setloading] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;

    setloading(true);

    const interviewQuery = query(
      collection(db, "mockinterviews"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(
      interviewQuery,
      (snapshot) => {
        const interviewList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setinterview(interviewList);
        setloading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        toast.error("Error fetching interviews", {
          description: error.message,
        });
        setloading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return (
  < div className="m-3">
    <div className="flex w-full p-3 items-center justify-between">
      <HeaderInterview
        title="Dashboard"
        description="Create and Start your AI-Powered Interviews"
      />
      <Link to="/interview/create">
        <Button className="bg-black m-2 hover:bg-violet-600 rounded-xl p-4 text-white">
          <Plus /> Add Interview
        </Button>
      </Link>
    </div>
    <Separator className="my-2" />

    <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {loading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-[125px] w-[250px] rounded-xl"
          />
        ))
      ) : interview.length > 0 ? (
        interview.map((interview) => (
          <InterviewPin key={interview.id} interview={interview} />
        ))
      ) : (
          <div className="md:col-span-3 w-full flex flex-grow items-center justify-center h-96 flex-col">
          <FolderOpenIcon className="w-25 h-25 mr-1 text-violet-500" />

            <h2 className="text-xl font-bold text-muted-foreground">
              No Data Found
            </h2>

            <p className="w-full md:w-96 text-center text-sm text-neutral-400 mt-3">
              There is no available data to show. Please add some new mock
              interviews
            </p>

            <Link to={"/interview/create"} className="mt-4">
              <Button   size={"sm"}>
                <Plus className="min-w-5 min-h-5 mr-1" />
                Add New
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Interview;
 