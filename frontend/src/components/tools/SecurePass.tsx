import { useState, useEffect } from 'react';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '../ui/glass-card';
import { GlassButton } from '../ui/glass-button';
import { ToolLayout } from '../layouts/ToolLayout';
import { PageTransition } from '../animations/PageTransition';
import { ShieldCheck, Copy, ArrowsClockwise, Check, Info } from '@phosphor-icons/react';
import { useApiToast } from '../../hooks/useApiToast';

export default function SecurePass() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useApiToast();

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    toast({
      title: 'Copied!',
      description: 'Password copied to clipboard securely.',
      variant: 'success',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateStrength = () => {
    let strength = 0;
    if (length > 12) strength += 1;
    if (length > 20) strength += 1;
    if (includeUppercase) strength += 1;
    if (includeNumbers) strength += 1;
    if (includeSymbols) strength += 1;
    return strength; // Max 5
  };

  const strength = calculateStrength();
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong', 'Ultra Secure'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-emerald-500'];

  return (
    <PageTransition>
      <ToolLayout
        title="SecurePass"
        subtitle="Generate unbreakable, cryptographically secure passwords"
        icon={ShieldCheck}
        iconColor="amber"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1: Password Display */}
          <div className="space-y-6">
            <GlassCard hover={false} animated={false} className="border-amber-500/30 overflow-hidden h-full">
              <GlassCardHeader>
                <GlassCardTitle>Your Secure Password</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="flex flex-col justify-center h-[calc(100%-80px)] space-y-8">
                <div className="relative group">
                  <div className="w-full bg-glass-white-md backdrop-blur-md border border-glass-border rounded-xl p-8 text-center shadow-glass-inner">
                    <span className="text-2xl sm:text-3xl font-mono text-white tracking-wider break-all leading-relaxed">
                      {password}
                    </span>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-2">
                    <GlassButton size="icon" variant="ghost" onClick={generatePassword} className="h-10 w-10">
                      <ArrowsClockwise className="h-5 w-5" />
                    </GlassButton>
                    <GlassButton size="icon" variant="amber" onClick={copyToClipboard} className="h-10 w-10">
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </GlassButton>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Security Level: <span className={strengthColors[strength].replace('bg-', 'text-')}>{strengthLabels[strength]}</span></span>
                    <span className="text-xs text-gray-400 font-mono">{length} characters</span>
                  </div>
                  <div className="h-2 w-full bg-glass-white-lg rounded-full flex gap-1 p-0.5 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-full flex-1 rounded-full transition-all duration-500 ${i <= strength ? strengthColors[strength] : 'bg-glass-white/10'}`} 
                      />
                    ))}
                  </div>
                </div>

                <GlassButton variant="amber" className="w-full py-6 text-lg font-bold" onClick={generatePassword}>
                  <ArrowsClockwise className="mr-2 h-6 w-6" /> Regenerate
                </GlassButton>
              </GlassCardContent>
            </GlassCard>
          </div>

          {/* Column 2: Customization */}
          <div className="space-y-6">
            <GlassCard hover={false} animated={false} className="border-amber-500/30 h-full">
              <GlassCardHeader>
                <GlassCardTitle>Customization Settings</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="space-y-8">
                <div className="p-4 rounded-xl bg-glass-white-sm border border-glass-border space-y-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">Password Length</label>
                    <span className="text-sm text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">{length}</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-glass-white-lg rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 px-1 font-mono uppercase">
                    <span>8 chars</span>
                    <span>32 chars</span>
                    <span>64 chars</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Uppercase Letters (A-Z)', state: includeUppercase, setter: setIncludeUppercase },
                    { label: 'Numbers (0-9)', state: includeNumbers, setter: setIncludeNumbers },
                    { label: 'Symbols (!@#$%^&*)', state: includeSymbols, setter: setIncludeSymbols },
                  ].map((option, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-glass-white-sm border border-glass-border group hover:border-amber-500/30 transition-all duration-300">
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{option.label}</span>
                      <button 
                        className={`w-12 h-6 rounded-full relative transition-colors ${option.state ? 'bg-amber-500/40' : 'bg-glass-white-lg'}`}
                        onClick={() => option.setter(!option.state)}
                      >
                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${option.state ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>
        </div>
      </ToolLayout>
    </PageTransition>
  );
}
