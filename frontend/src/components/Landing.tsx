import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HandHeart, 
  Code, 
  ArrowRight, 
  ShieldCheck, 
  Files,
  GithubLogo,
  Heart,
  Coffee,
  Lightbulb,
  ArrowCircleRight
} from '@phosphor-icons/react';
import { GlassButton } from './ui/glass-button';
import { GlassCard } from './ui/glass-card';
import { PageTransition } from './animations/PageTransition';
import LandingScene from './animations/LandingScene';
import IntegrationHub3D from './animations/IntegrationHub3D';
import { useRef, useState, useEffect } from 'react';

export default function Landing() {
  const containerRef = useRef(null);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = ['Utility', 'Productivity', 'Privacy', 'ToolHub'];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 4000); // Slower interval for calmer feel
    return () => clearInterval(timer);
  }, []);

  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const featureCards = [
    {
      icon: Files,
      title: 'Zero Friction',
      description: 'Convert and validate files in seconds without roadblocks.',
      color: 'blue',
      tag: 'FAST'
    },
    {
      icon: ShieldCheck,
      title: 'Local Privacy',
      description: 'Most operations run entirely in your browser—locally.',
      color: 'purple',
      tag: 'SECURE'
    },
    {
      icon: Code,
      title: 'Open Canvas',
      description: 'Fully open source. No hidden trackers, just utility.',
      color: 'green',
      tag: 'FREE'
    }
  ];

  // Logic from Hub.tsx for consistent coloring - EXACT MATCH
  const getGradientClasses = (color: string) => {
    const gradients: Record<string, string> = {
      blue: 'bg-gradient-to-br from-accent-blue/20 via-accent-blue/10 to-transparent',
      green: 'bg-gradient-to-br from-accent-green/20 via-accent-green/10 to-transparent',
      purple: 'bg-gradient-to-br from-accent-purple/20 via-accent-purple/10 to-transparent',
      orange: 'bg-gradient-to-br from-accent-orange/20 via-accent-orange/10 to-transparent',
      pink: 'bg-gradient-to-br from-accent-pink/20 via-accent-pink/10 to-transparent',
      indigo: 'bg-gradient-to-br from-accent-indigo/20 via-accent-indigo/10 to-transparent',
      cyan: 'bg-gradient-to-br from-accent-cyan/20 via-accent-cyan/10 to-transparent',
      amber: 'bg-gradient-to-br from-accent-amber/20 via-accent-amber/10 to-transparent',
      red: 'bg-gradient-to-br from-accent-red/20 via-accent-red/10 to-transparent',
      teal: 'bg-gradient-to-br from-accent-teal/20 via-accent-teal/10 to-transparent',
    };
    return gradients[color] || gradients.blue;
  };

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
        {/* 3D Interactive Background */}
        <LandingScene />

        {/* Section 1: Hero */}
        <section className="relative flex flex-col items-center justify-center pt-12 pb-24 lg:pt-20 lg:pb-40 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">
              
              <div className="lg:col-span-5 text-left space-y-10">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                    Where <br />
                    <span className="relative inline-block overflow-hidden align-bottom">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={headlineIndex}
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: "0%", opacity: 1 }}
                          exit={{ y: "-100%", opacity: 0 }}
                          transition={{ 
                            duration: 1.2, 
                            ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for smoother "calm" motion
                          }}
                          className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink uppercase"
                          style={{ willChange: "transform, opacity" }}
                        >
                          {headlines[headlineIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
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
                
                <div className="flex items-center gap-10 pt-8 border-t border-glass-border/20 max-w-lg">
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-white leading-none">100%</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Open Source</div>
                  </div>
                  <div className="h-10 w-px bg-glass-border/20" />
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-white leading-none">Local</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Privacy First</div>
                  </div>
                  <div className="h-10 w-px bg-glass-border/20" />
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-white leading-none">Free</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">No Accounts</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Workbench (Span 7) */}
              <div className="lg:col-span-7 flex items-center justify-end relative min-h-[600px] lg:min-h-[750px] w-full">
                <div className="absolute inset-0 bg-accent-blue/5 rounded-full blur-[160px] pointer-events-none" />
                <div className="relative w-full h-full max-w-[800px]">
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
                    { icon: Heart, title: 'Utility for Everyone', text: 'Whether you are a student, a designer, or just someone trying to fix a file—ToolHub is designed to be simple enough for anyone to use.' },
                    { icon: ShieldCheck, title: 'Your Data, Your Privacy', text: 'Because your files stay in your browser, you never have to worry about where your data is being sent or stored.' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex gap-6 lg:gap-8 text-left group"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 * i, duration: 0.6 }}
                    >
                      <div className={`flex-shrink-0 h-12 lg:h-14 w-12 lg:w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        <item.icon className="h-6 lg:h-7 w-6 lg:h-7 text-white" weight="duotone" />
                      </div>
                      <div>
                        <h4 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">{item.title}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Part: Feature Grid (Moved and Redesigned) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featureCards.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <GlassCard 
                      className={`p-8 h-full flex flex-col gap-6 relative overflow-hidden group border-accent-${feature.color}/20 hover:${getBorderClasses(feature.color)} transition-all duration-500 perspective-1000 transform-gpu hover:rotate-x-2 hover:rotate-y-[-2deg] hover:-translate-y-2`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 ${getGradientClasses(feature.color)} opacity-5 blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity`} />
                      
                      <div className="flex items-start justify-between">
                        <div className={`h-14 w-14 rounded-2xl ${getIconBgClasses(feature.color)} flex items-center justify-center shadow-lg border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                          <feature.icon className="h-7 w-7" weight="duotone" />
                        </div>
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full bg-accent-${feature.color}/10 text-accent-${feature.color} border border-accent-${feature.color}/20 uppercase tracking-tighter`}>
                          {feature.tag}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xl font-black text-white group-hover:text-accent-blue transition-colors">{feature.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                          {feature.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-4">
                        <div className={`h-1 w-12 rounded-full bg-accent-${feature.color}/30 group-hover:w-full transition-all duration-700`} />
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Community & Support */}
        <section className="py-24 lg:py-40 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative inline-block mb-10 lg:mb-12">
                <Heart className="h-16 lg:h-20 w-16 lg:w-20 text-accent-pink animate-pulse" weight="duotone" />
                <div className="absolute -inset-10 lg:-inset-12 bg-accent-pink/10 rounded-full blur-[50px] lg:blur-[60px] -z-10" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 lg:mb-8">Fuel the Evolution.</h2>
              <p className="text-lg text-gray-400 mb-12 lg:mb-16 max-w-xl mx-auto font-medium leading-relaxed">
                ToolHub is a passion project built on the dream of a free web. If you find these tools useful, there are many ways to support the mission.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16 lg:mb-20 text-left">
                {[
                  { icon: Coffee, title: 'Buy a Coffee', text: 'Help keep the servers running and the code flowing.', color: 'amber', action: 'Support' },
                  { icon: Lightbulb, title: 'Share Ideas', text: "Have a tool in mind? We'd love to hear your suggestions.", color: 'blue', action: 'Contact' },
                  { icon: GithubLogo, title: 'Contribute', text: 'Join the build. Open a PR or report a bug on GitHub.', color: 'purple', action: 'GitHub' }
                ].map((item, idx) => (
                  <GlassCard 
                    key={idx} 
                    hover={true}
                    perspective={true}
                    className={`p-8 flex flex-col items-center gap-5 text-center group border-white/5 hover:${getBorderClasses(item.color)}`}
                  >
                    <div className={`h-14 w-14 rounded-2xl ${getIconBgClasses(item.color)} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner border border-white/10`}>
                      <item.icon className="h-7 w-7" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{item.text}</p>
                    </div>
                    <GlassButton size="sm" variant="outline" className={`mt-2 w-full border-accent-${item.color}/20 hover:bg-accent-${item.color}/10 text-accent-${item.color} rounded-xl`}>{item.action}</GlassButton>
                  </GlassCard>
                ))}
              </div>

              <GlassButton asChild variant="blue" size="lg" className="h-20 lg:h-24 px-12 lg:px-16 text-xl lg:text-2xl font-black rounded-[2rem] shadow-2xl shadow-accent-blue/20 hover:shadow-accent-blue/30 transition-all group">
                <Link to="/hub">
                  Enter the Hub
                  <ArrowCircleRight className="ml-4 h-8 w-8 group-hover:translate-x-2 transition-transform" weight="fill" />
                </Link>
              </GlassButton>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
