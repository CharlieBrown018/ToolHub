import { useState } from 'react';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '../ui/glass-card';
import { GlassButton } from '../ui/glass-button';
import { ToolLayout } from '../layouts/ToolLayout';
import { PageTransition } from '../animations/PageTransition';
import { Columns, ArrowsLeftRight, Trash, FileText, Code } from '@phosphor-icons/react';
import { useApiToast } from '../../hooks/useApiToast';

export default function DiffMaster() {
  const [leftContent, setLeftContent] = useState('');
  const [rightContent, setRightContent] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [diffResult, setDiffResult] = useState<{ type: 'added' | 'removed' | 'equal'; value: string }[] | null>(null);
  const { toast } = useApiToast();

  const handleCompare = async () => {
    if (!leftContent.trim() || !rightContent.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide content in both panels.',
        variant: 'destructive',
      });
      return;
    }

    setIsComparing(true);
    
    // UI Mock: Simulate diff calculation
    toast({
      title: 'Comparing...',
      description: 'Analyzing differences between the two versions.',
    });

    await new Promise(resolve => setTimeout(resolve, 800));

    // Simple word-based diff mock
    const leftWords = leftContent.split(/\s+/);
    const rightWords = rightContent.split(/\s+/);
    const mockDiff: { type: 'added' | 'removed' | 'equal'; value: string }[] = [];
    
    // Extremely simplified mock logic
    const maxLength = Math.max(leftWords.length, rightWords.length);
    for (let i = 0; i < maxLength; i++) {
      if (leftWords[i] === rightWords[i]) {
        mockDiff.push({ type: 'equal', value: leftWords[i] + ' ' });
      } else {
        if (leftWords[i]) mockDiff.push({ type: 'removed', value: leftWords[i] + ' ' });
        if (rightWords[i]) mockDiff.push({ type: 'added', value: rightWords[i] + ' ' });
      }
    }

    setDiffResult(mockDiff);
    setIsComparing(false);
  };

  const clearAll = () => {
    setLeftContent('');
    setRightContent('');
    setDiffResult(null);
  };

  const swapContent = () => {
    const temp = leftContent;
    setLeftContent(rightContent);
    setRightContent(temp);
    if (diffResult) handleCompare();
  };

  return (
    <PageTransition>
      <ToolLayout
        title="DiffMaster"
        subtitle="Analyze and compare text or code side-by-side with ease"
        icon={Columns}
        iconColor="red"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard hover={false} animated={false} className="border-red-500/30 h-full">
              <GlassCardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-red-400" />
                  <GlassCardTitle className="text-sm font-bold">Version A</GlassCardTitle>
                </div>
                <div className="flex gap-2">
                  <GlassButton variant="ghost" size="sm" onClick={() => setLeftContent('')} className="h-8 px-2 text-[10px] uppercase font-bold">
                    Clear
                  </GlassButton>
                </div>
              </GlassCardHeader>
              <GlassCardContent>
                <textarea
                  value={leftContent}
                  onChange={(e) => setLeftContent(e.target.value)}
                  placeholder="Paste original content here..."
                  className="w-full h-[300px] lg:h-[450px] bg-glass-white-md backdrop-blur-md border border-glass-border rounded-lg p-4 text-sm font-mono text-gray-100 focus:outline-none focus:ring-1 focus:ring-red-500/50 resize-none custom-scrollbar"
                />
              </GlassCardContent>
            </GlassCard>

            <GlassCard hover={false} animated={false} className="border-red-500/30 h-full">
              <GlassCardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-green-400" />
                  <GlassCardTitle className="text-sm font-bold">Version B</GlassCardTitle>
                </div>
                <div className="flex gap-2">
                  <GlassButton variant="ghost" size="sm" onClick={() => setRightContent('')} className="h-8 px-2 text-[10px] uppercase font-bold">
                    Clear
                  </GlassButton>
                </div>
              </GlassCardHeader>
              <GlassCardContent>
                <textarea
                  value={rightContent}
                  onChange={(e) => setRightContent(e.target.value)}
                  placeholder="Paste modified content here..."
                  className="w-full h-[300px] lg:h-[450px] bg-glass-white-md backdrop-blur-md border border-glass-border rounded-lg p-4 text-sm font-mono text-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500/50 resize-none custom-scrollbar"
                />
              </GlassCardContent>
            </GlassCard>
          </div>

          <GlassCard hover={false} animated={false} className="border-red-500/30">
            <GlassCardContent className="py-4">
              <div className="flex gap-4">
                <GlassButton variant="red" className="flex-1 py-6 text-lg font-bold" onClick={handleCompare} disabled={isComparing}>
                  {isComparing ? 'Comparing...' : 'Compare Versions'}
                </GlassButton>
                <GlassButton variant="outline" className="px-8" onClick={swapContent}>
                  <ArrowsLeftRight className="h-5 w-5" />
                </GlassButton>
              </div>
            </GlassCardContent>
          </GlassCard>

          {diffResult && (
            <GlassCard hover={false} animated={true} className="border-red-500/30 overflow-hidden">
              <GlassCardHeader className="flex justify-between items-center">
                <GlassCardTitle>Comparison Result</GlassCardTitle>
                <GlassButton variant="ghost" size="sm" onClick={() => setDiffResult(null)} className="h-8 px-2 text-[10px] uppercase font-bold text-red-400">
                  Close
                </GlassButton>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="p-6 rounded-lg bg-bg-primary/50 border border-glass-border font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-[400px] overflow-y-auto custom-scrollbar">
                  {diffResult.map((part, i) => (
                    <span
                      key={i}
                      className={
                        part.type === 'added' ? 'bg-green-500/20 text-green-400 px-0.5 rounded' :
                        part.type === 'removed' ? 'bg-red-500/20 text-red-400 px-0.5 rounded line-through' :
                        'text-gray-400'
                      }
                    >
                      {part.value}
                    </span>
                  ))}
                </div>
              </GlassCardContent>
            </GlassCard>
          )}
        </div>
      </ToolLayout>
    </PageTransition>
  );
}
