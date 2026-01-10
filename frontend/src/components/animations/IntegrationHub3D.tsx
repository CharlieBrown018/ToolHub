import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Image as ImageIcon, 
  Lightning, 
  ShieldCheck, 
  Columns, 
  Palette, 
  QrCode,
  Toolbox,
  Icon
} from '@phosphor-icons/react';

// ============================================================================
// CONFIGURATION
// ============================================================================

interface GridConfig {
  gridSize: number;      // Grid dimensions (e.g., 9 = 9x9 grid)
  cellSize: number;      // Size of each grid cell in pixels
  minGap: number;        // Minimum cells between tiles (for visible pulse lines)
}

interface TileConfig {
  id: string;
  gridX: number;         // Grid X position (0 to gridSize-1)
  gridY: number;         // Grid Y position (0 to gridSize-1)
  name: string;
  icon: Icon;
  color: string;
  route?: string;
  size?: 'small' | 'medium' | 'large';  // Tile size
  isHub?: boolean;       // Is this the central hub?
}

// Grid configuration
const GRID_CONFIG: GridConfig = {
  gridSize: 10,          // 10x10 grid
  cellSize: 75,          // 75px per cell
  minGap: 2,             // Minimum 2 cells between tiles
};

// Tile size presets (in grid cells)
const TILE_SIZES = {
  small: { cells: 1, pixels: 90, thickness: 28 },
  medium: { cells: 1.5, pixels: 110, thickness: 35 },
  large: { cells: 2.5, pixels: 180, thickness: 55 },
};

// Tile configurations - placed on grid coordinates
// Hub is at center (4.5, 4.5) in a 10x10 grid (centered between cells 4 and 5)
const TILES: TileConfig[] = [
  // Central Hub - centered in 10x10 grid
  { id: 'hub', gridX: 4, gridY: 4, name: '', icon: Toolbox, color: '#3b82f6', isHub: true, size: 'large' },
  
  // Tools around the hub (at least 2 cells away for visible pulse lines)
  { id: 'scan2pdf', gridX: 1, gridY: 1, name: 'Scan2PDF', icon: ImageIcon, color: '#3b82f6', route: '/tools/image-to-pdf', size: 'medium' },
  { id: 'webp', gridX: 7, gridY: 0, name: 'WebP Express', icon: Lightning, color: '#6366f1', route: '/tools/webp-express', size: 'medium' },
  { id: 'quickqr', gridX: 0, gridY: 5, name: 'QuickQR', icon: QrCode, color: '#f59e0b', route: '/tools/quick-qr', size: 'medium' },
  { id: 'securepass', gridX: 8, gridY: 3, name: 'SecurePass', icon: ShieldCheck, color: '#a855f7', route: '/tools/secure-pass', size: 'medium' },
  { id: 'palette', gridX: 2, gridY: 8, name: 'Palette', icon: Palette, color: '#ec4899', route: '/tools/color-palette', size: 'medium' },
  { id: 'diffmaster', gridX: 8, gridY: 7, name: 'DiffMaster', icon: Columns, color: '#ef4444', route: '/tools/diff-master', size: 'medium' },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Darken/lighten colors for 3D shading
const shadeColor = (col: string, amt: number): string => {
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

// Convert grid position to pixel position
const gridToPixel = (gridPos: number, config: GridConfig): number => {
  return gridPos * config.cellSize;
};

// Calculate center of tile in pixels
const getTileCenter = (tile: TileConfig, config: GridConfig): { x: number; y: number } => {
  const sizeConfig = TILE_SIZES[tile.size || 'medium'];
  const offset = (sizeConfig.cells * config.cellSize) / 2;
  return {
    x: gridToPixel(tile.gridX, config) + offset,
    y: gridToPixel(tile.gridY, config) + offset,
  };
};

// Generate orthogonal grid path between two points
const generateGridPath = (
  startX: number, 
  startY: number, 
  endX: number, 
  endY: number
): string => {
  // Create L-shaped path following grid lines
  const midX = startX + (endX - startX) * 0.5;
  return `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
};

// ============================================================================
// 3D TILE COMPONENT
// ============================================================================

interface Tile3DProps {
  size: number;
  thickness: number;
  color: string;
  children: React.ReactNode;
  className?: string;
}

function Tile3D({ size, thickness, color, children, className = "" }: Tile3DProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150); // Increased grace period for maximum robustness
  };

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const depth = thickness;
  const baseDepth = thickness * 0.5;
  const capDepth = thickness * 0.5;
  const capSize = size * 0.86;
  const capOffset = (size - capSize) / 2;
  
  // Convert hex color to rgba for glow effect
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  const glowColor = hexToRgba(color, 0.6);
  const glowShadow = isHovered 
    ? `0 0 30px ${glowColor}, 0 0 60px ${hexToRgba(color, 0.4)}, 0 0 90px ${hexToRgba(color, 0.2)}`
    : '';
  
  // Expand hitbox by 0% on all sides for precise hover detection
  const expandedSize = size;
  
  return (
    <div 
      className={`relative ${className} transition-all duration-300 pointer-events-none`}
      style={{ 
        width: expandedSize, 
        height: expandedSize,
        transformStyle: 'preserve-3d',
        filter: isHovered ? `drop-shadow(0 0 20px ${glowColor})` : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 3D Cube Container */}
      <div 
        style={{ 
          width: size, 
          height: size, 
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* --- VISIBLE GEOMETRY --- */}
        {/* --- BASE TIER --- */}
        {/* Base Front Face */}
        <div 
          className="absolute"
          style={{ 
            width: size,
            height: baseDepth,
            bottom: -baseDepth,
            left: 0,
            background: `linear-gradient(to bottom, ${shadeColor(color, -20)}, ${shadeColor(color, -40)})`,
            transform: `rotateX(-90deg) translateY(-${baseDepth}px)`,
            transformOrigin: 'top',
            borderTop: `1px solid rgba(255,255,255,0.15)`,
            boxShadow: `0 4px 16px rgba(0,0,0,0.5), inset 0 -2px 8px rgba(0,0,0,0.3)`,
          }}
        />

        {/* Base Left Face */}
        <div 
          className="absolute"
          style={{ 
            width: baseDepth,
            height: size,
            top: 0,
            left: 0,
            background: `linear-gradient(to left, ${shadeColor(color, -30)}, ${shadeColor(color, -50)})`,
            transform: `rotateY(-90deg)`,
            transformOrigin: 'left',
            borderRight: `1px solid rgba(255,255,255,0.1)`,
            boxShadow: `4px 0 16px rgba(0,0,0,0.5), inset -2px 0 8px rgba(0,0,0,0.3)`,
          }}
        />

        {/* Base Top Face (Shoulder) */}
        <div 
          className="absolute"
          style={{ 
            width: size,
            height: size,
            background: shadeColor(color, -10),
            transform: `translateZ(${baseDepth}px)`,
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: `0 6px 24px rgba(0,0,0,0.4), inset 0 2px 12px rgba(0,0,0,0.2)`,
          }}
        />

        {/* --- CAP TIER --- */}
        {/* Cap Front Face */}
        <div 
          className="absolute transition-all duration-300"
          style={{ 
            width: capSize,
            height: capDepth,
            top: capOffset + capSize,
            left: capOffset,
            background: `linear-gradient(to bottom, ${shadeColor(color, 5)}, ${shadeColor(color, -15)})`,
            transform: `translateZ(${depth}px) rotateX(-90deg)`,
            transformOrigin: 'top',
            borderTop: `1px solid rgba(255,255,255,0.3)`,
            boxShadow: isHovered
              ? `0 0 15px ${hexToRgba(color, 0.4)}, 0 4px 20px rgba(0,0,0,0.6), inset 0 -2px 10px rgba(0,0,0,0.4)`
              : `0 4px 20px rgba(0,0,0,0.6), inset 0 -2px 10px rgba(0,0,0,0.4)`,
          }}
        />

        {/* Cap Left Face */}
        <div 
          className="absolute transition-all duration-300"
          style={{ 
            width: capDepth,
            height: capSize,
            top: capOffset,
            left: capOffset,
            background: `linear-gradient(to left, ${shadeColor(color, -5)}, ${shadeColor(color, -25)})`,
            transform: `translateZ(${baseDepth}px) rotateY(-90deg)`,
            transformOrigin: 'left',
            borderRight: `1px solid rgba(255,255,255,0.25)`,
            boxShadow: isHovered
              ? `0 0 15px ${hexToRgba(color, 0.4)}, 4px 0 20px rgba(0,0,0,0.6), inset -2px 0 10px rgba(0,0,0,0.4)`
              : `4px 0 20px rgba(0,0,0,0.6), inset -2px 0 10px rgba(0,0,0,0.4)`,
          }}
        />

        {/* Top Face - Main surface */}
        <div 
          className="absolute flex items-center justify-center border border-white/30 transition-all duration-300 pointer-events-none"
          style={{ 
            width: capSize,
            height: capSize,
            left: capOffset,
            top: capOffset,
            background: `linear-gradient(135deg, ${color}, ${shadeColor(color, -10)})`,
            transform: `translateZ(${depth}px)`,
            boxShadow: isHovered
              ? `${glowShadow}, inset 0 2px 20px rgba(255,255,255,0.5), 0 12px 40px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)`
              : `inset 0 2px 20px rgba(255,255,255,0.5), 0 12px 40px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)`,
          }}
        >
          {/* INTERACTIVE HIT TARGET - Invisible plate on top */}
          <div 
            className="absolute inset-0 z-50 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ 
              pointerEvents: 'auto',
              backgroundColor: 'rgba(255, 255, 255, 0.001)', // Force hit testing
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent pointer-events-none" />
          <div className="relative z-10 scale-[0.85] pointer-events-none">{children}</div>
        </div>
      </div>

      {/* Ground Shadow */}
      <div 
        className="absolute bg-black/70 pointer-events-none"
        style={{ 
          width: size,
          height: size,
          left: 0,
          top: 0,
          transform: `translateZ(-20px) translateY(16px) scale(1.25)`,
          filter: 'blur(45px)',
          opacity: 0.4,
          zIndex: -1,
        }}
      />
    </div>
  );
}

// ============================================================================
// PULSE LINE COMPONENT
// ============================================================================

interface PulseLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  delay?: number;
  active?: boolean;
}

function PulseLine({ startX, startY, endX, endY, color, delay = 0, active = true }: PulseLineProps) {
  const pathD = generateGridPath(startX, startY, endX, endY);

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      style={{ zIndex: 0, transform: 'translateZ(0px)' }}
    >
      {/* Base path (always visible) */}
      <path
        d={pathD}
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeOpacity={active ? 0.2 : 0.08}
        strokeDasharray={active ? "none" : "4 4"}
        fill="none"
      />

      {/* Active pulse path with glow */}
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
          
          {/* Moving spark particles */}
          {[0, 1].map((i) => (
            <motion.circle
              key={i}
              r="4"
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0.8, 0],
                scale: [0.8, 1.2, 0.8],
                // @ts-ignore
                "--offset-distance": ["0%", "100%"]
              }}
              style={{ 
                // @ts-ignore
                offsetPath: `path('${pathD}')`,
                // @ts-ignore
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

// ============================================================================
// GHOST LINES (decorative broken lines extending outward)
// ============================================================================

function GhostLines({ hubCenter, config }: { hubCenter: { x: number; y: number }; config: GridConfig }) {
  const ghostLines = [];
  const totalSize = config.gridSize * config.cellSize;
  
  // Generate ghost lines in 8 directions
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 + Math.PI / 12;
    const distance = totalSize * 0.6 + (i % 3) * 40;
    const endX = hubCenter.x + distance * Math.cos(angle);
    const endY = hubCenter.y + distance * Math.sin(angle);
    
    ghostLines.push(
      <PulseLine
        key={`ghost-${i}`}
        startX={hubCenter.x}
        startY={hubCenter.y}
        endX={endX}
        endY={endY}
        color="#ffffff"
        active={false}
      />
    );
  }
  
  return <>{ghostLines}</>;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function IntegrationHub3D() {
  const config = GRID_CONFIG;
  const totalSize = config.gridSize * config.cellSize;
  
  // Find hub tile
  const hubTile = TILES.find(t => t.isHub);
  const hubCenter = hubTile ? getTileCenter(hubTile, config) : { x: totalSize / 2, y: totalSize / 2 };
  
  // Get non-hub tiles
  const toolTiles = TILES.filter(t => !t.isHub);

  return (
    <div className="w-full h-full min-h-[700px] relative flex items-center justify-end overflow-visible">
      {/* Isometric Stage */}
      <div 
        className="relative transform-gpu"
        style={{ 
          width: totalSize,
          height: totalSize,
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
            backgroundSize: `${config.cellSize}px ${config.cellSize}px`,
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 90%)',
            transform: 'translateZ(0px)'
          }}
        />

        {/* Pulse Lines from Hub to each Tool */}
        {toolTiles.map((tile, i) => {
          const tileCenter = getTileCenter(tile, config);
          return (
            <PulseLine
              key={`line-${tile.id}`}
              startX={hubCenter.x}
              startY={hubCenter.y}
              endX={tileCenter.x}
              endY={tileCenter.y}
              color={tile.color}
              delay={i * 0.2}
              active={true}
            />
          );
        })}

        {/* Ghost/Decorative Lines */}
        <GhostLines hubCenter={hubCenter} config={config} />

        {/* Render all tiles */}
        {TILES.map((tile) => {
          const sizeConfig = TILE_SIZES[tile.size || 'medium'];
          const pixelX = gridToPixel(tile.gridX, config);
          const pixelY = gridToPixel(tile.gridY, config);
          const IconComponent = tile.icon;

          const tileElement = (
            <Tile3D 
              size={sizeConfig.pixels} 
              thickness={sizeConfig.thickness} 
              color={tile.color}
            >
              <div className="flex flex-col items-center gap-2">
                <IconComponent 
                  className={`text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] ${
                    tile.isHub ? 'w-24 h-24' : 'w-12 h-12'
                  }`} 
                  weight="duotone" 
                />
                <span className={`font-black text-white/90 uppercase tracking-widest leading-none ${
                  tile.isHub ? 'text-[14px] tracking-[0.4em]' : 'text-[9px]'
                }`}>
                  {tile.name}
                </span>
              </div>
            </Tile3D>
          );

          return (
            <div
              key={tile.id}
              className="absolute"
              style={{ 
                left: pixelX,
                top: pixelY,
                transformStyle: 'preserve-3d',
              }}
            >
              {tile.route ? (
                <Link 
                  to={tile.route} 
                  className="block"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {tileElement}
                </Link>
              ) : (
                tileElement
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
