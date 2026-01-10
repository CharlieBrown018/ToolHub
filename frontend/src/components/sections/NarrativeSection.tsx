import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { 
  Code, 
  ArrowRight, 
  Warning,
  Lock,
  Eye,
  CloudSlash,
  Sparkle,
  Cookie,
  Toolbox,
  Image,
  ShieldCheck,
  QrCode,
  Palette,
  FileText,
  Lightning
} from '@phosphor-icons/react';
import { Snail, Heart as HeartIcon, UserX, Ghost } from 'lucide-react';
import { GlassCard } from '../ui/glass-card';
import { useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING SHAPES COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
interface FloatingShapesProps {
  decoY1: MotionValue<number>;
  decoY2: MotionValue<number>;
  decoY3: MotionValue<number>;
  decoY4: MotionValue<number>;
  decoY5: MotionValue<number>;
  decoY6: MotionValue<number>;
  decoY7: MotionValue<number>;
  decoY8: MotionValue<number>;
  decoRotate1: MotionValue<number>;
  decoRotate2: MotionValue<number>;
  decoRotate3: MotionValue<number>;
  decoScale1: MotionValue<number>;
  decoScale2: MotionValue<number>;
  decoOpacity1: MotionValue<number>;
  decoOpacity2: MotionValue<number>;
}

function FloatingShapes({
  decoY1, decoY2, decoY3, decoY4, decoY5, decoY6, decoY7, decoY8,
  decoRotate1, decoRotate2, decoRotate3,
  decoScale1, decoScale2,
  decoOpacity1, decoOpacity2
}: FloatingShapesProps) {
  return (
    <>
      {/* Large circle - top left */}
      <motion.div
        className="absolute top-[8%] left-[5%] w-5 h-5 rounded-full bg-white/20"
        style={{ y: decoY1, scale: decoScale1, opacity: decoOpacity1 }}
      />
      
      {/* Square - top right */}
      <motion.div
        className="absolute top-[12%] right-[8%] w-4 h-4 bg-white/15"
        style={{ y: decoY2, rotate: decoRotate1 }}
      />
      
      {/* Large circle - left side upper */}
      <motion.div
        className="absolute top-[18%] left-[3%] w-[18px] h-[18px] rounded-full bg-white/18"
        style={{ y: decoY3, scale: decoScale2 }}
      />
      
      {/* Diamond - right side */}
      <motion.div
        className="absolute top-[25%] right-[4%] w-4 h-4 bg-white/20"
        style={{ y: decoY4, rotate: decoRotate3 }}
      />
      
      {/* Ring - top center left */}
      <motion.div
        className="absolute top-[15%] left-[15%] w-5 h-5 rounded-full border-2 border-white/18"
        style={{ y: decoY5, scale: decoScale1 }}
      />
      
      {/* Large square - left mid */}
      <motion.div
        className="absolute top-[35%] left-[4%] w-[15px] h-[15px] bg-white/15"
        style={{ y: decoY6, rotate: decoRotate2 }}
      />
      
      {/* Circle - right side mid */}
      <motion.div
        className="absolute top-[38%] right-[6%] w-[18px] h-[18px] rounded-full bg-white/22"
        style={{ y: decoY7, opacity: decoOpacity2 }}
      />
      
      {/* Hollow square - left */}
      <motion.div
        className="absolute top-[45%] left-[8%] w-5 h-5 border-2 border-white/20"
        style={{ y: decoY8, rotate: decoRotate1 }}
      />
      
      {/* Large ring - right */}
      <motion.div
        className="absolute top-[48%] right-[3%] w-[22px] h-[22px] rounded-full border-2 border-white/15"
        style={{ y: decoY1, scale: decoScale2 }}
      />
      
      {/* Circle - left lower */}
      <motion.div
        className="absolute top-[55%] left-[2%] w-4 h-4 rounded-full bg-white/18"
        style={{ y: decoY2, opacity: decoOpacity1 }}
      />
      
      {/* Diamond - right lower */}
      <motion.div
        className="absolute top-[58%] right-[10%] w-[15px] h-[15px] bg-white/16"
        style={{ y: decoY3, rotate: decoRotate3 }}
      />
      
      {/* Large circle - bottom left */}
      <motion.div
        className="absolute bottom-[38%] left-[6%] w-5 h-5 rounded-full bg-white/20"
        style={{ y: decoY4, scale: decoScale1 }}
      />
      
      {/* Square - bottom right */}
      <motion.div
        className="absolute bottom-[35%] right-[5%] w-4 h-4 bg-white/18"
        style={{ y: decoY5, rotate: decoRotate2 }}
      />
      
      {/* Ring - bottom left */}
      <motion.div
        className="absolute bottom-[28%] left-[10%] w-[18px] h-[18px] rounded-full border-2 border-white/15"
        style={{ y: decoY6, scale: decoScale2 }}
      />
      
      {/* Circle - bottom right */}
      <motion.div
        className="absolute bottom-[25%] right-[8%] w-[20px] h-[20px] rounded-full bg-white/14"
        style={{ y: decoY7, opacity: decoOpacity2 }}
      />
      
      {/* Triangle - top area */}
      <motion.div
        className="absolute top-[20%] left-[22%]"
        style={{ y: decoY8, rotate: decoRotate1, opacity: decoOpacity1 }}
      >
        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-white/18" />
      </motion.div>
      
      {/* Plus/cross - left side */}
      <motion.div
        className="absolute top-[65%] left-[5%]"
        style={{ y: decoY1, rotate: decoRotate2, opacity: decoOpacity2 }}
      >
        <div className="relative w-[18px] h-[18px]">
          <div className="absolute top-1/2 left-0 w-full h-[3px] bg-white/20 -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-[3px] h-full bg-white/20 -translate-x-1/2" />
        </div>
      </motion.div>
      
      {/* Hollow square - right */}
      <motion.div
        className="absolute top-[70%] right-[4%] w-[16px] h-[16px] border-2 border-white/18"
        style={{ y: decoY2, rotate: decoRotate1 }}
      />
      
      {/* Large circle - bottom far left */}
      <motion.div
        className="absolute bottom-[18%] left-[3%] w-[20px] h-[20px] rounded-full bg-white/16"
        style={{ y: decoY3, scale: decoScale1 }}
      />
      
      {/* Diamond - bottom center right */}
      <motion.div
        className="absolute bottom-[15%] right-[15%] w-[15px] h-[15px] bg-white/15"
        style={{ y: decoY4, rotate: decoRotate3 }}
      />
      
      {/* Ring - far right upper */}
      <motion.div
        className="absolute top-[30%] right-[2%] w-[16px] h-[16px] rounded-full border-2 border-white/20"
        style={{ y: decoY5, scale: decoScale2 }}
      />
      
      {/* Circle - center left area */}
      <motion.div
        className="absolute top-[42%] left-[12%] w-[15px] h-[15px] rounded-full bg-white/12"
        style={{ y: decoY6, opacity: decoOpacity1 }}
      />
      
      {/* Triangle - right side */}
      <motion.div
        className="absolute top-[52%] right-[15%]"
        style={{ y: decoY7, rotate: decoRotate2, opacity: decoOpacity2 }}
      >
        <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[16px] border-b-white/15" />
      </motion.div>
      
      {/* Plus/cross - bottom right */}
      <motion.div
        className="absolute bottom-[30%] right-[18%]"
        style={{ y: decoY8, rotate: decoRotate1, opacity: decoOpacity1 }}
      >
        <div className="relative w-4 h-4">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/18 -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-[2px] h-full bg-white/18 -translate-x-1/2" />
        </div>
      </motion.div>
      
      {/* Large ring - bottom center */}
      <motion.div
        className="absolute bottom-[22%] left-[20%] w-5 h-5 rounded-full border-2 border-white/16"
        style={{ y: decoY1, scale: decoScale1 }}
      />
      
      {/* Circle - top far right */}
      <motion.div
        className="absolute top-[5%] right-[18%] w-4 h-4 rounded-full bg-white/18"
        style={{ y: decoY2, opacity: decoOpacity2 }}
      />
      
      {/* Square - bottom far left */}
      <motion.div
        className="absolute bottom-[12%] left-[12%] w-[15px] h-[15px] bg-white/14"
        style={{ y: decoY3, rotate: decoRotate2 }}
      />
      
      {/* Hollow circle - center area */}
      <motion.div
        className="absolute top-[60%] left-[18%] w-[18px] h-[18px] rounded-full border-2 border-white/14"
        style={{ y: decoY4, scale: decoScale2 }}
      />
      
      {/* Additional shapes */}
      <motion.div
        className="absolute top-[3%] left-[35%] w-[16px] h-[16px] rounded-full bg-white/16"
        style={{ y: decoY5, opacity: decoOpacity1 }}
      />
      <motion.div
        className="absolute top-[6%] right-[30%] w-[18px] h-[18px] rounded-full border-2 border-white/14"
        style={{ y: decoY6, scale: decoScale1 }}
      />
      <motion.div
        className="absolute top-[22%] left-[1%] w-[15px] h-[15px] bg-white/12"
        style={{ y: decoY7, rotate: decoRotate1 }}
      />
      <motion.div
        className="absolute top-[28%] right-[1%] w-5 h-5 rounded-full bg-white/15"
        style={{ y: decoY8, scale: decoScale2 }}
      />
      <motion.div
        className="absolute top-[32%] left-[15%] w-4 h-4 bg-white/14"
        style={{ y: decoY1, rotate: decoRotate3 }}
      />
      <motion.div
        className="absolute top-[35%] right-[12%] w-[16px] h-[16px] border-2 border-white/16"
        style={{ y: decoY2, rotate: decoRotate2 }}
      />
      <motion.div
        className="absolute top-[50%] left-[1%] w-[18px] h-[18px] rounded-full bg-white/18"
        style={{ y: decoY3, opacity: decoOpacity2 }}
      />
      <motion.div
        className="absolute top-[53%] right-[1%] w-5 h-5 rounded-full border-2 border-white/15"
        style={{ y: decoY4, scale: decoScale1 }}
      />
      <motion.div
        className="absolute top-[48%] left-[20%]"
        style={{ y: decoY5, rotate: decoRotate1, opacity: decoOpacity1 }}
      >
        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[15px] border-b-white/16" />
      </motion.div>
      <motion.div
        className="absolute bottom-[42%] left-[1%] w-4 h-4 bg-white/15"
        style={{ y: decoY6, rotate: decoRotate2 }}
      />
      <motion.div
        className="absolute bottom-[45%] right-[1%] w-[16px] h-[16px] rounded-full bg-white/14"
        style={{ y: decoY7, scale: decoScale2 }}
      />
      <motion.div
        className="absolute top-[40%] left-[25%]"
        style={{ y: decoY8, rotate: decoRotate1, opacity: decoOpacity2 }}
      >
        <div className="relative w-[16px] h-[16px]">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/16 -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-[2px] h-full bg-white/16 -translate-x-1/2" />
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-[8%] left-[2%] w-5 h-5 rounded-full border-2 border-white/18"
        style={{ y: decoY1, scale: decoScale1 }}
      />
      <motion.div
        className="absolute bottom-[5%] right-[3%] w-[18px] h-[18px] rounded-full bg-white/16"
        style={{ y: decoY2, opacity: decoOpacity1 }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[25%] w-[15px] h-[15px] bg-white/12"
        style={{ y: decoY3, rotate: decoRotate3 }}
      />
      <motion.div
        className="absolute bottom-[8%] right-[22%] w-4 h-4 border-2 border-white/14"
        style={{ y: decoY4, rotate: decoRotate1 }}
      />
      <motion.div
        className="absolute top-[2%] left-[2%] w-4 h-4 rounded-full bg-white/20"
        style={{ y: decoY5, scale: decoScale2 }}
      />
      <motion.div
        className="absolute top-[72%] left-[1%] w-[16px] h-[16px] rounded-full border-2 border-white/15"
        style={{ y: decoY6, scale: decoScale1 }}
      />
      <motion.div
        className="absolute top-[78%] right-[2%] w-[15px] h-[15px] bg-white/14"
        style={{ y: decoY7, rotate: decoRotate2 }}
      />
      <motion.div
        className="absolute bottom-[15%] right-[28%]"
        style={{ y: decoY8, rotate: decoRotate2, opacity: decoOpacity1 }}
      >
        <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[16px] border-b-white/14" />
      </motion.div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CHAPTER COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

interface Chapter1Props {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  rotate: MotionValue<number>;
  blur: MotionValue<number>;
  badgeScale: MotionValue<number>;
  titleY: MotionValue<number>;
}

function Chapter1({ opacity, y, scale, rotate, blur, badgeScale, titleY }: Chapter1Props) {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center px-4 py-8 will-change-transform"
      style={{ 
        opacity, 
        y, 
        scale,
        rotate,
        filter: useTransform(blur, (v) => v > 0 ? `blur(${v}px)` : 'none'),
      }}
    >
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-6 gap-3 lg:gap-4">
          
          {/* Row 1-3 Left: Main headline */}
          <div className="col-span-6 md:col-span-4 row-span-3">
            <GlassCard className="p-6 md:p-10 h-full bg-gradient-to-br from-red-500/8 via-white/[0.02] to-transparent border-red-500/20">
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6"
                style={{ scale: badgeScale }}
              >
                <Warning className="w-4 h-4 text-red-400" weight="fill" />
                <span className="text-red-400 text-xs font-bold uppercase tracking-[0.2em]">The Problem</span>
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6"
                style={{ y: titleY }}
              >
                The web makes<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">simple things hard.</span>
              </motion.h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                You just need to convert an image. But first: create an account, 
                verify your email, watch an ad, hit a paywall. Sound familiar?
              </p>
              {/* Inline popup badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { text: "Sign up to continue", icon: Lock },
                ].map((item, i) => (
                  <div key={i} className="px-4 py-2 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-sm font-medium flex items-center gap-2">
                    <item.icon className="w-4 h-4" weight="bold" />
                    {item.text}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
          
          {/* Row 1 Right: Stats card */}
          <div className="col-span-3 md:col-span-2">
            <GlassCard className="p-5 lg:p-6 h-full bg-gradient-to-br from-red-500/5 to-transparent border-red-500/15 flex flex-col justify-center">
              <div className="text-3xl md:text-4xl font-black text-red-400 mb-1">73%</div>
              <div className="text-xs text-gray-500 leading-tight">abandon tools requiring signup</div>
            </GlassCard>
          </div>
          
          {/* Row 2 Right: Animated Frustration Visual */}
          <div className="col-span-3 md:col-span-2">
            <GlassCard className="p-5 lg:p-6 h-full bg-red-950/20 border-red-500/20 flex flex-col justify-center">
              <div className="px-4 py-3 rounded-lg bg-red-950/50 border border-red-500/20 text-red-300 text-base flex items-center gap-3">
                <div className="relative w-full h-10 overflow-hidden rounded">
                  {/* Progress trail background */}
                  <div className="absolute inset-0 bg-red-500/10 rounded" />
                  
                  {/* Progress bar - fills very slowly, stops before end */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-red-500/20 rounded"
                    style={{
                      width: '0%',
                      animation: 'snailProgress 60s ease-out forwards'
                    }}
                  />
                  
                  {/* Snail - crawls very slowly, stops before end */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      left: '0%',
                      animation: 'snailCrawl 60s ease-out forwards'
                    }}
                  >
                    <Snail className="w-8 h-8 text-red-400" />
                  </div>
                </div>
                <span className="text-sm whitespace-nowrap font-medium">Please wait...</span>
              </div>
              <style>{`
                @keyframes snailProgress {
                  0% { width: 0%; }
                  100% { width: 22%; }
                }
                @keyframes snailCrawl {
                  0% { left: 0%; }
                  100% { left: calc(22% - 16px); }
                }
              `}</style>
            </GlassCard>
          </div>
          
          {/* Row 3 Right: Ads */}
          <div className="col-span-3 md:col-span-2">
            <GlassCard className="p-5 lg:p-6 h-full bg-gradient-to-br from-red-500/5 to-transparent border-red-500/15">
              <Eye className="w-8 h-8 text-red-400 mb-3" weight="duotone" />
              <div className="text-lg font-bold text-white mb-1">Ads Everywhere</div>
              <div className="text-sm text-gray-500">Watch 30 sec first</div>
            </GlassCard>
          </div>
          
          {/* Row 4 Left: Paywalls */}
          <div className="col-span-3 md:col-span-3">
            <GlassCard className="p-5 lg:p-6 h-full bg-gradient-to-br from-red-500/5 to-transparent border-red-500/15">
              <Lock className="w-8 h-8 text-red-400 mb-3" weight="duotone" />
              <div className="text-lg font-bold text-white mb-1">Paywalls</div>
              <div className="text-sm text-gray-500">"Premium" for basics</div>
            </GlassCard>
          </div>
          
          {/* Row 4 Right: Data Harvesting */}
          <div className="col-span-3 md:col-span-3">
            <GlassCard className="p-5 lg:p-6 h-full bg-gradient-to-br from-red-500/5 to-transparent border-red-500/15">
              <CloudSlash className="w-8 h-8 text-red-400 mb-3" weight="duotone" />
              <div className="text-lg font-bold text-white mb-1">Data Harvesting</div>
              <div className="text-sm text-gray-500">Files uploaded to servers</div>
            </GlassCard>
              </div>
          
          {/* Row 5 Left: Popups */}
          <div className="col-span-3 md:col-span-3">
            <GlassCard className="p-5 lg:p-6 h-full bg-red-950/20 border-red-500/20 flex flex-col justify-center">
              <div className="px-4 py-3 rounded-lg bg-red-950/50 border border-red-500/20 text-red-300 text-base flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {/* 3 filled hearts */}
                  {[1, 2, 3].map((i) => (
                    <HeartIcon 
                      key={i} 
                      className="w-8 h-8 fill-red-400 text-red-400 animate-pulse" 
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                  {/* 2 empty hearts */}
                  {[4, 5].map((i) => (
                    <HeartIcon 
                      key={i} 
                      className="w-8 h-8 fill-none text-red-400/20" 
                    />
                  ))}
                </div>
                <span className="text-sm whitespace-nowrap font-medium">3 free uses left</span>
              </div>
            </GlassCard>
          </div>
          
          {/* Row 5 Right: Time Wasted */}
          <div className="col-span-3 md:col-span-3">
            <GlassCard className="p-5 lg:p-6 h-full bg-gradient-to-br from-red-500/5 to-transparent border-red-500/15 flex flex-col justify-center">
              <div className="text-3xl md:text-4xl font-black text-red-400 mb-1">5min</div>
              <div className="text-xs text-gray-500 leading-tight">wasted on average per task</div>
            </GlassCard>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}

interface Chapter2Props {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  rotate: MotionValue<number>;
  blur: MotionValue<number>;
  badgeScale: MotionValue<number>;
  titleY: MotionValue<number>;
}

function Chapter2({ opacity, y, scale, rotate, blur, badgeScale, titleY }: Chapter2Props) {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center px-4 py-8 will-change-transform"
      style={{ 
        opacity, 
        y, 
        scale,
        rotate,
        filter: useTransform(blur, (v) => v > 0 ? `blur(${v}px)` : 'none'),
      }}
    >
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-6 gap-4 lg:gap-6">
          
          {/* Main headline - 4 columns */}
          <div className="col-span-6 md:col-span-4">
            <GlassCard className="p-6 md:p-10 h-full bg-gradient-to-br from-accent-blue/8 via-white/[0.02] to-transparent border-accent-blue/20">
                  <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 mb-4"
                    style={{ scale: badgeScale }}
                  >
                <Sparkle className="w-4 h-4 text-accent-blue" weight="fill" />
                <span className="text-accent-blue text-xs font-bold uppercase tracking-[0.2em]">The Solution</span>
                  </motion.div>
                  <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1]"
                    style={{ y: titleY }}
                  >
                    So we built <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-blue-400">something better.</span>
                  </motion.h2>
            </GlassCard>
                </div>
          
          {/* Before → After - Animated Card - 2 columns */}
          <div className="col-span-6 md:col-span-2">
            <GlassCard className="p-5 lg:p-6 h-full bg-blue-950/20 border-accent-blue/20 flex flex-col justify-center">
              <div className="px-4 py-6 rounded-lg bg-blue-950/50 border border-accent-blue/20">
                {/* Animated transformation visual */}
                <div className="flex items-center justify-center gap-4">
                  {/* Old way - 2x2 Grid of tools */}
                  <div 
                    className="flex flex-col items-center gap-2"
                    style={{ animation: 'oldWayFade 3s ease-in-out infinite' }}
                  >
                    <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                      <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center"><Lock className="w-6 h-6 text-gray-500" /></div>
                      <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center"><Eye className="w-6 h-6 text-gray-500" /></div>
                      <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center"><Warning className="w-6 h-6 text-gray-500" /></div>
                      <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center"><Cookie className="w-6 h-6 text-gray-500" /></div>
                  </div>
                    <span className="text-xs text-gray-500 line-through">Old way</span>
                  </div>
                  
                  {/* Arrow animation */}
                  <div 
                    className="flex items-center"
                    style={{ animation: 'arrowPulse 3s ease-in-out infinite' }}
                  >
                    <ArrowRight className="w-8 h-8 text-accent-blue" weight="bold" />
                </div>
                  
                  {/* ToolHub - Toolbox */}
                  <div 
                    className="flex flex-col items-center gap-2"
                    style={{ animation: 'newWayGlow 3s ease-in-out infinite' }}
                  >
                    <div className="w-24 h-24 rounded-xl bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center">
                      <Toolbox className="w-12 h-12 text-accent-blue" weight="duotone" />
              </div>
                    <span className="text-sm text-accent-blue font-bold">ToolHub</span>
                  </div>
                </div>
              </div>
              
              <style>{`
                @keyframes oldWayFade {
                  0%, 100% { opacity: 0.4; transform: scale(0.95); }
                  50% { opacity: 0.7; transform: scale(1); }
                }
                @keyframes arrowPulse {
                  0%, 100% { transform: translateX(0); opacity: 0.6; }
                  50% { transform: translateX(4px); opacity: 1; }
                }
                @keyframes newWayGlow {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: 1; transform: scale(1.05); filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5)); }
                }
              `}</style>
            </GlassCard>
          </div>
          
          {/* Step 1 */}
          <div className="col-span-3 md:col-span-2">
            <GlassCard className="p-5 lg:p-6 h-full bg-gradient-to-br from-accent-blue/5 to-transparent border-accent-blue/15">
              <div className="w-12 h-12 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-lg font-bold mb-4">1</div>
              <div className="text-lg font-bold text-white mb-1">Open Tool</div>
              <div className="text-sm text-gray-500">Just visit the page. No signup, no login.</div>
            </GlassCard>
          </div>
          
          {/* Step 2 */}
          <div className="col-span-3 md:col-span-2">
            <GlassCard className="p-5 lg:p-6 h-full bg-gradient-to-br from-accent-blue/5 to-transparent border-accent-blue/15">
              <div className="w-12 h-12 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-lg font-bold mb-4">2</div>
              <div className="text-lg font-bold text-white mb-1">Drop Files</div>
              <div className="text-sm text-gray-500">Drag & drop or browse. Simple as that.</div>
            </GlassCard>
          </div>
          
          {/* Step 3 */}
          <div className="col-span-3 md:col-span-2">
            <GlassCard className="p-5 lg:p-6 h-full bg-gradient-to-br from-accent-blue/5 to-transparent border-accent-blue/15">
              <div className="w-12 h-12 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-lg font-bold mb-4">3</div>
              <div className="text-lg font-bold text-white mb-1">Get Results</div>
              <div className="text-sm text-gray-500">Instant processing, right on your device.</div>
            </GlassCard>
          </div>
          
          {/* Privacy highlight - Your files stay local */}
          <div className="col-span-3 md:col-span-2">
            <GlassCard className="p-5 lg:p-6 h-full bg-gradient-to-br from-accent-blue/8 to-transparent border-accent-blue/20 flex flex-col justify-center">
              <div className="w-16 h-16 rounded-xl bg-accent-blue/20 text-accent-blue flex items-center justify-center mb-6">
                <CloudSlash className="w-8 h-8" weight="duotone" />
                </div>
              <div className="text-xl font-bold text-white mb-2">Your files stay local</div>
              <div className="text-sm text-gray-400">Nothing is ever uploaded to any server.</div>
            </GlassCard>
                </div>
          
          {/* 100% Free - Informative Card */}
          <div className="col-span-3 md:col-span-2">
            <GlassCard className="p-5 lg:p-6 h-full bg-gradient-to-br from-accent-blue/8 to-transparent border-accent-blue/20 flex flex-col justify-center">
              <div className="w-16 h-16 rounded-xl bg-accent-blue/20 text-accent-blue flex items-center justify-center mb-6">
                <span className="text-3xl font-black">∞</span>
              </div>
              <div className="text-xl font-bold text-white mb-2">100% Free Forever</div>
              <div className="text-sm text-gray-400">No hidden fees, no premium tiers.</div>
            </GlassCard>
          </div>
          
          {/* 0 Accounts Needed - Animated Card */}
          <div className="col-span-3 md:col-span-2">
            <GlassCard className="p-5 lg:p-6 h-full bg-blue-950/20 border-accent-blue/20 flex flex-col justify-center">
              <div className="px-4 py-5 rounded-lg bg-blue-950/50 border border-accent-blue/20 text-accent-blue text-base flex flex-col items-center gap-4">
                <div className="grid grid-cols-2 gap-1">
                  {/* Crossed out users */}
                  {[0, 1, 2].map((i) => (
                    <UserX 
                      key={i}
                      className="w-8 h-8 text-gray-600" 
                      style={{ 
                        animation: `userCrossOut 2.5s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                  {/* Checkmark user */}
                  <Ghost 
                    className="w-8 h-8 text-accent-blue"
                    style={{ animation: 'userCheckPulse 2.5s ease-in-out infinite' }}
                  />
              </div>
                <span className="text-sm whitespace-nowrap font-medium">0 accounts needed</span>
              </div>
              
              <style>{`
                @keyframes userCrossOut {
                  0%, 100% { opacity: 0.3; transform: scale(0.9); }
                  50% { opacity: 0.6; transform: scale(1); }
                }
                @keyframes userCheckPulse {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.6)); }
                }
              `}</style>
            </GlassCard>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}

interface Chapter3Props {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  blur: MotionValue<number>;
  titleScale: MotionValue<number>;
}

function Chapter3({
  opacity, y, scale, blur, titleScale,
}: Chapter3Props) {
  // Tool categories with their tools
  const toolCategories = [
    { 
      name: 'Image Tools', 
      icon: Image, 
      color: 'blue',
      tools: ['Scan2PDF', 'WebP Express', 'ShrinkIt'],
      description: 'Convert, compress, optimize'
    },
    { 
      name: 'Developer Tools', 
      icon: Code, 
      color: 'indigo',
      tools: ['DataValidator', 'DiffMaster'],
      description: 'Code & data formatting'
    },
    { 
      name: 'Document Tools', 
      icon: FileText, 
      color: 'green',
      tools: ['DocuMark'],
      description: 'Markdown to PDF processing'
    },
    { 
      name: 'Design Tools', 
      icon: Palette, 
      color: 'pink',
      tools: ['ColorPalette'],
      description: 'Creative design utilities'
    },
    { 
      name: 'Security Tools', 
      icon: ShieldCheck, 
      color: 'amber',
      tools: ['SecurePass'],
      description: 'Privacy & security generators'
    },
    { 
      name: 'Utilities', 
      icon: Lightning, 
      color: 'teal',
      tools: ['UnitFlow', 'QuickQR'],
      description: 'Daily productivity tools'
    },
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center px-4 py-8 will-change-transform"
      style={{ 
        opacity, 
        y,
        scale,
        filter: useTransform(blur, (v) => v > 0 ? `blur(${v}px)` : 'none'),
      }}
    >
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-6 gap-4 lg:gap-6">
          
          {/* Row 1: Main headline (4 cols) + Stats (2 cols) */}
          <div className="col-span-6 md:col-span-4">
            <GlassCard className="p-6 md:p-10 h-full bg-gradient-to-br from-accent-green/8 via-white/[0.02] to-transparent border-accent-green/20">
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/20 mb-4"
              >
                <Toolbox className="w-4 h-4 text-accent-green" weight="fill" />
                <span className="text-accent-green text-xs font-bold uppercase tracking-[0.2em]">Your Toolkit</span>
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4"
                style={{ scale: titleScale }}
              >
                Everything you <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-emerald-400">need.</span>
              </motion.h2>
              <p className="text-lg text-gray-400">From image conversion to security tools. All free, all local, all yours.</p>
            </GlassCard>
          </div>
          
          {/* Stats card with animated tool count */}
          <div className="col-span-6 md:col-span-2">
            <GlassCard className="p-5 lg:p-6 h-full bg-green-950/20 border-accent-green/20 flex flex-col justify-center">
              <div className="px-4 py-5 rounded-lg bg-green-950/50 border border-accent-green/20 flex flex-col items-center gap-3">
                <div className="grid grid-cols-3 gap-2">
                  {[Image, ShieldCheck, Code, Palette, QrCode, FileText].map((Icon, i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded bg-accent-green/20 flex items-center justify-center"
                      style={{ 
                        animation: 'toolPulse 2s ease-in-out infinite',
                        animationDelay: `${i * 0.2}s`
                      }}
                    >
                      <Icon className="w-4 h-4 text-accent-green" weight="duotone" />
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-accent-green">10+</div>
                  <div className="text-xs text-gray-500">tools & growing</div>
                </div>
              </div>
              <style>{`
                @keyframes toolPulse {
                  0%, 100% { opacity: 0.5; transform: scale(0.95); }
                  50% { opacity: 1; transform: scale(1); }
                }
              `}</style>
            </GlassCard>
          </div>
          
          {/* Row 2: Tool Categories (4 cards) */}
          {toolCategories.map((category, idx) => {
            const colorClasses: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
              blue: { bg: 'from-accent-blue/5', border: 'border-accent-blue/15 hover:border-accent-blue/30', text: 'text-accent-blue', iconBg: 'bg-accent-blue/20' },
              green: { bg: 'from-accent-green/5', border: 'border-accent-green/15 hover:border-accent-green/30', text: 'text-accent-green', iconBg: 'bg-accent-green/20' },
              indigo: { bg: 'from-accent-indigo/5', border: 'border-accent-indigo/15 hover:border-accent-indigo/30', text: 'text-accent-indigo', iconBg: 'bg-accent-indigo/20' },
              pink: { bg: 'from-accent-pink/5', border: 'border-accent-pink/15 hover:border-accent-pink/30', text: 'text-accent-pink', iconBg: 'bg-accent-pink/20' },
              amber: { bg: 'from-accent-amber/5', border: 'border-accent-amber/15 hover:border-accent-amber/30', text: 'text-accent-amber', iconBg: 'bg-accent-amber/20' },
              teal: { bg: 'from-accent-teal/5', border: 'border-accent-teal/15 hover:border-accent-teal/30', text: 'text-accent-teal', iconBg: 'bg-accent-teal/20' },
            };
            const colors = colorClasses[category.color] || colorClasses.blue;
            
            return (
              <div key={idx} className="col-span-6 md:col-span-2 lg:col-span-2">
                <GlassCard className={`p-5 lg:p-6 h-full bg-gradient-to-br ${colors.bg} to-transparent ${colors.border} transition-all group`}>
                  <div className={`w-14 h-14 rounded-xl ${colors.iconBg} ${colors.text} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-7 h-7" weight="duotone" />
                  </div>
                  <div className={`text-lg font-bold ${colors.text} mb-1`}>{category.name}</div>
                  <div className="text-sm text-gray-500 mb-3">{category.description}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.tools.map((tool, toolIdx) => (
                      <span key={toolIdx} className={`text-xs px-2 py-1 rounded-md ${colors.iconBg} ${colors.text} font-medium`}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            );
          })}
                 
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN NARRATIVE SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function NarrativeSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"]
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // OPTIMIZED SCROLL ANIMATIONS - Snappier transitions for a faster feel
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Chapter 1: Visible 0-0.22, Fast fade out 0.22-0.28
  const chapter1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.28], [1, 1, 0]);
  const chapter1Y = useTransform(scrollYProgress, [0, 0.22, 0.28], [0, 0, -30]);
  const chapter1Scale = useTransform(scrollYProgress, [0, 0.22, 0.28], [1, 1, 0.99]);
  const chapter1Rotate = useTransform(scrollYProgress, [0, 0.28], [0, 0]);
  const chapter1Blur = useTransform(scrollYProgress, [0, 0.24, 0.28], [0, 0, 0.5]);
  const ch1BadgeScale = useTransform(scrollYProgress, [0, 0.08], [0.98, 1]);
  const ch1TitleY = useTransform(scrollYProgress, [0, 0.06], [4, 0]);

  // Chapter 2: Fast fade in 0.24-0.30, Visible 0.30-0.55, Fast fade out 0.55-0.61
  const chapter2Opacity = useTransform(scrollYProgress, [0.24, 0.30, 0.55, 0.61], [0, 1, 1, 0]);
  const chapter2Y = useTransform(scrollYProgress, [0.24, 0.30, 0.55, 0.61], [30, 0, 0, -30]);
  const chapter2Scale = useTransform(scrollYProgress, [0.24, 0.30, 0.55, 0.61], [0.99, 1, 1, 0.99]);
  const chapter2Rotate = useTransform(scrollYProgress, [0.24, 0.30, 0.55, 0.61], [0, 0, 0, 0]);
  const chapter2Blur = useTransform(scrollYProgress, [0.24, 0.30, 0.55, 0.61], [0.5, 0, 0, 0.5]);
  const ch2BadgeScale = useTransform(scrollYProgress, [0.26, 0.30], [0.98, 1]);
  const ch2TitleY = useTransform(scrollYProgress, [0.26, 0.30], [8, 0]);

  // Chapter 3: Fast fade in 0.57-0.63, Visible 0.63-1
  const chapter3Opacity = useTransform(scrollYProgress, [0.57, 0.63, 1], [0, 1, 1]);
  const chapter3Y = useTransform(scrollYProgress, [0.57, 0.63], [30, 0]);
  const chapter3Scale = useTransform(scrollYProgress, [0.57, 0.63], [0.99, 1]);
  const chapter3Blur = useTransform(scrollYProgress, [0.57, 0.63], [0.5, 0]);
  const ch3TitleScale = useTransform(scrollYProgress, [0.59, 0.63], [0.99, 1]);

  // Background glows - tightened transitions
  const glow1Opacity = useTransform(scrollYProgress, [0, 0.24, 0.28], [0.5, 0.5, 0]);
  const glow2Opacity = useTransform(scrollYProgress, [0.24, 0.30, 0.55, 0.61], [0, 0.5, 0.5, 0]);
  const glow3Opacity = useTransform(scrollYProgress, [0.57, 0.63, 1], [0, 0.5, 0.4]);

  // Floating shapes - simplified linear motion (fewer calculations)
  const decoY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const decoY2 = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const decoY3 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const decoY4 = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const decoY5 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const decoY6 = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const decoY7 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const decoY8 = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const decoRotate1 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const decoRotate2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const decoRotate3 = useTransform(scrollYProgress, [0, 1], [45, 100]);
  const decoScale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 0.9]);
  const decoScale2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 1]);
  const decoOpacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.35, 0.15]);
  const decoOpacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.4, 0.2]);

  return (
    <section ref={containerRef} className="relative">
      <div className="h-[300vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          
          {/* Background glows - GPU accelerated with will-change */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full will-change-[opacity]"
              style={{ 
                opacity: glow1Opacity,
                background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0) 70%)',
              }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full will-change-[opacity]"
              style={{ 
                opacity: glow2Opacity,
                background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)',
              }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full will-change-[opacity]"
              style={{ 
                opacity: glow3Opacity,
                background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0) 70%)',
              }}
            />

            {/* Floating shapes */}
            <FloatingShapes
              decoY1={decoY1} decoY2={decoY2} decoY3={decoY3} decoY4={decoY4}
              decoY5={decoY5} decoY6={decoY6} decoY7={decoY7} decoY8={decoY8}
              decoRotate1={decoRotate1} decoRotate2={decoRotate2} decoRotate3={decoRotate3}
              decoScale1={decoScale1} decoScale2={decoScale2}
              decoOpacity1={decoOpacity1} decoOpacity2={decoOpacity2}
            />
          </div>

          {/* Chapter 1: The Problem */}
          <Chapter1
            opacity={chapter1Opacity}
            y={chapter1Y}
            scale={chapter1Scale}
            rotate={chapter1Rotate}
            blur={chapter1Blur}
            badgeScale={ch1BadgeScale}
            titleY={ch1TitleY}
          />

          {/* Chapter 2: The Solution */}
          <Chapter2
            opacity={chapter2Opacity}
            y={chapter2Y}
            scale={chapter2Scale}
            rotate={chapter2Rotate}
            blur={chapter2Blur}
            badgeScale={ch2BadgeScale}
            titleY={ch2TitleY}
          />

          {/* Chapter 3: The Promise */}
          <Chapter3
            opacity={chapter3Opacity}
            y={chapter3Y}
            scale={chapter3Scale}
            blur={chapter3Blur}
            titleScale={ch3TitleScale}
          />

        </div>
      </div>
    </section>
  );
}
