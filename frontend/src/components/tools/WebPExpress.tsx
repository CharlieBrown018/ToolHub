import { useState } from 'react';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '../ui/glass-card';
import { GlassButton } from '../ui/glass-button';
import { ToolLayout } from '../layouts/ToolLayout';
import { PageTransition } from '../animations/PageTransition';
import { Lightning, Upload, Image, FileText, Trash, ArrowsClockwise } from '@phosphor-icons/react';
import { useApiToast } from '../../hooks/useApiToast';

interface FileItem {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'processing' | 'success' | 'error';
  progress: number;
}

export default function WebPExpress() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState(80);
  const { toast } = useApiToast();

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    addFiles(droppedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    const fileItems: FileItem[] = newFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
      progress: 0,
    }));
    setFiles(prev => [...prev, ...fileItems]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      const removed = prev.find(f => f.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const clearAll = () => {
    files.forEach(f => URL.revokeObjectURL(f.preview));
    setFiles([]);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    // UI Mock: Simulate processing
    toast({
      title: 'Conversion Started',
      description: `Converting ${files.length} images to WebP...`,
    });

    for (let i = 0; i < files.length; i++) {
      const fileId = files[i].id;
      setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'processing', progress: 0 } : f));
      
      // Simulate progress
      for (let p = 0; p <= 100; p += 20) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, progress: p } : f));
      }
      
      setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'success', progress: 100 } : f));
    }

    setIsProcessing(false);
    toast({
      title: 'Success',
      description: 'All images converted to WebP successfully!',
      variant: 'success',
    });
  };

  return (
    <PageTransition>
      <ToolLayout
        title="WebP Express"
        subtitle="Convert images to high-performance WebP format instantly"
        icon={Lightning}
        iconColor="indigo"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <GlassCard hover={false} animated={false} className="border-indigo-500/30 h-full">
              <GlassCardHeader>
                <GlassCardTitle>Upload Images</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div
                  onDrop={onDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center hover:border-indigo-500/50 transition-colors cursor-pointer bg-glass-white-md backdrop-blur-md"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={(e) => e.target.files && addFiles(Array.from(e.target.files))}
                  />
                  <Upload className="h-12 w-12 mx-auto text-indigo-400 mb-4" weight="duotone" />
                  <p className="text-gray-300 mb-2">Drag and drop images here, or click to browse</p>
                  <p className="text-xs text-gray-500">Supports PNG, JPG, JPEG</p>
                </div>

                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center px-2">
                      <h3 className="text-sm font-medium text-gray-300">{files.length} files selected</h3>
                      <button onClick={clearAll} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                        <Trash className="h-3 w-3" /> Clear all
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {files.map((file) => (
                        <div key={file.id} className="flex items-center gap-3 p-2 rounded-lg bg-glass-white-md border border-glass-border group">
                          <img src={file.preview} className="h-10 w-10 rounded object-cover" alt="preview" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-200 truncate">{file.file.name}</p>
                            <p className="text-xs text-gray-500">{(file.file.size / 1024).toFixed(1)} KB</p>
                          </div>
                          {file.status === 'processing' && (
                            <div className="w-24 px-2">
                              <div className="h-1 w-full bg-glass-white-lg rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${file.progress}%` }} />
                              </div>
                            </div>
                          )}
                          <button 
                            onClick={() => removeFile(file.id)}
                            className="p-1 hover:bg-red-500/20 rounded text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </GlassCardContent>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard hover={false} animated={false} className="border-indigo-500/30 h-full">
              <GlassCardHeader>
                <GlassCardTitle>Settings</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="space-y-6 flex flex-col justify-center h-[calc(100%-80px)]">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-gray-300">Quality</label>
                    <span className="text-sm text-indigo-400 font-bold">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-glass-white-lg rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <p className="text-[10px] text-gray-500 mt-2">Higher quality means larger file size.</p>
                </div>

                <div className="pt-8">
                  <GlassButton
                    onClick={handleConvert}
                    disabled={isProcessing || files.length === 0}
                    variant="indigo"
                    className="w-full py-8 text-xl font-bold"
                  >
                    {isProcessing ? (
                      <ArrowsClockwise className="h-6 w-6 animate-spin mr-2" />
                    ) : (
                      <Lightning className="h-6 w-6 mr-2" weight="fill" />
                    )}
                    {isProcessing ? 'Processing...' : 'Convert to WebP'}
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
