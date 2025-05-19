import React, { useEffect, useState } from "react";
import BreadCrumsCustom from "../components/BreadCrumsCustom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { replace, useNavigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { Heading, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/config/firebaseConfig";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import HeaderInterview from "./HeaderInterview";
import { Separator } from "@/components/ui/separator"
import { Button } from "./button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import LoaderPage from "@/Pages/LoaderPage";
import { chatSession } from "@/scripts";


const formSchema = z.object({
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be 100 characters or less"),
  description: z.string().min(5 , "Description is required"),
  experience: z.coerce
    .number()
    .min(0, "Experience cannot be empty or negative"),
  techStack: z.string().min(1, "Tech stack must be at least a character"),
});

const FormMockInterview = ({ interview }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: interview || {},
  });

  const { isValid, isSubmitted } = form.formState;
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const title = interview ? interview.position : "Create a new mock interview";

  const breadCrumpPage = interview ? interview?.position : "Create";

  const actions = interview ? "Save Changes" : "Create";
  const gettoastMessage =  interview
    ? { title: "Updated..!", description: "Changes saved successfully..." }
    : { title: "Created..!", description: "New Mock Interview created..." };



    const cleanResponse = (responseText) => {
      // Step 1: Trim any surrounding whitespace
      let cleanText = responseText.trim();
  
      // Step 2: Remove any occurrences of "json" or code block symbols (``` or `)
      cleanText = cleanText.replace(/(json|```|`)/g, "");
  
      // Step 3: Extract a JSON array by capturing text between square brackets
      const jsonArrayMatch = cleanText.match(/\[.*\]/s);
      if (jsonArrayMatch) {
        cleanText = jsonArrayMatch[0];
      } else {
       throw new Error("No JSON array found in response");
      }
  
      // Step 4: Parse the clean JSON text into an array of objects
      try {
        return JSON.parse(cleanText);
      } catch (error) {
        throw new Error("Invalid JSON format: " + (error)?.message);
      }
    };

    const generateAiResponse = async (data) => {
      const prompt = `
      As an experienced prompt engineer, generate a JSON array containing 7 technical/related to job role interview questions (question can also be any past FAANG company questions too) (2 Easy ,3 medium ,2 Hard) 
      along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:
    
      [
        { "question": "<Question text>", "answer": "<Answer text>" },
        ...
      ] in this manner only dont give in para form and keep space between each question and answer.
    
      Job Information:
      - Job Position: ${data?.position}
      - Job Description: ${data?.description}
      - Years of Experience Required: ${data?.experience}
      - Tech Stacks: ${data?.techStack}
    
      The questions should assess skills in ${data?.techStack} development and best practices, 
      problem-solving, and experience handling complex requirements.
       Please format the output strictly as an array of JSON objects without any additional labels, 
       code blocks, or explanations. Return only the JSON array with questions and answers.
      `;
      
      
  try {
    const airesult = await chatSession.sendMessage(prompt);
    const AiResultText= airesult.response.text()
    const cleanAiResponse = cleanResponse(AiResultText);

    console.log(cleanAiResponse)
    return cleanAiResponse


    
    
    
    
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};
    

  const Onsubmit = async (data) => {
  try {
    setloading(true);

    
    const questions = await generateAiResponse(data);

    if (interview) {
       
      const interviewRef = doc(db, "mockinterviews", interview.id);
      await updateDoc(interviewRef, {
        ...data,
        questions,
      });
    } else {
      
      await addDoc(collection(db, "mockinterviews"), {
        ...data,
        userId,
        questions,
        createdAt: serverTimestamp(),
      });
    }

    toast.success(gettoastMessage.title, {
      description: gettoastMessage.description,
    });

    navigate("/interviews", { replace: true });

  } catch (error) {
    console.error("Submission error:", error);
    toast.error("Something went wrong!");
  } finally {
    setloading(false);
  }
};


  useEffect(() => {
    if (interview) {
      form.reset({
        position: interview.position,
        description: interview.description,
        experience: interview.experience,
        techStack: interview.techStack,
      });
    }
  }, [interview, form]);
  return (<> 
  <div className="m-6"> 
    <div className="w-full flex-col my-5 mx-5 space-y-4">
      <BreadCrumsCustom
        breadCrumbPage={breadCrumpPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/interview" }]}
      />
      <div className="mt-4 flex items-center justify-between w-full">
        <HeaderInterview title={title} subheading />
        {interview && (
          <Button variant={"ghost"}>
            <Trash2Icon className="mr-2 h-4 w-4 text-red-600" />
          </Button>
        )}
        
      </div>
      
    </div>
    <Separator className="my-2"/>
    <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(Onsubmit)}
          className="w-full p-8 rounded-lg flex-col flex items-start justify-start gap-6 shadow-md "
        >
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel className={"font-semibold"}>Job Role / Job Position</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    className="h-12  "
                    disabled={loading}
                    placeholder="eg:- Full Stack Developer"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel className={"font-semibold"}>Job Description</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- describle your job role"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel className={"font-semibold"}>Years of Experience</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- 5 Years"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel className={"font-semibold"}>Tech Stacks</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- React, Typescript..."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-end gap-6">
            <Button
              type="reset"
              size={"sm"}
              variant={"outline"}
              disabled={isSubmitted || loading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              size={"sm"}
              disabled={isSubmitted || !isValid || loading}
            >
              {loading ? (
                <LoaderPage className =" w-full" />
              ) : (
                actions
              )}
            </Button>
          </div>
        </form>
      </FormProvider>




    </div>
    </>
  );
};

export default FormMockInterview;
