import { useState } from 'react';
import { Header } from '../ui/header';
import { FileUpload } from './documark/FileUpload';
import { MarkdownEditor } from './documark/MarkdownEditor';

function DocuMark() {
  const [mdContent, setMdContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="DocuMark"
        subtitle="Convert Markdown files to beautifully formatted PDF documents"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FileUpload
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
            isConverting={isConverting}
            onConvertingChange={setIsConverting}
          />

          <MarkdownEditor
            content={mdContent}
            onContentChange={setMdContent}
            isConverting={isConverting}
            onConvertingChange={setIsConverting}
          />
        </div>
      </div>
    </div>
  );
}

export default DocuMark;
