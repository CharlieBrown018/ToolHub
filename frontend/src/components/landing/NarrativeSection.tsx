import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, 
  ArrowRight, 
  ArrowCircleRight,
  Warning,
  Lightning,
  Lock,
  Eye,
  EyeSlash,
  CloudSlash,
  Sparkle,
  Heart
} from '@phosphor-icons/react';
import { GlassCard } from '../ui/glass-card';
import { useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING SHAPES COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
interface FloatingShapesProps {
  decoY1: ReturnType<typeof useTransform>;
  decoY2: ReturnType<typeof useTransform>;
  decoY3: ReturnType<typeof useTransform>;
  decoY4: ReturnType<typeof useTransform>;
  decoY5: ReturnType<typeof useTransform>;
  decoY6: ReturnType<typeof useTransform>;
  decoY7: ReturnType<typeof useTransform>;
  decoY8: ReturnType<typeof useTransform>;
  decoRotate1: ReturnType<typeof useTransform>;
  decoRotate2: ReturnType<typeof useTransform>;
  decoRotate3: ReturnType<typeof useTransform>;
  decoScale1: ReturnType<typeof useTransform>;
  decoScale2: ReturnType<typeof useTransform>;
  decoOpacity1: ReturnType<typeof useTransform>;
  decoOpacity2: ReturnType<typeof useTransform>;
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
  opacity: ReturnType<typeof useTransform>;
  y: ReturnType<typeof useTransform>;
  scale: ReturnType<typeof useTransform>;
  rotate: ReturnType<typeof useTransform>;
  blur: ReturnType<typeof useTransform>;
  badgeScale: ReturnType<typeof useTransform>;
  titleY: ReturnType<typeof useTransform>;
}

function Chapter1({ opacity, y, scale, rotate, blur, badgeScale, titleY }: Chapter1Props) {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center px-4 py-8"
      style={{ 
        opacity, 
        y, 
        scale,
        rotate,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-4 gap-3">
          
          {/* Main headline - spans 3 cols, 2 rows */}
          <div className="col-span-4 md:col-span-3 row-span-2">
            <GlassCard className="p-6 md:p-8 h-full bg-gradient-to-br from-red-500/8 via-white/[0.02] to-transparent border-red-500/20">
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-4"
                style={{ scale: badgeScale }}
              >
                <Warning className="w-3.5 h-3.5 text-red-400" weight="fill" />
                <span className="text-red-400 text-[10px] font-bold uppercase tracking-[0.2em]">The Problem</span>
              </motion.div>
              <motion.h2 
                className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4"
                style={{ y: titleY }}
              >
                The web makes<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">simple things hard.</span>
              </motion.h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
                You just need to convert an image. But first: create an account, 
                verify your email, watch an ad, hit a paywall. Sound familiar?
              </p>
              {/* Inline popup badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  { text: "Sign up to continue", icon: Lock },
                  { text: "Watch ad", icon: Eye },
                ].map((item, i) => (
                  <div key={i} className="px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-medium flex items-center gap-1.5">
                    <item.icon className="w-3 h-3" weight="bold" />
                    {item.text}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
          
          {/* Stats card */}
          <div className="col-span-2 md:col-span-1">
            <GlassCard className="p-4 h-full bg-gradient-to-br from-red-500/5 to-transparent border-red-500/15 flex flex-col justify-center">
              <div className="text-2xl md:text-3xl font-black text-red-400 mb-1">73%</div>
              <div className="text-[10px] text-gray-500 leading-tight">abandon tools requiring signup</div>
            </GlassCard>
          </div>
          
          {/* Pain point - Ads */}
          <div className="col-span-2 md:col-span-1">
            <GlassCard className="p-4 h-full bg-gradient-to-br from-red-500/5 to-transparent border-red-500/15">
              <Eye className="w-5 h-5 text-red-400 mb-2" weight="duotone" />
              <div className="text-xs font-bold text-white mb-0.5">Ads Everywhere</div>
              <div className="text-[10px] text-gray-500">Watch 30 sec first</div>
            </GlassCard>
          </div>
          
          {/* Pain point - Paywalls */}
          <div className="col-span-2 md:col-span-1">
            <GlassCard className="p-4 h-full bg-gradient-to-br from-red-500/5 to-transparent border-red-500/15">
              <Lock className="w-5 h-5 text-red-400 mb-2" weight="duotone" />
              <div className="text-xs font-bold text-white mb-0.5">Paywalls</div>
              <div className="text-[10px] text-gray-500">"Premium" for basics</div>
            </GlassCard>
          </div>
          
          {/* Pain point - Privacy */}
          <div className="col-span-2 md:col-span-1">
            <GlassCard className="p-4 h-full bg-gradient-to-br from-red-500/5 to-transparent border-red-500/15">
              <CloudSlash className="w-5 h-5 text-red-400 mb-2" weight="duotone" />
              <div className="text-xs font-bold text-white mb-0.5">Data Harvesting</div>
              <div className="text-[10px] text-gray-500">Files uploaded to servers</div>
            </GlassCard>
          </div>
          
          {/* More popups visual */}
          <div className="col-span-2 md:col-span-1">
            <GlassCard className="p-3 h-full bg-red-950/20 border-red-500/20 flex flex-col justify-center gap-1.5">
              <div className="px-2 py-1 rounded bg-red-950/50 border border-red-500/20 text-red-300 text-[10px] flex items-center gap-1">
                <Warning className="w-2.5 h-2.5" weight="bold" />3 free uses left
              </div>
              <div className="px-2 py-1 rounded bg-red-950/50 border border-red-500/20 text-red-300 text-[10px] flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" weight="bold" />Premium feature
              </div>
            </GlassCard>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}

interface Chapter2Props {
  opacity: ReturnType<typeof useTransform>;
  y: ReturnType<typeof useTransform>;
  scale: ReturnType<typeof useTransform>;
  rotate: ReturnType<typeof useTransform>;
  blur: ReturnType<typeof useTransform>;
  badgeScale: ReturnType<typeof useTransform>;
  titleY: ReturnType<typeof useTransform>;
}

function Chapter2({ opacity, y, scale, rotate, blur, badgeScale, titleY }: Chapter2Props) {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center px-4 py-8"
      style={{ 
        opacity, 
        y, 
        scale,
        rotate,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-3 gap-3">
          
          {/* Main headline - full width */}
          <div className="col-span-3">
            <GlassCard className="p-6 md:p-8 bg-gradient-to-br from-accent-blue/8 via-white/[0.02] to-transparent border-accent-blue/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <motion.div 
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 mb-3"
                    style={{ scale: badgeScale }}
                  >
                    <Sparkle className="w-3.5 h-3.5 text-accent-blue" weight="fill" />
                    <span className="text-accent-blue text-[10px] font-bold uppercase tracking-[0.2em]">The Solution</span>
                  </motion.div>
                  <motion.h2 
                    className="text-2xl md:text-4xl font-black text-white leading-[1.1]"
                    style={{ y: titleY }}
                  >
                    So we built <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-blue-400">something better.</span>
                  </motion.h2>
                </div>
                {/* Before → After */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-500 text-xs">
                    <span className="line-through">Old way</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent-blue" weight="bold" />
                  <div className="px-3 py-1.5 rounded-lg bg-accent-blue/20 border border-accent-blue/40 text-accent-blue text-xs font-bold">
                    ToolHub
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
          
          {/* Step 1 */}
          <div className="col-span-1">
            <GlassCard className="p-4 h-full bg-gradient-to-br from-accent-blue/5 to-transparent border-accent-blue/15">
              <div className="w-8 h-8 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm font-bold mb-3">1</div>
              <div className="text-sm font-bold text-white mb-1">Open Tool</div>
              <div className="text-[10px] text-gray-500">Just visit the page. No signup, no login.</div>
            </GlassCard>
          </div>
          
          {/* Step 2 */}
          <div className="col-span-1">
            <GlassCard className="p-4 h-full bg-gradient-to-br from-accent-blue/5 to-transparent border-accent-blue/15">
              <div className="w-8 h-8 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm font-bold mb-3">2</div>
              <div className="text-sm font-bold text-white mb-1">Drop Files</div>
              <div className="text-[10px] text-gray-500">Drag & drop or browse. Simple as that.</div>
            </GlassCard>
          </div>
          
          {/* Step 3 */}
          <div className="col-span-1">
            <GlassCard className="p-4 h-full bg-gradient-to-br from-accent-blue/5 to-transparent border-accent-blue/15">
              <div className="w-8 h-8 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm font-bold mb-3">3</div>
              <div className="text-sm font-bold text-white mb-1">Get Results</div>
              <div className="text-[10px] text-gray-500">Instant processing, right on your device.</div>
            </GlassCard>
          </div>
          
          {/* Privacy highlight */}
          <div className="col-span-2">
            <GlassCard className="p-4 h-full bg-gradient-to-br from-accent-blue/8 to-transparent border-accent-blue/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-blue/20 text-accent-blue flex items-center justify-center flex-shrink-0">
                  <CloudSlash className="w-6 h-6" weight="duotone" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">Your files stay local</div>
                  <div className="text-xs text-gray-400">Nothing is ever uploaded to any server. True privacy, zero compromise.</div>
                </div>
              </div>
            </GlassCard>
          </div>
          
          {/* Stats + tagline */}
          <div className="col-span-1">
            <GlassCard className="p-4 h-full bg-white/[0.02] border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-2xl font-black text-accent-blue mb-0.5">0</div>
                <div className="text-[10px] text-gray-500">accounts needed</div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <Heart className="w-3 h-3 text-red-400" weight="fill" />
                <span className="text-[9px] text-gray-500 italic">Made with love</span>
              </div>
            </GlassCard>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}

interface Chapter3Props {
  opacity: ReturnType<typeof useTransform>;
  y: ReturnType<typeof useTransform>;
  scale: ReturnType<typeof useTransform>;
  blur: ReturnType<typeof useTransform>;
  titleScale: ReturnType<typeof useTransform>;
  f1Opacity: ReturnType<typeof useTransform>;
  f1Y: ReturnType<typeof useTransform>;
  f1Scale: ReturnType<typeof useTransform>;
  f2Opacity: ReturnType<typeof useTransform>;
  f2Y: ReturnType<typeof useTransform>;
  f2Scale: ReturnType<typeof useTransform>;
  f3Opacity: ReturnType<typeof useTransform>;
  f3Y: ReturnType<typeof useTransform>;
  f3Scale: ReturnType<typeof useTransform>;
  f4Opacity: ReturnType<typeof useTransform>;
  f4Y: ReturnType<typeof useTransform>;
  f4Scale: ReturnType<typeof useTransform>;
}

function Chapter3({
  opacity, y, scale, blur, titleScale,
  f1Opacity, f1Y, f1Scale,
  f2Opacity, f2Y, f2Scale,
  f3Opacity, f3Y, f3Scale,
  f4Opacity, f4Y, f4Scale,
}: Chapter3Props) {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center px-4 py-8"
      style={{ 
        opacity, 
        y,
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          
          {/* Main headline */}
          <div className="col-span-2">
            <GlassCard className="p-6 h-full bg-gradient-to-br from-accent-green/8 via-white/[0.02] to-transparent border-accent-green/20">
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/20 mb-3"
              >
                <Lightning className="w-3.5 h-3.5 text-accent-green" weight="fill" />
                <span className="text-accent-green text-[10px] font-bold uppercase tracking-[0.2em]">The Promise</span>
              </motion.div>
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-[1.1] mb-2"
                style={{ scale: titleScale }}
              >
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-emerald-400">ToolHub</span> Promise
              </motion.h2>
              <p className="text-xs md:text-sm text-gray-400">Tools that respect your time, privacy, and intelligence.</p>
            </GlassCard>
          </div>
          
          {/* Stats */}
          <div className="col-span-1">
            <GlassCard className="p-4 h-full bg-gradient-to-br from-accent-green/5 to-transparent border-accent-green/15 flex flex-col justify-center">
              <div className="text-3xl md:text-4xl font-black text-accent-green mb-1">10+</div>
              <div className="text-[10px] text-gray-500">tools & counting</div>
            </GlassCard>
          </div>
          
          {/* Feature 1: No Accounts */}
          <motion.div className="col-span-1" style={{ opacity: f1Opacity, y: f1Y, scale: f1Scale }}>
            <GlassCard className="p-4 h-full bg-gradient-to-br from-accent-green/5 to-transparent border-accent-green/15 hover:border-accent-green/30 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-accent-green/20 text-accent-green flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <EyeSlash className="w-4 h-4" weight="duotone" />
              </div>
              <div className="text-sm font-bold text-white mb-0.5">No Accounts</div>
              <div className="text-[10px] text-gray-500">Zero friction, zero tracking</div>
            </GlassCard>
          </motion.div>

          {/* Feature 2: Local Processing */}
          <motion.div className="col-span-1" style={{ opacity: f2Opacity, y: f2Y, scale: f2Scale }}>
            <GlassCard className="p-4 h-full bg-gradient-to-br from-accent-purple/5 to-transparent border-accent-purple/15 hover:border-accent-purple/30 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-accent-purple/20 text-accent-purple flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <CloudSlash className="w-4 h-4" weight="duotone" />
              </div>
              <div className="text-sm font-bold text-white mb-0.5">Local Only</div>
              <div className="text-[10px] text-gray-500">Files never leave your device</div>
            </GlassCard>
          </motion.div>

          {/* Feature 3: Lightning Fast */}
          <motion.div className="col-span-1" style={{ opacity: f3Opacity, y: f3Y, scale: f3Scale }}>
            <GlassCard className="p-4 h-full bg-gradient-to-br from-amber-500/5 to-transparent border-amber-500/15 hover:border-amber-500/30 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Lightning className="w-4 h-4" weight="duotone" />
              </div>
              <div className="text-sm font-bold text-white mb-0.5">Instant</div>
              <div className="text-[10px] text-gray-500">Results in milliseconds</div>
            </GlassCard>
          </motion.div>
          
          {/* Feature 4: Open Source */}
          <motion.div className="col-span-1" style={{ opacity: f4Opacity, y: f4Y, scale: f4Scale }}>
            <GlassCard className="p-4 h-full bg-gradient-to-br from-accent-blue/5 to-transparent border-accent-blue/15 hover:border-accent-blue/30 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-accent-blue/20 text-accent-blue flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Code className="w-4 h-4" weight="duotone" />
              </div>
              <div className="text-sm font-bold text-white mb-0.5">Open Source</div>
              <div className="text-[10px] text-gray-500">Fully transparent code</div>
            </GlassCard>
          </motion.div>
          
          {/* CTA */}
          <div className="col-span-2 md:col-span-1">
            <GlassCard className="p-4 h-full bg-gradient-to-br from-accent-green/10 to-transparent border-accent-green/25 flex items-center justify-center">
              <Link to="/hub" className="flex items-center gap-2 text-accent-green font-bold text-sm hover:gap-3 transition-all">
                <span>Explore Tools</span>
                <ArrowCircleRight className="w-5 h-5" weight="bold" />
              </Link>
            </GlassCard>
          </div>
          
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
    offset: ["start start", "end end"]
  });

  // Chapter 1 animations
  const chapter1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.30], [0, 1, 1, 0]);
  const chapter1Y = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.30], [100, 0, 0, -60]);
  const chapter1Scale = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.30], [0.92, 1, 1, 0.96]);
  const chapter1Rotate = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.30], [-2, 0, 0, 1]);
  const chapter1Blur = useTransform(scrollYProgress, [0, 0.06, 0.24, 0.30], [8, 0, 0, 4]);
  const ch1BadgeScale = useTransform(scrollYProgress, [0, 0.06, 0.08], [0.8, 1.1, 1]);
  const ch1TitleY = useTransform(scrollYProgress, [0, 0.08], [30, 0]);

  // Chapter 2 animations
  const chapter2Opacity = useTransform(scrollYProgress, [0.28, 0.38, 0.52, 0.62], [0, 1, 1, 0]);
  const chapter2Y = useTransform(scrollYProgress, [0.28, 0.38, 0.52, 0.62], [100, 0, 0, -60]);
  const chapter2Scale = useTransform(scrollYProgress, [0.28, 0.38, 0.52, 0.62], [0.92, 1, 1, 0.96]);
  const chapter2Rotate = useTransform(scrollYProgress, [0.28, 0.38, 0.52, 0.62], [2, 0, 0, -1]);
  const chapter2Blur = useTransform(scrollYProgress, [0.28, 0.36, 0.54, 0.62], [8, 0, 0, 4]);
  const ch2BadgeScale = useTransform(scrollYProgress, [0.28, 0.34, 0.36], [0.8, 1.1, 1]);
  const ch2TitleY = useTransform(scrollYProgress, [0.28, 0.38], [30, 0]);

  // Chapter 3 animations
  const chapter3Opacity = useTransform(scrollYProgress, [0.58, 0.68, 0.95, 1], [0, 1, 1, 0.9]);
  const chapter3Y = useTransform(scrollYProgress, [0.58, 0.68], [100, 0]);
  const chapter3Scale = useTransform(scrollYProgress, [0.58, 0.68], [0.92, 1]);
  const chapter3Blur = useTransform(scrollYProgress, [0.58, 0.66], [8, 0]);
  const ch3TitleScale = useTransform(scrollYProgress, [0.58, 0.68], [0.9, 1]);

  // Feature card animations
  const f1Opacity = useTransform(scrollYProgress, [0.66, 0.72], [0, 1]);
  const f1Y = useTransform(scrollYProgress, [0.66, 0.72], [50, 0]);
  const f1Scale = useTransform(scrollYProgress, [0.66, 0.72], [0.9, 1]);
  const f2Opacity = useTransform(scrollYProgress, [0.69, 0.75], [0, 1]);
  const f2Y = useTransform(scrollYProgress, [0.69, 0.75], [50, 0]);
  const f2Scale = useTransform(scrollYProgress, [0.69, 0.75], [0.9, 1]);
  const f3Opacity = useTransform(scrollYProgress, [0.72, 0.78], [0, 1]);
  const f3Y = useTransform(scrollYProgress, [0.72, 0.78], [50, 0]);
  const f3Scale = useTransform(scrollYProgress, [0.72, 0.78], [0.9, 1]);
  const f4Opacity = useTransform(scrollYProgress, [0.75, 0.81], [0, 1]);
  const f4Y = useTransform(scrollYProgress, [0.75, 0.81], [50, 0]);
  const f4Scale = useTransform(scrollYProgress, [0.75, 0.81], [0.9, 1]);

  // Background glow transitions
  const glow1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.32], [0, 0.7, 0.7, 0]);
  const glow2Opacity = useTransform(scrollYProgress, [0.26, 0.38, 0.52, 0.64], [0, 0.7, 0.7, 0]);
  const glow3Opacity = useTransform(scrollYProgress, [0.56, 0.68, 1], [0, 0.7, 0.5]);

  // Floating shapes animations
  const decoY1 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const decoY2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const decoY3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const decoY4 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const decoY5 = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const decoY6 = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const decoY7 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const decoY8 = useTransform(scrollYProgress, [0, 1], [0, -450]);
  const decoRotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const decoRotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const decoRotate3 = useTransform(scrollYProgress, [0, 1], [45, 135]);
  const decoScale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 0.8]);
  const decoScale2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 1]);
  const decoOpacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 0.4, 0.4, 0.15]);
  const decoOpacity2 = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.2, 0.5, 0.35, 0.1]);

  return (
    <section ref={containerRef} className="relative">
      <div className="h-[350vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          
          {/* Background glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
              style={{ 
                opacity: glow1Opacity,
                background: 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0) 60%)',
                filter: 'blur(80px)',
              }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
              style={{ 
                opacity: glow2Opacity,
                background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0) 60%)',
                filter: 'blur(80px)',
              }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
              style={{ 
                opacity: glow3Opacity,
                background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0) 60%)',
                filter: 'blur(80px)',
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
            f1Opacity={f1Opacity} f1Y={f1Y} f1Scale={f1Scale}
            f2Opacity={f2Opacity} f2Y={f2Y} f2Scale={f2Scale}
            f3Opacity={f3Opacity} f3Y={f3Y} f3Scale={f3Scale}
            f4Opacity={f4Opacity} f4Y={f4Y} f4Scale={f4Scale}
          />

        </div>
      </div>
    </section>
  );
}
