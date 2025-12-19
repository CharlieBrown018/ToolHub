import { useState } from 'react';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '../ui/glass-card';
import { GlassButton } from '../ui/glass-button';
import { ToolLayout } from '../layouts/ToolLayout';
import { PageTransition } from '../animations/PageTransition';
import { ArrowsInSimple, Upload, Trash, ArrowsClockwise, FileArrowDown, ChartLineUp } from '@phosphor-icons/react';
import { useApiToast } from '../../hooks/useApiToast';

interface CompressedFile {
  id: string;
  name: string;
  originalSize: number;
  compressedSize?: number;
  status: 'pending' | 'processing' | 'success' | 'error';
  type: 'image' | 'pdf';
}

export default function ShrinkIt() {
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState(60);
  const { toast } = useApiToast();

  const addFiles = (newFiles: File[]) => {
    const items: CompressedFile[] = newFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      originalSize: file.size,
      status: 'pending',
      type: file.type.includes('pdf') ? 'pdf' : 'image',
    }));
    setFiles(prev => [...prev, ...items]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleCompress = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    toast({
      title: 'Compression Started',
      description: 'Optimizing your files...',
    });

    for (const file of files) {
      if (file.status === 'success') continue;
      
      setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: 'processing' } : f));
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate reduction based on quality (lower quality = smaller size)
      const qualityFactor = compressionLevel / 100;
      const reduction = (1 - qualityFactor) * (0.7 + Math.random() * 0.2);
      const newSize = Math.floor(file.originalSize * (1 - reduction));
      
      setFiles(prev => prev.map(f => f.id === file.id ? { 
        ...f, 
        status: 'success', 
        compressedSize: newSize 
      } : f));
    }

    setIsProcessing(false);
    toast({
      title: 'Done!',
      description: 'Files shrunk successfully!',
      variant: 'success',
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalSaved = files.reduce((acc, f) => {
    if (f.status === 'success' && f.compressedSize) {
      return acc + (f.originalSize - f.compressedSize);
    }
    return acc;
  }, 0);

  return (
    <PageTransition>
      <ToolLayout
        title="ShrinkIt"
        subtitle="Professional file compression for images and PDFs"
        icon={ArrowsInSimple}
        iconColor="teal"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <GlassCard hover={false} animated={false} className="border-teal-500/30 h-full">
              <GlassCardHeader>
                <GlassCardTitle>Upload Files</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div
                  className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center hover:border-teal-500/50 transition-colors cursor-pointer bg-glass-white-md backdrop-blur-md"
                  onClick={() => document.getElementById('shrink-upload')?.click()}
                >
                  <input
                    id="shrink-upload"
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => e.target.files && addFiles(Array.from(e.target.files))}
                  />
                  <Upload className="h-12 w-12 mx-auto text-teal-400 mb-4" weight="duotone" />
                  <p className="text-gray-300 mb-2">Drop images or PDFs here</p>
                  <p className="text-xs text-gray-500">Maximum file size: 50MB</p>
                </div>

                {files.length > 0 && (
                  <div className="mt-8 space-y-4">
                    {files.map((file) => (
                      <div key={file.id} className="p-4 rounded-xl bg-glass-white-md border border-glass-border flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${file.type === 'pdf' ? 'bg-red-500/20 text-red-400' : 'bg-teal-500/20 text-teal-400'}`}>
                            <FileArrowDown className="h-6 w-6" weight="duotone" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200 truncate max-w-[200px]">{file.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500 line-through">{formatSize(file.originalSize)}</span>
                              {file.compressedSize && (
                                <span className="text-xs text-teal-400 font-bold">{formatSize(file.compressedSize)}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {file.status === 'processing' && (
                            <ArrowsClockwise className="h-5 w-5 text-teal-400 animate-spin" />
                          )}
                          {file.status === 'success' && (
                            <div className="text-right">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-400 font-bold">
                                -{Math.round((1 - (file.compressedSize! / file.originalSize)) * 100)}%
                              </span>
                            </div>
                          )}
                          <button 
                            onClick={() => removeFile(file.id)}
                            className="p-1 hover:bg-red-500/20 rounded text-gray-500 hover:text-red-400 transition-colors"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCardContent>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard hover={false} animated={false} className="border-teal-500/30 h-full flex flex-col">
              <GlassCardHeader>
                <GlassCardTitle>Compression Settings</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="space-y-8 flex-1 flex flex-col justify-center">
                <div className="p-6 rounded-xl bg-glass-white-sm border border-glass-border">
                  <div className="flex justify-between mb-4">
                    <label className="text-sm font-medium text-gray-300">Target Quality</label>
                    <span className="text-sm text-teal-400 font-bold px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">{compressionLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="90"
                    value={compressionLevel}
                    onChange={(e) => setCompressionLevel(parseInt(e.target.value))}
                    className="w-full h-2 bg-glass-white-lg rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-2 px-1 font-mono uppercase">
                    <span>Smallest Size</span>
                    <span>Best Quality</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-xl bg-glass-white-md backdrop-blur-md border border-glass-border text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Total Saved</p>
                    <p className="text-2xl font-bold text-teal-400">{formatSize(totalSaved)}</p>
                  </div>
                  <div className="p-6 rounded-xl bg-glass-white-md backdrop-blur-md border border-glass-border text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Files</p>
                    <p className="text-2xl font-bold text-white">{files.length}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <GlassButton
                    onClick={handleCompress}
                    disabled={isProcessing || files.length === 0}
                    variant="teal"
                    className="w-full py-8 text-xl font-bold"
                  >
                    {isProcessing ? (
                      <ArrowsClockwise className="h-6 w-6 animate-spin mr-2" />
                    ) : (
                      <ArrowsInSimple className="h-6 w-6 mr-2" />
                    )}
                    {isProcessing ? 'Shrinking...' : 'Start Compression'}
                  </GlassButton>
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>
        </div>
      </ToolLayout>
    </PageTransition>
  );
}
