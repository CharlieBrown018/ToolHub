import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function RotatingGlobe() {
  const nodes = useMemo(() => {
    return [...Array(30)].map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 48,
    }));
  }, []);

  const netConnections = useMemo(() => {
    return [...Array(12)].map((_, i) => {
      const angle1 = (i / 12) * Math.PI * 2;
      const angle2 = angle1 + Math.PI * 0.8;
      return { angle1, angle2 };
    });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none overflow-visible">
      <motion.div
        className="relative w-full h-full aspect-square"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-white/60">
          {/* Main Circle Outline */}
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.05" />
          
          {/* Latitude Lines */}
          {[15, 25, 35, 45, 55, 65, 75, 85].map((y) => {
            const r = Math.sqrt(48 * 48 - Math.pow(y - 50, 2));
            return (
              <ellipse 
                key={`lat-${y}`} 
                cx="50" cy={y} 
                rx={r} ry={r * 0.15} 
                fill="none" stroke="currentColor" strokeWidth="0.05" strokeOpacity="0.6"
              />
            );
          })}

          {/* Longitude Lines */}
          {[0, 30, 60, 90, 120, 150].map((angle) => (
            <ellipse
              key={`long-${angle}`}
              cx="50" cy="50"
              rx={Math.abs(48 * Math.cos((angle * Math.PI) / 180))}
              ry="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.05"
              strokeOpacity="0.7"
            />
          ))}

          {/* Network Connections */}
          {netConnections.map((conn, i) => {
            const x1 = 50 + 48 * Math.cos(conn.angle1);
            const y1 = 50 + 48 * Math.sin(conn.angle1);
            const x2 = 50 + 48 * Math.cos(conn.angle2);
            const y2 = 50 + 48 * Math.sin(conn.angle2);
            
            return (
              <line 
                key={`net-${i}`}
                x1={x1} y1={y1} 
                x2={x2} y2={y2} 
                stroke="currentColor" strokeWidth="0.02" strokeOpacity="0.3" strokeDasharray="0.5 1"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const x = 50 + node.radius * Math.cos(node.angle);
            const y = 50 + node.radius * Math.sin(node.angle);
            return (
              <circle key={`node-${i}`} cx={x} cy={y} r="0.2" fill="currentColor" fillOpacity="0.6" />
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}

