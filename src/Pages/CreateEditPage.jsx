import FormMockInterview from "@/components/FormMockInterview";
import { db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
 

const CreateEditPage = () => {

const [searchParams] = useSearchParams();
const interviewId = searchParams.get("interviewId");
  
  const [ interview, setinterview ] = useState(null);

  useEffect(() => {
    const fetchinterview = async () => {
      if (interviewId) {
        try {
            const interviewdoc = await getDoc(doc(db, "interviews", interviewId)); 
            if(interviewdoc.exists()){
            setinterview({...interviewdoc.data()} );
            }
        } catch (error) {
            console.log("error at fetchinterviw  at editpage",error)
            
        }
      }
    };
    fetchinterview(); 
  }, [interviewId]);
 
  return <div className="my-4 flex-col w-full">
<FormMockInterview interview={interview}/>



  </div>;
};

export default CreateEditPage;
