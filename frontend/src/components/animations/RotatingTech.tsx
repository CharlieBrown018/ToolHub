import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiFastapi, 
  SiPython,
  SiVite
} from 'react-icons/si';

interface TechLink {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
}

const technologies: readonly TechLink[] = [
  { icon: SiReact, name: 'React' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiTailwindcss, name: 'Tailwind CSS' },
  { icon: SiFastapi, name: 'FastAPI' },
  { icon: SiPython, name: 'Python' },
  { icon: SiVite, name: 'Vite' },
];

interface RotatingTechProps {
  interval?: number;
}

export function RotatingTech({ interval = 3000 }: RotatingTechProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % technologies.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const currentTech = technologies[currentIndex];
  const Icon = currentTech?.icon;

  if (!currentTech) return null;

  return (
    <div className='flex items-center gap-3'>
      <span className='text-sm text-gray-400 whitespace-nowrap'>
        Built with:
      </span>

      <div
        className='relative flex items-center gap-2 h-6'
        style={{ minWidth: '160px' }}
      >
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='flex items-center gap-2 absolute left-0'
          >
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='text-gray-400'
            >
              <Icon className='w-5 h-5' />
            </motion.div>

            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='text-sm font-medium text-gray-400'
            >
              {currentTech.name}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

