import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  FileImage,
  FileCode,
} from 'lucide-react';
import { cn, transitions } from '@/lib/utils';

export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  error?: string;
}

export interface FileUploadProps {
  accept?: string;
  maxSizeMb?: number;
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
  className?: string;
  helperText?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  maxSizeMb = 10,
  maxFiles = 5,
  onFilesSelected,
  className,
  helperText = 'SVG, PNG, JPG, PDF or GIF (max 10MB)',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const accepted: File[] = [];
    const newItems: FileItem[] = [];

    Array.from(incoming).forEach((file) => {
      if (fileList.length + newItems.length >= maxFiles) return;

      const sizeMb = file.size / (1024 * 1024);
      const isTooLarge = sizeMb > maxSizeMb;

      const item: FileItem = {
        id: Math.random().toString(36).substring(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: isTooLarge ? 0 : 100,
        error: isTooLarge ? `File exceeds ${maxSizeMb}MB` : undefined,
      };

      newItems.push(item);
      if (!isTooLarge) accepted.push(file);
    });

    setFileList((prev) => [...prev, ...newItems]);
    if (accepted.length > 0) onFilesSelected?.(accepted);
  };

  const removeFile = (id: string) => {
    setFileList((prev) => prev.filter((f) => f.id !== id));
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="w-5 h-5 text-sky-400" />;
    if (type.includes('code') || type.includes('javascript') || type.includes('json')) {
      return <FileCode className="w-5 h-5 text-amber-400" />;
    }
    return <FileText className="w-5 h-5 text-primary" />;
  };

  return (
    <div className={cn('space-y-4 w-full', className)}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={transitions.springGentle}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer text-center',
          isDragging
            ? 'border-primary bg-primary/10 shadow-glow'
            : 'border-border/80 hover:border-primary/60 bg-card/60 hover:bg-card/90'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <motion.div
          animate={isDragging ? { y: -8, scale: 1.15 } : { y: 0, scale: 1 }}
          transition={transitions.springBouncy}
          className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3 shadow-inner border border-primary/20"
        >
          <UploadCloud className="w-7 h-7" />
        </motion.div>

        <h3 className="font-bold text-sm text-foreground">
          Click to upload or drag &amp; drop
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{helperText}</p>
      </motion.div>

      {/* Uploaded File List */}
      <AnimatePresence>
        {fileList.length > 0 && (
          <div className="space-y-2">
            {fileList.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={transitions.springGentle}
                className="flex items-center justify-between p-3 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm shadow-xs"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-xl bg-muted/60 border border-border/50 shrink-0">
                    {getFileIcon(item.type)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold truncate text-foreground">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {formatBytes(item.size)}
                      {item.error && (
                        <span className="text-rose-500 font-bold ml-2">
                          • {item.error}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!item.error && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                  {item.error && (
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(item.id);
                    }}
                    className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
