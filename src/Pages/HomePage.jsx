import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LOGO1 from "../assets/Images/Logos/logo1.png";
import LOGO2 from "../assets/Images/Logos/logo2.png"
import LOGO3 from "../assets/Images/Logos/logo3.png"
import LOGO4 from "../assets/Images/Logos/logo4.png"
import LOGO5 from "../assets/Images/Logos/logo5.png"
import LOGO6 from "../assets/Images/Logos/logo6.png"
import LOGO7 from "../assets/Images/Logos/logo7.png"
import LOGO8 from "../assets/Images/Logos/logo8.png"
import LOGO9 from "../assets/Images/Logos/logo9.png"
import LOGO10 from "../assets/Images/Logos/logo10.png"

import { cn } from "@/lib/utils";
import Marquee  from "react-fast-marquee";
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
    <div className="w-full bg-gradient-to-b from-black to-gray-950 ">
      <div className="w-full max-w-screen min-h-screen  bg-gradient-to-b from-black to-gray-950 flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mb-10"
        >
          <BotMessageSquare className="h-[290px] w-[290px] text-purple-400/90 hover:text-purple-500 transition-colors -mt-3 " />
        </motion.div>

        {/* Animated words */}
        <div className="flex items-baseline gap-3">
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
                "text-6xl md:text-7xl font-bold",
                i === 0 && "text-gray-300",
                i === 1 && "text-gray-400",
                i === 2 && "text-gray-500"
              )}
            >
              {word}
              {i < words.length - 1 && (
                <span className="text-gray-300 mx-2">.</span>
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
            className="mt-12 flex gap-6"
          >
            <button
              onClick={() => navigate("/interview")}
              className="px-7 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105"
            >
              Mock Interview
            </button>
            <button
              onClick={() => navigate("/Apply")}
              className="px-7 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105"
            >
              Apply Now
            </button>
          </motion.div>
        </div>
      </div>
      <div>


<div>
<Marquee pauseOnHover gradient={false} speed={80}>
  {[LOGO8, LOGO2, LOGO10, LOGO4, LOGO7, LOGO6, LOGO3, LOGO1, LOGO5].map((logo, index) => (
    <img
      key={index}
      src={logo}
      alt={`Logo ${index + 1}`}
      className="my-5 h-40 w-auto mx-10  hover:grayscale-0 transition duration-300 ease-in-out"
    />
  ))}
</Marquee>

</div>
        
{/* Auto Sliding Images */}
<div className="relative flex justify-center items-center">
  <img
    src={Home_banner3}
    alt="Banner"
    className="my-20 object-cover w-320 h-140 rounded-2xl shadow-2xl"
  />

  {/* Floating Transparent Box */}
  <div className="absolute bottom-3 right-23 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-xs">
    <h2 className="text-2xl font-bold text-gray-900">PreHire</h2>
    <span className="text-purple-500 font-medium">AI-powered interview simulator</span> where you can practice, refine, and{' '}
          <span className="text-sky-500 font-medium">nail your interview</span> before the real thing ....
    <button
     onClick={() => navigate("/About")}
     className="mt-3 px-3 py-1 bg-gray-950  text-white text-sm rounded-lg hover:bg-gray-800">
   Read More
    </button>
  </div>
</div>

      </div>
    </div>
  );
}
