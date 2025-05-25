import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LOGO1 from "../assets/Images/Logos/logo1.png";
import LOGO2 from "../assets/Images/Logos/logo2.png";
import LOGO3 from "../assets/Images/Logos/logo3.png";
import LOGO4 from "../assets/Images/Logos/logo4.png";
import LOGO5 from "../assets/Images/Logos/logo5.png";
import LOGO6 from "../assets/Images/Logos/logo6.png";
import LOGO7 from "../assets/Images/Logos/logo7.png";
import LOGO8 from "../assets/Images/Logos/logo8.png";
import LOGO9 from "../assets/Images/Logos/logo9.png";
import LOGO10 from "../assets/Images/Logos/logo10.png";
import LOGO11 from "../assets/Images/Logos/logo11.png";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";
import { BotMessageSquare } from "lucide-react";
import { useNavigate } from "react-router";
import Home_banner3 from "@/assets/Images/Home_banner3.png";

export default function Home() {
  const navigate = useNavigate();
  const [visibleWords, setVisibleWords] = useState([]);
  const words = ["Practice", "Prepare", "Placed"];

  useEffect(() => {
    const timers = words.map((_, i) => {
      return setTimeout(() => {
        setVisibleWords((prev) => [...prev, words[i]]);
      }, 1000 * (i + 1));
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <div className=" my-0 w-full bg-gradient-to-b bg-gray-950">
      <div className="w-full max-w-screen min-h-screen bg-gradient-to-b from-black to-gray-950 flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mb-6 md:mb-10"
        >
          <BotMessageSquare className="h-[150px] w-[150px] md:h-[290px] md:w-[290px] text-purple-400/90 hover:text-purple-500 transition-colors -mt-3" />
        </motion.div>

        {/* Animated words */}
        <div className="flex flex-wrap justify-center items-baseline gap-1 md:gap-3">
          {words.map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: visibleWords.includes(word) ? 1 : 0,
                y: visibleWords.includes(word) ? 0 : 20,
              }}
              transition={{ duration: 0.1, delay: 0 }}
              className={cn(
                "text-4xl md:text-6xl lg:text-7xl font-bold",
                i === 0 && "text-gray-300",
                i === 1 && "text-gray-400",
                i === 2 && "text-gray-500"
              )}
            >
              {word}
              {i < words.length - 1 && (
                <span className="text-gray-300 mx-1 md:mx-2">.</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.7, type: "spring" }}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-6"
          >
            <button
              onClick={() => navigate("/interviews")}
              className="px-7 py-4 md:px-7 md:py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105"
            >
              Mock Interview
            </button>
            <button
              onClick={() => navigate("/Apply")}
              className="px-5 py-3 md:px-7 md:py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105"
            >
              Apply Now
            </button>
          </motion.div>
        </div>
      </div>
      <div>
        <div className="py-4 md:py-8">
          <Marquee pauseOnHover gradient={false} speed={80}>
            {[LOGO8, LOGO2, LOGO10, LOGO4, LOGO7,LOGO11, LOGO6, LOGO3, LOGO1, LOGO5, LOGO9].map(
              (logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  className="h-20 md:h-32 w-auto mx-6 md:mx-12 hover:grayscale-0 transition duration-300"
                />
              )
            )}
          </Marquee>
        </div>
 
        {/* Banner Section */}
        <div className=" flex px-4 bg-gray-950">
          <div className="relative max-w-7xl mx-auto">
            {/* Banner Image */}
            <img
              src={Home_banner3}
              alt="Banner"
              className="my-10 md:my-20 w-full h-auto rounded-2xl shadow-xl md:shadow-2xl"
            />

            {/* Floating Box - Desktop */}
            <div className="hidden md:block absolute bottom-25 right-6 bg-white/70 backdrop-blur-md p-4  rounded-xl shadow-lg max-w-xs">
              <h2 className="text-2xl font-bold text-gray-900">PreHire</h2>
              <p className="text-m text-gray-800">
                <span className="text-purple-500 font-medium">AI-powered interview simulator</span> where you can practice, refine, and{' '}
                <span className="text-sky-500 font-medium">nail your interview</span> before the real thing ....
              </p>
              <button
                onClick={() => navigate("/About")}
                className="mt-3 px-3 py-1 bg-gray-950 text-white text-sm rounded-lg hover:bg-gray-800"
              >
                Read More
              </button>
            </div>

            {/* Floating Box - Mobile (appears below banner) */}
            <div className="md:hidden w-full bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-lg mt-4">
              <h2 className="text-xl font-bold text-gray-900">PreHire</h2>
              <p className="text-sm text-gray-800">
                <span className="text-purple-500 font-medium">AI-powered interview simulator</span> where you can practice, refine, and{' '}
                <span className="text-sky-500 font-medium">nail your interview</span> before the real thing ....
              </p>
              <button
                onClick={() => navigate("/About")}
                className="mt-3 px-3 py-1 bg-gray-950 text-white text-sm rounded-lg hover:bg-gray-800"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}