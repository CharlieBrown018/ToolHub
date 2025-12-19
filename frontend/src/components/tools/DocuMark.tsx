import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { PageTransition } from '../animations/PageTransition';
import { FileUpload } from './documark/FileUpload';
import { MarkdownEditor } from './documark/MarkdownEditor';
import { FileText } from '@phosphor-icons/react';

function DocuMark() {
  const [mdContent, setMdContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  return (
    <PageTransition>
      <ToolLayout
        title="DocuMark"
        subtitle="Convert Markdown files to beautifully formatted PDF documents"
        icon={FileText}
        iconColor="green"
      >
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
      </ToolLayout>
    </PageTransition>
  );
}

export default DocuMark;
