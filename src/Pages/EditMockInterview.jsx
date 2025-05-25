import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import FormMockInterview from "../components/FormMockInterview";
import LoaderPage from "@/Pages/LoaderPage";

const EditMockInterview = () => {
  const { id } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const docRef = doc(db, "mockinterviews", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInterviewData({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching interview:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [id]);

  if (loading) return <LoaderPage />;

  return <FormMockInterview interview={interviewData} />;
};

export default EditMockInterview;
 