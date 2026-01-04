import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HandHeart, 
  Code, 
  ArrowRight, 
  ShieldCheck, 
  GithubLogo,
  Globe,
  Coffee,
  Lightbulb,
  ArrowCircleRight
} from '@phosphor-icons/react';
import { GlassButton } from './ui/glass-button';
import { GlassCard } from './ui/glass-card';
import { PageTransition } from './animations/PageTransition';
import IntegrationHub3D from './animations/IntegrationHub3D';
import RotatingGlobe from './animations/RotatingGlobe';
import { useRef, useState, useEffect } from 'react';

export default function Landing() {
  const containerRef = useRef(null);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  
  const headlines = [
    { text: 'Utility', color: 'bg-accent-green shadow-[0_0_40px_rgba(34,197,94,0.3)]' },
    { text: 'Productivity', color: 'bg-accent-purple shadow-[0_0_40px_rgba(168,85,247,0.3)]' },
    { text: 'Privacy', color: 'bg-accent-indigo shadow-[0_0_40px_rgba(99,102,241,0.3)]' },
    { text: 'ToolHub', color: 'bg-accent-blue shadow-[0_0_40px_rgba(59,130,246,0.3)]' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [headlines.length]);

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

  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Logic from Hub.tsx for consistent coloring - EXACT MATCH
  const getBorderClasses = (color: string) => {
    const borders: Record<string, string> = {
      blue: 'border-accent-blue/40',
      green: 'border-accent-green/40',
      purple: 'border-accent-purple/40',
      orange: 'border-accent-orange/40',
      pink: 'border-accent-pink/40',
      indigo: 'border-accent-indigo/40',
      cyan: 'border-accent-cyan/40',
      amber: 'border-accent-amber/40',
      red: 'border-accent-red/40',
      teal: 'border-accent-teal/40',
    };
    return borders[color] || borders.blue;
  };

  const getIconBgClasses = (color: string) => {
    const bgs: Record<string, string> = {
      blue: 'bg-accent-blue/20 text-accent-blue',
      green: 'bg-accent-green/20 text-accent-green',
      purple: 'bg-accent-purple/20 text-accent-purple',
      orange: 'bg-accent-orange/20 text-accent-orange',
      pink: 'bg-accent-pink/20 text-accent-pink',
      indigo: 'bg-accent-indigo/20 text-accent-indigo',
      cyan: 'bg-accent-cyan/20 text-accent-cyan',
      amber: 'bg-accent-amber/20 text-accent-amber',
      red: 'bg-accent-red/20 text-accent-red',
      teal: 'bg-accent-teal/20 text-accent-teal',
    };
    return bgs[color] || bgs.blue;
  };

  return (
    <PageTransition>
      <div ref={containerRef} className="relative min-h-screen">

        {/* Section 1: Hero */}
        <section className="relative flex flex-col items-center justify-center pt-12 pb-24 lg:pt-20 lg:pb-40 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">
              
              <div className="lg:col-span-5 text-left space-y-10">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                    Where <br />
                    <div className="relative inline-flex items-center align-bottom py-2">
                        {headlineIndex === 3 && (
                          <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mr-4 text-white"
                          >
                            Tool
                          </motion.span>
                        )}
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={headlineIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className={`inline-flex items-center px-6 py-1 rounded-2xl text-white ${headlines[headlineIndex].color} whitespace-nowrap min-w-[2ch] leading-none`}
                            style={{ willChange: "transform, opacity" }}
                          >
                            {displayText}
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                              className="inline-block w-1 h-[0.7em] bg-white/60 ml-2 align-middle rounded-full"
                            />
                          </motion.span>
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

              {/* Right Column: Visual Workbench (Span 7) */}
              <div className="lg:col-span-7 flex items-center justify-center relative min-h-[600px] lg:min-h-[750px] w-full">
                <div className="absolute inset-0 bg-accent-blue/5 rounded-full blur-[160px] pointer-events-none" />
                <div className="relative w-full h-full max-w-[800px]" style={{ marginLeft: '-100px' }}>
                  <IntegrationHub3D />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why we built this & Features */}
        <section className="py-24 lg:py-40 relative overflow-hidden border-y border-white/[0.02] bg-white/[0.01]">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(96,165,250,0.03),transparent)] pointer-events-none" />
          
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-24">
              {/* Top Part: The Story */}
              <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 text-center lg:text-left">
                <motion.div 
                  className="flex-1"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-12 bg-accent-blue/5 rounded-full blur-[100px]" />
                    <GlassCard hover={false} className="p-10 lg:p-12 relative text-left bg-white/[0.04]">
                      <HandHeart className="h-20 lg:h-24 w-20 lg:w-24 text-accent-blue opacity-10 absolute -right-2 -bottom-2 rotate-12" weight="duotone" />
                      <h2 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight">Frustrated by the Web? <br /><span className="text-accent-blue">We were too.</span></h2>
                      <p className="text-gray-400 text-base leading-relaxed mb-10 font-medium">
                        Finding a simple tool online shouldn't feel like a battle. We got tired of being blocked by "3 free uses left," mandatory sign-ups, and screens buried in ads. 
                        <br /><br />
                        ToolHub was created to be your personal utility belt—a single, clean place where tools work for you, not the other way around. 
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-wider">NO PAYWALLS</div>
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-wider">NO ACCOUNT NEEDED</div>
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-wider">LOCAL POWER</div>
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>

                <div className="flex-1 space-y-10">
                  {[
                    { icon: Globe, title: 'Utility for Everyone', text: 'Whether you are a student, a designer, or just someone trying to fix a file—ToolHub is designed to be simple enough for anyone to use.', color: 'teal' },
                    { icon: ShieldCheck, title: 'Your Data, Your Privacy', text: 'Because your files stay in your browser, you never have to worry about where your data is being sent or stored.', color: 'purple' },
                    { icon: Code, title: 'Open Canvas', text: 'Fully open source. No hidden trackers, no paywalls, just pure utility for your workflow.', color: 'blue' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex gap-6 lg:gap-8 text-left group"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 * i, duration: 0.6 }}
                    >
                      <div className={`flex-shrink-0 h-12 lg:h-14 w-12 lg:w-14 rounded-2xl ${getIconBgClasses(item.color)} border border-white/5 flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner`}>
                        <item.icon className="h-6 lg:h-7 w-6 lg:h-7" weight="duotone" />
                      </div>
                      <div>
                        <h4 className={`text-lg lg:text-xl font-bold text-white mb-2 transition-colors group-hover:text-accent-${item.color}`}>
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Community & Support */}
        <section className="py-24 lg:py-40 relative overflow-hidden">
          {/* Subtle Rotating Globe Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-full h-[90%] max-h-[1000px] opacity-10">
              <RotatingGlobe />
            </div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 lg:mb-8">Fuel the Evolution.</h2>
              <p className="text-lg text-gray-400 mb-12 lg:mb-16 max-w-xl mx-auto font-medium leading-relaxed">
                ToolHub is a passion project built on the dream of a free web. If you find these tools useful, there are many ways to support the mission.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto mb-20 lg:mb-32">
                {[
                  { icon: Coffee, title: 'Buy a Coffee', text: 'Help keep the servers running and the code flowing.', color: 'amber', link: '#' },
                  { icon: Lightbulb, title: 'Share Ideas', text: "Have a tool in mind? We'd love to hear your suggestions.", color: 'blue', link: '#' },
                  { icon: GithubLogo, title: 'Contribute', text: 'Join the build. Open a PR or report a bug on GitHub.', color: 'purple', link: 'https://github.com' }
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <GlassCard 
                      hover={true}
                      animated={true}
                      className={`h-full border-white/5 hover:${getBorderClasses(item.color)} transition-all duration-500`}
                    >
                      <div className="flex flex-col items-center p-10 text-center h-full w-full">
                        <div className={`h-16 w-16 rounded-2xl ${getIconBgClasses(item.color)} flex items-center justify-center mb-8 shadow-lg border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mx-auto`}>
                          <item.icon className="h-8 w-8" weight="duotone" />
                        </div>
                        
                        <div className="flex flex-col items-center space-y-4">
                          <h3 className="text-2xl font-black text-white">
                            {item.title}
                          </h3>
                          <p className="text-sm md:text-base text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors max-w-[280px] mx-auto">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.a>
                ))}
              </div>

              <div className="flex justify-center">
                <GlassButton asChild variant="blue" size="lg" className="h-16 px-12 text-xl font-black rounded-2xl shadow-xl shadow-accent-blue/10 hover:shadow-accent-blue/20 transition-all group">
                  <Link to="/hub" className="flex items-center">
                    Enter the Hub
                    <ArrowCircleRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" weight="fill" />
                  </Link>
                </GlassButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
