
'use client';

import * as mammoth from 'mammoth';
import { UploadCloud } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FileDropzoneProps {
  onTextExtracted: (text: string) => void;
}

export function FileDropzone({ onTextExtracted }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx'))) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer instanceof ArrayBuffer) {
          try {
            const result = await mammoth.extractRawText({ arrayBuffer });
            onTextExtracted(result.value);
            toast({
                title: "Success",
                description: "Resume text extracted from file.",
            });
          } catch (error) {
            console.error('Error parsing DOCX file:', error);
            toast({
                variant: 'destructive',
                title: "Error",
                description: "Could not parse the DOCX file. Please ensure it's a valid file.",
            });
          }
        }
      };
      reader.onerror = () => {
        toast({
            variant: 'destructive',
            title: "Error",
            description: "Failed to read the file.",
        });
      };
      reader.readAsArrayBuffer(file);
    } else {
        toast({
            variant: 'destructive',
            title: "Invalid File Type",
            description: "Please upload a .docx file.",
        });
    }
  }, [onTextExtracted, toast]);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300",
        isDragging ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-muted'
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleChange}
      />
      <UploadCloud className={cn("h-10 w-10 mb-3", isDragging ? 'text-primary' : 'text-muted-foreground')} />
      <p className="font-semibold text-foreground">
        <span className="text-primary">Click to upload</span> or drag and drop
      </p>
      <p className="text-sm text-muted-foreground">
        DOC or DOCX file
      </p>
    </div>
  );
}
