import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Linkedin, Code2, Briefcase, Rocket, Github, ArrowRight, Sparkles ,MousePointer2,Send} from "lucide-react";
import { useNavigate } from "react-router";
 
const Apply = () => {
   const navigate = useNavigate();
  const platforms = [
    {
      name: "LinkedIn Jobs",
      Icon: Linkedin,
      desc: "Connect with industry leaders and showcase your professional journey",
      color: "#0A66C2",
      link: "https://www.linkedin.com/jobs/",
      stats: "750M+ members"
    },
   
   
    {
      name: "WellFound",
      Icon: Rocket,
      desc: "Accelerate your career in fast-growing tech startups",
      color: "#f59e0b",
      link: "https://wellfound.com",
      stats: "30K+ hiring companies"
    }, 
      {
     name: "GitHub Jobs",
  Icon: Github,
  desc: "Find technical roles that value your code contributions and skills",
  color: "#ffffff", // <-- set to white or light grey
  link: "https://www.github.careers/careers-home",
  stats: "2M+ developers"
    },
      {
      name: "InternShala",
      Icon: Send,
      desc: "Discover cutting-edge startups and innovative tech opportunities",
      color: "#6366f1",
      link: "https://internshala.com/",
      stats: "100K+ startups"
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0614] relative overflow-hidden isolate">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[800px] h-[800px] -top-48 -left-48 bg-violet-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute w-[600px] h-[600px] -bottom-32 -right-32 bg-indigo-800/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIHg9IjAiIHk9IjAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDEiIC8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPjwvc3ZnPg==')]" 
          opacity="0.15" 
        />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-16">
        {/* Header section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20 space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-purple-500 leading-tight">
             Practice <span className="text-violet-300">to</span> Placement
          </h1>
          <p className="text-xl text-violet-200 max-w-2xl mx-auto">
            Done with the mock interviews?..  Now explore these  platforms to land your dream role.
          </p>
        </motion.header>

        {/* Platforms grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-16 max-w-5xl mx-auto"
        >
          {platforms.map((platform, index) => (
            <motion.div 
              key={platform.name}
              variants={item}
              className="group relative"
            >
              {/* Floating platform card */}
              <div className={`
                relative bg-gradient-to-br from-[#1a1425] to-[#130e1d] p-1 rounded-3xl
                shadow-2xl transition-all duration-500 overflow-hidden
                ${index % 2 ? 'hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.4)]' : 'hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.4)]'}
                hover:-translate-y-2
              `}>
                {/* Animated border gradient */}
                <div className={`
                  absolute inset-0 rounded-3xl bg-gradient-to-r 
                  ${index % 2 ? 'from-violet-600/30 to-purple-500/30' : 'from-purple-600/30 to-indigo-500/30'}
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                `} />

                {/* Subtle shine effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute -inset-y-full -left-20 w-40 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1.5s_ease-in-out]"></div>
                </div>

                <div className={`flex flex-col ${index % 2 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 p-8 bg-[#130e1d]/80 rounded-3xl backdrop-blur-xl`}>
                  {/* Icon container */}
                  <div 
                    className="w-32 h-32 rounded-2xl flex items-center justify-center p-6 shrink-0 relative"
                    style={{ 
                      background: `linear-gradient(45deg, ${platform.color}30, ${platform.color}10)`,
                      border: `1px solid ${platform.color}20`
                    }}
                  >
                    <platform.Icon 
                      className="w-full h-full" 
                      style={{ 
                        filter: `drop-shadow(0 0 12px ${platform.color}40)`,
                        color: platform.color 
                      }} 
                    />
                    <div className="absolute -inset-4 rounded-2xl border border-white/5 pointer-events-none"></div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 px-4 space-y-4 ${index % 2 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`flex ${index % 2 ? 'justify-end' : 'justify-start'} items-center gap-3 mb-2`}>
                      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-purple-400">
                        {platform.name}
                      </h2>
                      <span className="text-xs font-medium px-2 py-1 rounded bg-violet-900/50 text-violet-200">
                        {platform.stats}
                      </span>
                    </div>
                    <p className={`text-lg text-violet-200/90 leading-relaxed ${index % 2 ? 'md:text-right' : 'md:text-left'}`}>
                      {platform.desc}
                    </p>
                    <div className={`flex ${index % 2 ? 'justify-end' : 'justify-start'}`}>
                      <Button
                        asChild
                        className="group h-[48px] px-8 text-lg bg-violet-600/30 backdrop-blur-sm hover:bg-violet-500/40 border border-violet-500/30 hover:border-violet-400/50 transition-all relative overflow-hidden"
                      >
                        <a href={platform.link} target="_blank" rel="noopener noreferrer">
                          <span className="relative z-10 flex items-center">
                            Explore Platform
                            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:text-purple-300" />
                          </span>
                          {/* Button hover effect */}
                          <span className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector line */}
              {index < platforms.length - 1 && (
                <div className="absolute -bottom-24 left-1/2 w-1 h-20 bg-gradient-to-b from-violet-600/30 to-transparent hidden md:block">
                  <div className="absolute inset-0 bg-white/5 rounded-full"></div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-violet-300 mb-6 text-lg">Need help preparing for these opportunities?</p>
         <Button 
  className="h-[52px] px-8 text-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 border border-violet-500/50 hover:border-violet-400/70 rounded-full font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all"
  onClick={() => navigate('/interviews')}
>
  Schedule Another Mock Interview
  <Rocket className="ml-3 h-5 w-5" />
</Button>
        </motion.div>
      </main>

      {/* Custom styles for shine animation */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(15deg); }
          100% { transform: translateX(200%) rotate(15deg); }
        }
      `}</style>
    </div>
  );
};

export default Apply;