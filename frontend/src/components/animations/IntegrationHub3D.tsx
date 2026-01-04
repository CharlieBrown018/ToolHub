import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Image as ImageIcon, 
  Lightning, 
  Shield, 
  Columns, 
  Palette, 
  QrCode,
  Briefcase
} from '@phosphor-icons/react';

const TOOLS = [
  { name: 'Scan2PDF', icon: ImageIcon, color: '#3b82f6', route: '/tools/image-to-pdf' },
  { name: 'WebP Express', icon: Lightning, color: '#6366f1', route: '/tools/webp-express' },
  { name: 'SecurePass', icon: Shield, color: '#a855f7', route: '/tools/secure-pass' },
  { name: 'DiffMaster', icon: Columns, color: '#ef4444', route: '/tools/diff-master' },
  { name: 'Palette', icon: Palette, color: '#ec4899', route: '/tools/color-palette' },
  { name: 'QuickQR', icon: QrCode, color: '#f59e0b', route: '/tools/quick-qr' },
];

// Helper to darken colors for 3D sides
const shadeColor = (col: string, amt: number) => {
  let usePound = false;
  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255; else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255; else if (b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255; else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
};

function Thick3DBlock({ 
  size = 100, 
  thickness = 40, 
  elevation = 20,
  color = '#3b82f6', 
  children,
  className = ""
}: { 
  size?: number; 
  thickness?: number; 
  elevation?: number;
  color?: string; 
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: size, 
        height: size, 
        transformStyle: 'preserve-3d',
        transform: `translateZ(${elevation}px)`,
      }}
    >
      {/* Top Face */}
      <div 
        className="absolute inset-0 rounded-2xl flex items-center justify-center border border-white/30"
        style={{ 
          background: `linear-gradient(135deg, ${color}, ${shadeColor(color, -20)})`,
          transform: `translateZ(${thickness}px)`,
          zIndex: 5,
          boxShadow: `inset 0 2px 15px rgba(255,255,255,0.4), 0 10px 30px rgba(0,0,0,0.5)`,
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
        {children}
      </div>

      {/* Front Face (Thickness facing viewer) */}
      <div 
        className="absolute left-0 right-0 rounded-b-2xl"
        style={{ 
          bottom: 0,
          height: thickness,
          background: `linear-gradient(to bottom, ${shadeColor(color, -40)}, ${shadeColor(color, -60)})`,
          transform: `rotateX(-90deg)`,
          transformOrigin: 'bottom',
          boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.3)'
        }}
      />

      {/* Right Face (Thickness facing viewer) */}
      <div 
        className="absolute top-0 bottom-0 rounded-r-2xl"
        style={{ 
          right: 0,
          width: thickness,
          background: `linear-gradient(to right, ${shadeColor(color, -50)}, ${shadeColor(color, -70)})`,
          transform: `rotateY(90deg)`,
          transformOrigin: 'right',
          boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.3)'
        }}
      />

      {/* Ground Shadow - Projecting onto the grid plane */}
      <div 
        className="absolute inset-0 bg-black/80 rounded-2xl"
        style={{ 
          transform: `translateZ(${-elevation}px) translateY(${elevation/2}px) scale(1.1)`,
          filter: 'blur(30px)',
          opacity: 0.6
        }}
      />
    </div>
  );
}

function SlackLine({ 
  startX, 
  startY, 
  endX, 
  endY, 
  color = '#cbd5e1', 
  active = false,
  delay = 0 
}: { 
  startX: number; 
  startY: number; 
  endX: number; 
  endY: number; 
  color?: string;
  active?: boolean;
  delay?: number;
}) {
  // Orthogonal path: start -> half-horizontal -> vertical -> rest-horizontal
  const midX = startX + (endX - startX) * 0.5;
  const pathD = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      style={{ zIndex: 0, transform: 'translateZ(0px)' }} // Flat on the ground
    >
      {/* Ghost Path (always visible but faint) */}
      <path
        d={pathD}
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeOpacity={active ? 0.2 : 0.08}
        strokeDasharray={active ? "none" : "4 4"}
        fill="none"
      />

      {/* Active Colored Path with Glow */}
      {active && (
        <>
          <motion.path
            d={pathD}
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              pathLength: { duration: 2.5, delay, ease: "easeInOut" },
              opacity: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ 
              filter: `drop-shadow(0 0 12px ${color})`,
              willChange: "opacity, stroke-dashoffset"
            }}
          />
          
          {/* Moving Sparks / Data flow - Slowed down even more for ultra-calm feel */}
          {[0, 1].map((i) => (
            <motion.circle
              key={i}
              r="4"
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0.8, 0],
                scale: [0.8, 1.2, 0.8],
                //@ts-ignore
                "--offset-distance": ["0%", "100%"]
              }}
              style={{ 
                //@ts-ignore
                offsetPath: `path('${pathD}')`,
                //@ts-ignore
                offsetDistance: "var(--offset-distance)",
                filter: 'drop-shadow(0 0 10px white)',
                willChange: "transform, opacity"
              }}
              transition={{
                duration: 12,
                delay: delay + (i * 6),
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

export default function IntegrationHub3D() {
  const centerX = 50;
  const centerY = 50;
  const radius = 42; // Increased radius for more space

  const toolPositions = TOOLS.map((_, i) => {
    const angle = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  return (
    <div className="w-full h-full min-h-[700px] relative flex items-center justify-end overflow-visible">
      {/* Isometric Stage */}
      <div 
        className="relative w-[750px] h-[750px] transform-gpu translate-x-12"
        style={{ 
          perspective: '3000px',
          transform: 'rotateX(58deg) rotateZ(-38deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Ground Grid */}
        <div 
          className="absolute inset-[-40%] opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(white 1.5px, transparent 1.5px), linear-gradient(90deg, white 1.5px, transparent 1.5px)`,
            backgroundSize: '70px 70px',
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 90%)',
            transform: 'translateZ(0px)'
          }}
        />

        {/* Lines */}
        {toolPositions.map((pos, i) => (
          <SlackLine
            key={`line-${i}`}
            startX={50 * 7.5} startY={50 * 7.5}
            endX={pos.x * 7.5} endY={pos.y * 7.5}
            color={TOOLS[i].color}
            active={true}
            delay={i * 0.2}
          />
        ))}

        {/* Ghost/Broken Lines */}
        {[...Array(18)].map((_, i) => {
          const angle = (i / 18) * Math.PI * 2 + Math.PI / 18;
          const r = radius + 30 + (i % 3) * 20;
          const ex = centerX + r * Math.cos(angle);
          const ey = centerY + r * Math.sin(angle);
          return (
            <SlackLine
              key={`ghost-${i}`}
              startX={50 * 7.5} startY={50 * 7.5}
              endX={ex * 7.5} endY={ey * 7.5}
              active={false}
            />
          );
        })}

        {/* Central Hub - High elevation and thickness */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <Thick3DBlock size={200} thickness={80} elevation={60} color="#3b82f6">
            <div className="flex flex-col items-center gap-4">
              <Briefcase className="w-24 h-24 text-white drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]" weight="duotone" />
              <span className="text-[14px] font-black tracking-[0.4em] text-white/95">TOOLHUB</span>
            </div>
          </Thick3DBlock>
        </div>

        {/* Tool Tiles - Elevated and thick */}
        {TOOLS.map((tool, i) => (
          <div
            key={i}
            className="absolute"
            style={{ 
              left: `${toolPositions[i].x}%`, 
              top: `${toolPositions[i].y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Link to={tool.route}>
              <Thick3DBlock size={110} thickness={45} elevation={30} color={tool.color}>
                <div className="flex flex-col items-center gap-2">
                  <tool.icon className="w-12 h-12 text-white" weight="duotone" />
                  <span className="text-[9px] font-black text-white/90 uppercase tracking-widest leading-none">
                    {tool.name}
                  </span>
                </div>
              </Thick3DBlock>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
