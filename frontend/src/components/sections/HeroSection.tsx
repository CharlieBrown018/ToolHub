import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, GithubLogo } from '@phosphor-icons/react';
import { GlassButton } from '../ui/glass-button';
import IntegrationHub3D from '../animations/IntegrationHub3D';
import { useState, useEffect } from 'react';

const headlines = [
  { text: 'Utility', color: 'bg-accent-green shadow-[0_0_40px_rgba(34,197,94,0.3)]' },
  { text: 'Productivity', color: 'bg-accent-purple shadow-[0_0_40px_rgba(168,85,247,0.3)]' },
  { text: 'Privacy', color: 'bg-accent-indigo shadow-[0_0_40px_rgba(99,102,241,0.3)]' },
  { text: 'ToolHub', color: 'bg-accent-blue shadow-[0_0_40px_rgba(59,130,246,0.3)]' },
];

export default function HeroSection() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let i = 0;
    const fullText = headlineIndex === 3 ? 'Hub' : headlines[headlineIndex].text;
    setDisplayText('');
    
    const typewriter = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typewriter);
      }
    }, 100);
    
    return () => clearInterval(typewriter);
  }, [headlineIndex]);

  return (
    <section className="relative flex flex-col items-center justify-center pt-12 pb-24 lg:pt-20 lg:pb-40 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-5 text-left space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                Where <br />
                <div className="relative inline-flex items-center align-bottom py-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={headlineIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="inline-flex items-center"
                      style={{ willChange: "transform, opacity" }}
                    >
                      {headlineIndex === 3 && (
                        <motion.span 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.4 }}
                          className="mr-4 text-white"
                        >
                          Tool
                        </motion.span>
                      )}
                      <span className={`inline-flex items-center px-6 py-1 rounded-2xl text-white ${headlines[headlineIndex].color} whitespace-nowrap min-w-[2ch] leading-none`}>
                        {displayText}
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-1 h-[0.7em] bg-white/60 ml-2 align-middle rounded-full"
                        />
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <br /> happens.
              </h1>

              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium max-w-xl">
                High-performance, open-source workspace built for everyone. 
                No daily limits, no paywalls, just pure utility delivered through 
                a refined glass interface.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <GlassButton asChild size="lg" variant="blue" className="h-14 px-10 text-base group rounded-2xl shadow-xl shadow-accent-blue/10 border-accent-blue/40">
                <Link to="/hub">
                  Start Creating
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" weight="bold" />
                </Link>
              </GlassButton>
              <GlassButton asChild size="lg" variant="outline" className="h-14 px-10 text-base rounded-2xl border-glass-border-strong bg-white/5 hover:bg-glass-white-md">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  View Code
                  <GithubLogo className="ml-3 h-5 w-5" weight="bold" />
                </a>
              </GlassButton>
            </div>
            
            <div className="flex items-center gap-10 pt-8 max-w-lg">
              <div className="space-y-1">
                <div className="text-2xl font-black text-white leading-none">100%</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Open Source</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-white leading-none">Local</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Privacy First</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-white leading-none">Free</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">No Accounts</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Workbench */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[600px] lg:min-h-[750px] w-full">
            <div className="absolute inset-0 bg-accent-blue/5 rounded-full blur-[160px] pointer-events-none" />
            <div className="relative w-full h-full max-w-[800px]" style={{ marginLeft: '-100px' }}>
              <IntegrationHub3D />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
