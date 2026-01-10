import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GithubLogo,
  Coffee,
  Lightbulb,
  ArrowCircleRight,
} from '@phosphor-icons/react';
import { GlassButton } from '../ui/glass-button';
import RotatingGlobe from '../animations/RotatingGlobe';

const supportItems = [
  { 
    icon: Coffee, 
    title: 'Buy a Coffee', 
    text: 'Help keep the servers running and the code flowing.', 
    color: 'amber', 
    link: '#' 
  },
  { 
    icon: Lightbulb, 
    title: 'Share Ideas', 
    text: "Have a tool in mind? We'd love to hear your suggestions.", 
    color: 'blue', 
    link: '#' 
  },
  { 
    icon: GithubLogo, 
    title: 'Contribute', 
    text: 'Join the build. Open a PR or report a bug on GitHub.', 
    color: 'purple', 
    link: 'https://github.com' 
  }
];

// Keycap-style Card Component
const KeycapCard = ({ 
  color, 
  children, 
  className = "", 
  href 
}: { 
  color: string; 
  children: React.ReactNode; 
  className?: string;
  href: string;
}) => {
  const colorStyles: Record<string, any> = {
    amber: {
      border: 'border-amber-600',
      text: 'text-amber-100',
      glow: 'group-hover:shadow-amber-500/50',
      gradient: 'from-amber-500 to-amber-600',
    },
    blue: {
      border: 'border-blue-700',
      text: 'text-blue-100',
      glow: 'group-hover:shadow-accent-blue/50',
      gradient: 'from-accent-blue to-blue-600',
    },
    purple: {
      border: 'border-purple-700',
      text: 'text-purple-100',
      glow: 'group-hover:shadow-accent-purple/50',
      gradient: 'from-accent-purple to-purple-600',
    },
  }[color] || { 
    border: 'border-gray-800', text: 'text-white', glow: '', gradient: 'from-gray-700 to-gray-800' 
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block group relative h-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      whileTap={{ y: 2 }}
    >
      {/* Keycap Body (Depth) */}
      <div className={`absolute inset-0 rounded-3xl translate-y-3 ${colorStyles.border} bg-gray-900/80`} />
      
      {/* Keycap Top Face */}
      <div className={`
        relative h-full rounded-3xl p-1
        bg-gradient-to-b ${colorStyles.gradient}
        border-t border-white/20 border-b-8 ${colorStyles.border}
        shadow-[0_10px_20px_-5px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.2)]
        transition-all duration-200
        group-hover:brightness-110 group-hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.3)]
        ${colorStyles.glow}
      `}>
        {/* Inner Surface (Slightly inset) */}
        <div className="h-full w-full rounded-[20px] bg-black/10 p-8 flex flex-col items-center text-center relative overflow-hidden backdrop-blur-[2px]">
          {/* Top highlight glare */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          
          {children}
        </div>
      </div>
    </motion.a>
  );
};

export default function CommunitySection() {
  return (
    <section className="py-24 lg:py-40 relative overflow-hidden">
      {/* Subtle Rotating Globe Backgrounds - Center, Left, Right */}
      {/* Center Globe */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-full h-[90%] max-h-[1000px] opacity-10">
          <RotatingGlobe />
        </div>
      </div>
      
      {/* Left Globe - partially cut off, white filled with dark lines */}
      <div className="absolute inset-y-0 -left-[32%] w-[80%] flex items-center justify-center pointer-events-none z-0">
        <div className="w-full h-[70%] max-h-[800px] opacity-10 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full aspect-square">
              <circle cx="50" cy="50" r="48" fill="white" fillOpacity="0.2" />
            </svg>
          </div>
          <div className="relative w-full h-full [&_svg]:!text-gray-900/50">
            <RotatingGlobe />
          </div>
        </div>
      </div>
      
      {/* Right Globe - partially cut off, white filled with dark lines */}
      <div className="absolute inset-y-0 -right-[32%] w-[80%] flex items-center justify-center pointer-events-none z-0">
        <div className="w-full h-[70%] max-h-[800px] opacity-10 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full aspect-square">
              <circle cx="50" cy="50" r="48" fill="white" fillOpacity="0.2" />
            </svg>
          </div>
          <div className="relative w-full h-full [&_svg]:!text-gray-900/50">
            <RotatingGlobe />
          </div>
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
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto mb-20 lg:mb-32">
            {supportItems.map((item, idx) => (
              <KeycapCard key={idx} color={item.color} href={item.link}>
                {/* Icon Container */}
                <div 
                  className={`h-20 w-20 rounded-2xl bg-black/20 shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 relative ${idx === 0 ? 'animate-idle-float' : idx === 1 ? 'animate-idle-breath' : 'animate-idle-tilt'}`}
                  style={{ animationDelay: `${idx * 0.5}s` }}
                >
                      <item.icon 
                        className={`h-10 w-10 text-white drop-shadow-lg ${
                          idx === 0 ? 'coffee-icon' : 
                          idx === 1 ? 'bulb-icon' : 
                          'git-icon'
                        }`} 
                        weight="fill" 
                      />
                  
                  {/* Coffee Steam Particles */}
                  {idx === 0 && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-12 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-white rounded-full animate-steam1" />
                      <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-white rounded-full animate-steam2" />
                      <div className="absolute bottom-0 left-3/4 w-2 h-2 bg-white rounded-full animate-steam3" />
                      {/* Extra energy particles on hover */}
                      <div className="absolute bottom-2 left-0 w-1.5 h-1.5 bg-amber-200 rounded-full animate-steam1 opacity-0 group-hover:opacity-100 delay-100" />
                      <div className="absolute bottom-2 right-0 w-1.5 h-1.5 bg-amber-200 rounded-full animate-steam2 opacity-0 group-hover:opacity-100 delay-300" />
                    </div>
                  )}

                  {/* Lightbulb Sparkles */}
                  {idx === 1 && (
                    <>
                      <div className="absolute -top-3 -right-3 w-3 h-3 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
                      <div className="absolute -bottom-3 -left-3 w-2.5 h-2.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-75" />
                      <div className="absolute top-0 -left-2 w-2 h-2 bg-yellow-200 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-150" />
                    </>
                  )}

                  {/* Github Rings */}
                  {idx === 2 && (
                    <>
                      <div className="absolute inset-[-4px] rounded-3xl border-4 border-purple-400 opacity-0 group-hover:opacity-60 group-hover:animate-ping" />
                      <div className="absolute inset-[-8px] rounded-[20px] border-2 border-purple-300 opacity-0 group-hover:opacity-40 group-hover:animate-ping delay-100" />
                    </>
                  )}
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium group-hover:text-white transition-colors">
                    {item.text}
                  </p>
                </div>
              </KeycapCard>
            ))}
          </div>

          <style>{`
            /* Idle Animations */
            @keyframes idle-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
            .animate-idle-float { animation: idle-float 3s ease-in-out infinite; }
            
            @keyframes idle-breath { 0%, 100% { filter: brightness(1); transform: scale(1); } 50% { filter: brightness(1.2); transform: scale(1.05); } }
            .animate-idle-breath { animation: idle-breath 4s ease-in-out infinite; }
            
            @keyframes idle-tilt { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
            .animate-idle-tilt { animation: idle-tilt 3s ease-in-out infinite; }
            
            /* Interactive Animations */
            @keyframes steam1 { 
              0% { transform: translateY(0) scale(1); opacity: 0.9; } 
              50% { opacity: 0.8; }
              100% { transform: translateY(-30px) scale(1.8); opacity: 0; } 
            }
            @keyframes steam2 { 
              0% { transform: translateY(0) scale(1); opacity: 0.9; } 
              50% { opacity: 0.8; }
              100% { transform: translateY(-35px) scale(1.8); opacity: 0; } 
            }
            @keyframes steam3 { 
              0% { transform: translateY(0) scale(1); opacity: 0.9; } 
              50% { opacity: 0.8; }
              100% { transform: translateY(-25px) scale(1.8); opacity: 0; } 
            }
            
            .animate-steam1 { animation: steam1 1.8s infinite ease-out; }
            .animate-steam2 { animation: steam2 1.8s infinite ease-out 0.3s; }
            .animate-steam3 { animation: steam3 1.8s infinite ease-out 0.6s; }
            
            @keyframes coffee { 
              0%, 100% { transform: rotate(0deg); } 
              50% { transform: rotate(-25deg) translateY(-2px); } 
            }
            .group:hover .coffee-icon { animation: coffee 2s ease-in-out infinite; }
            
            @keyframes bulb { 
              0%, 100% { filter: brightness(1) drop-shadow(0 0 0px rgba(255, 255, 255, 0)); transform: scale(1); } 
              50% { filter: brightness(1.8) drop-shadow(0 0 25px rgba(253, 224, 71, 0.9)); transform: scale(1.1); } 
            }
            .group:hover .bulb-icon { animation: bulb 0.8s ease-in-out infinite; }
            
            @keyframes git { 
              0%, 100% { transform: scale(1) rotate(0deg); } 
              25% { transform: scale(1.2) rotate(-10deg); } 
              75% { transform: scale(1.2) rotate(10deg); } 
            }
            .group:hover .git-icon { animation: git 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; }
          `}</style>

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
  );
}