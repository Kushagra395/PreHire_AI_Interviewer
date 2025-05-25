import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "../assets/Images/aboutusbanner1.png";
import banner2 from "../assets/Images/aboutusbannner2.png";
import banner3 from "../assets/Images/aboutusbanner3.png";

// Shadcn components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const words = ["Practice", "Prepare", "Placed"];
const banners = [banner1, banner2, banner3];

export default function About() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);

  // Typing animation
  useEffect(() => {
    if (charIndex < words[wordIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + words[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setDisplayedText("");
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, wordIndex]);

  // Banner carousel
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(bannerInterval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#0f0f1b",
        color: "white",
        minHeight: "100vh",
        padding: "5rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Hero Text */}
      <div>
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 700,
            lineHeight: 1.4,
            marginBottom: "1rem",
          }}
        >
          PreHire is an AI-powered interview
          <br />
          simulator where you can
          <br />
          <span
            style={{
              fontSize: "3.9rem",
              color: "#a855f7",
              borderRight: "2px solid #a855f7",
              paddingRight: "5px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              display: "inline-block",
            }}
          >
            {displayedText}
          </span>
        </h1>
      </div>

      {/* Banner */}
      <div
        style={{
          width: "100%",
          height: "40vh",
          marginTop: "4rem",
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={banners[bannerIndex]}
            src={banners[bannerIndex]}
            alt="about us banner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", 
            }}
          />
        </AnimatePresence>
      </div>

      {/* FAQ Section */}
      <div
        style={{
          marginTop: "4rem",
          backgroundColor: "",
          borderRadius: "1rem",
          padding: "2rem",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is PreHire?</AccordionTrigger>
            <AccordionContent>
              PreHire is an AI-powered interview simulator where you can practice, refine, and nail your interviews — all before the real one. It helps boost your confidence by simulating real-world interview scenarios with intelligent feedback.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is PreHire free to use?</AccordionTrigger>
            <AccordionContent>
               Yes, PreHire is free to use for now. In the future, we plan to introduce new features that may come under paid plans to enhance your interview preparation experience even further.

            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What technologies does PreHire use?</AccordionTrigger>
            <AccordionContent>
             PreHire uses the latest Gemini API for AI-powered interview simulations, real-time feedback, and answer analysis.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How can I prepare better using PreHire?</AccordionTrigger>
            <AccordionContent>
              Use PreHire to practice frequently asked interview questions, analyze your responses, and get AI-powered feedback to improve confidence and clarity.
            </AccordionContent>
          </AccordionItem>
          
        </Accordion>
      </div>
    </div>
  );
}
