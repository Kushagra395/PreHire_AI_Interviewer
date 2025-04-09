import { motion } from "framer-motion";
import { Atom, Sparkles } from "lucide-react";

export default function LoaderPage({ message = "Loading" }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center gap-8 p-4">
      {/* Floating Atom Animation */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative"
      >
        <Atom className="h-20 w-20 text-purple-500/80" strokeWidth={1.2} />
        
        {/* Orbiting electrons */}
        
      </motion.div>

      {/* Glowing Text */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="text-center space-y-4"
      >
        <Sparkles className="mx-auto h-6 w-6 text-amber-400" />
        <h3 className="text-xl font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {message}
        </h3>
        
        {/* Pulsing Progress Dots */}
        <div className="flex justify-center gap-2">
          {[0.2, 0.4, 0.6].map((delay) => (
            <motion.span
              key={delay}
              className="h-2 w-2 rounded-full bg-cyan-400"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}