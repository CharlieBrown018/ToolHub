import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  RocketLaunch, 
  HandHeart, 
  Code, 
  Sparkle, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Files,
  ArrowCircleRight,
  Lightning,
  Cube,
  CursorClick
} from '@phosphor-icons/react';
import { GlassButton } from './ui/glass-button';
import { GlassCard, GlassCardContent } from './ui/glass-card';
import { PageTransition } from './animations/PageTransition';
import LandingScene from './animations/LandingScene';
import { useRef } from 'react';

export default function Landing() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const featureCards = [
    {
      icon: Files,
      title: 'Zero Friction',
      description: 'Convert, compress, and validate files in seconds without account wall roadblocks.',
      color: 'blue',
      delay: 0.4
    },
    {
      icon: ShieldCheck,
      title: 'Local Privacy',
      description: 'Your data is precious. Most operations run entirely in your browser—never hitting a server.',
      color: 'purple',
      delay: 0.5
    },
    {
      icon: Code,
      title: 'Open Canvas',
      description: 'Fully open source and community driven. No hidden trackers, just pure utility.',
      color: 'green',
      delay: 0.6
    }
  ];

  return (
    <PageTransition>
      <div ref={containerRef} className="relative min-h-screen">
        {/* 3D Interactive Background */}
        <LandingScene />

        {/* Hero Section - Asymmetric Layout */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left Side: Content */}
              <motion.div 
                className="flex-1 text-left"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ opacity, scale, y }}
              >
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 mb-8 backdrop-blur-md">
                  <Sparkle className="text-accent-blue" weight="fill" />
                  <span className="text-[10px] font-black text-accent-blue uppercase tracking-[0.2em]">The Evolution of Utility</span>
                </motion.div>

                <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
                  TOOLS <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink">UNLEASHED.</span>
                </motion.h1>

                <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-xl font-medium">
                  We're tired of "daily limits" and paywalls for simple tasks. ToolHub is a high-performance, open-source workspace built to keep you creative and unblocked.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
                  <GlassButton asChild size="lg" variant="blue" className="h-16 px-10 text-lg group rounded-2xl">
                    <Link to="/hub">
                      Start Creating
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" weight="bold" />
                    </Link>
                  </GlassButton>
                  <GlassButton asChild size="lg" variant="outline" className="h-16 px-10 text-lg rounded-2xl">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      View Code
                      <Code className="ml-3 h-5 w-5" />
                    </a>
                  </GlassButton>
                </motion.div>
              </motion.div>

              {/* Right Side: Interactive Card Stack */}
              <motion.div 
                className="flex-1 relative w-full max-w-lg lg:max-w-none h-[400px] lg:h-[500px]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Floating Decorative Glass Panels */}
                <motion.div 
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 right-0 w-64 h-80 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl -z-10"
                />
                
                <motion.div 
                  animate={{ 
                    y: [0, 20, 0],
                    rotate: [0, -3, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-10 left-10 w-72 h-48 rounded-[2rem] bg-gradient-to-bl from-accent-blue/20 to-transparent border border-accent-blue/30 backdrop-blur-xl shadow-2xl -z-10"
                />

                {/* Main Hero Card */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <GlassCard className="w-full max-w-sm border-white/20 bg-white/5 backdrop-blur-3xl shadow-[0_0_50px_rgba(96,165,250,0.15)] overflow-hidden" hover={true} animated={true}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 via-transparent to-accent-purple/10" />
                    <GlassCardContent className="p-10 relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-14 w-14 rounded-2xl bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center">
                          <Cube className="h-8 w-8 text-accent-blue" weight="duotone" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Universal Hub</h3>
                          <p className="text-xs text-accent-blue font-bold tracking-widest uppercase mt-0.5">Version 2.0 Ready</p>
                        </div>
                      </div>
                      <div className="space-y-4 mb-8">
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            transition={{ duration: 1.5, delay: 1 }}
                            className="h-full bg-accent-blue shadow-[0_0_10px_rgba(96,165,250,0.5)]" 
                          />
                        </div>
                        <div className="h-2 w-3/4 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "45%" }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                            className="h-full bg-accent-purple shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-gray-500 font-mono text-[10px]">
                        <span>SYSTEM STATUS: OPTIMAL</span>
                        <span className="text-accent-green">LIVE</span>
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Grid - More Sophisticated Layout */}
        <section className="py-32 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featureCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: card.delay, duration: 0.8 }}
                >
                  <GlassCard 
                    className={`border-accent-${card.color}/20 h-full group hover:bg-accent-${card.color}/5 transition-all duration-500 rounded-[2.5rem]`}
                    hover={true}
                  >
                    <GlassCardContent className="p-10">
                      <div className={`h-16 w-16 rounded-2xl bg-accent-${card.color}/10 border border-accent-${card.color}/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                        <card.icon className={`h-8 w-8 text-accent-${card.color}`} weight="duotone" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-blue transition-colors">{card.title}</h3>
                      <p className="text-gray-400 leading-relaxed font-medium">
                        {card.description}
                      </p>
                    </GlassCardContent>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section - Full Width Immersive */}
        <section className="py-48 relative overflow-hidden bg-white/[0.01] border-y border-glass-border">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(96,165,250,0.05),transparent)] pointer-events-none" />
          
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="relative">
                  <div className="absolute -inset-10 bg-accent-blue/10 rounded-full blur-[100px] animate-pulse" />
                  <div className="relative p-8 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">
                    <HandHeart className="h-32 w-32 text-accent-blue opacity-20 absolute -right-4 -bottom-4 rotate-12" weight="duotone" />
                    <h2 className="text-4xl font-black text-white mb-8">Built for the <br /><span className="text-accent-blue">Freedom of Flow.</span></h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8 font-medium">
                      ToolHub isn't just a website; it's a statement. We believe the internet's most useful tools should be free, open-source, and accessible to everyone, from students to senior engineers.
                    </p>
                    <div className="flex gap-4">
                      <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400">NO REGISTRATION</div>
                      <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400">NO COOKIE TRACKING</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="flex-1 space-y-12">
                {[
                  { icon: Lightning, title: 'Speed of Thought', text: 'Optimized for instant load times and keyboard-first navigation with global shortcuts.' },
                  { icon: CursorClick, title: 'One-Click Utility', text: 'No complex configurations. Drag, drop, and get your results in milliseconds.' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex gap-6"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * i, duration: 0.8 }}
                  >
                    <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <item.icon className="h-7 w-7 text-white" weight="duotone" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed font-medium">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="py-48 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="relative inline-block mb-12">
                <RocketLaunch className="h-24 w-24 text-accent-blue animate-bounce" weight="duotone" />
                <div className="absolute -inset-10 bg-accent-blue/20 rounded-full blur-[60px] -z-10" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8">Ready to evolve?</h2>
              <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
                Step into the Hub and experience utility without compromise. 100% Free. 100% Open.
              </p>
              <GlassButton asChild variant="blue" size="lg" className="h-24 px-16 text-2xl font-black rounded-[2rem] shadow-[0_20px_50px_rgba(96,165,250,0.3)] hover:shadow-[0_30px_60px_rgba(96,165,250,0.4)] transition-all group">
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


