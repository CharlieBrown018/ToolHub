import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GithubLogo,
  Coffee,
  Lightbulb,
  ArrowCircleRight,
} from '@phosphor-icons/react';
import { GlassButton } from '../ui/glass-button';
import { GlassCard } from '../ui/glass-card';
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

// Utility functions for consistent coloring
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

export default function CommunitySection() {
  return (
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
            {supportItems.map((item, idx) => (
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
  );
}
