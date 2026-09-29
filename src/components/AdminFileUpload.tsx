import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  Video,
  Image as ImageIcon,
  FileCode,
  File,
  X,
  Eye,
  Download,
  Plus,
  Link as LinkIcon,
  Check,
  AlertCircle,
  Play,
} from 'lucide-react';
import { AttachedFile } from '../types';

interface AdminFileUploadProps {
  files?: AttachedFile[];
  onChange: (files: AttachedFile[]) => void;
  title?: string;
  description?: string;
  maxFiles?: number;
  itemTypeLabel?: string; // 'Project' | 'Skill' | 'Experience'
}

export const AdminFileUpload: React.FC<AdminFileUploadProps> = ({
  files = [],
  onChange,
  title = 'Important Files & Media Attachments',
  description = 'Upload Images, Videos, Docs, and PDFs (Certificates, Deliverables, Specs, Demos)',
  maxFiles = 10,
  itemTypeLabel = 'Item',
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUrlInputOpen, setIsUrlInputOpen] = useState(false);
  const [urlForm, setUrlForm] = useState({
    name: '',
    url: '',
    type: 'pdf' as 'image' | 'video' | 'pdf' | 'doc',
    description: '',
  });
  const [previewFile, setPreviewFile] = useState<AttachedFile | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${Math.round(bytes / 1024)} KB`;
  };

  const detectFileType = (file: File): 'image' | 'video' | 'pdf' | 'doc' => {
    const mime = file.type.toLowerCase();
    const name = file.name.toLowerCase();

    if (mime.startsWith('image/') || /\.(png|jpe?g|webp|svg|gif|bmp|avif)$/.test(name)) {
      return 'image';
    }
    if (mime.startsWith('video/') || /\.(mp4|webm|mov|m4v|ogg|ogv)$/.test(name)) {
      return 'video';
    }
    if (mime === 'application/pdf' || name.endsWith('.pdf')) {
      return 'pdf';
    }
    // Docs, sheets, presentations, text, csv, sql
    return 'doc';
  };

  const handleProcessFiles = (rawFiles: FileList | File[]) => {
    setUploadError(null);
    const filesArray = Array.from(rawFiles);

    if (files.length + filesArray.length > maxFiles) {
      setUploadError(`Maximum ${maxFiles} files allowed. Some files were not added.`);
    }

    const availableSlots = Math.max(0, maxFiles - files.length);
    const filesToProcess = filesArray.slice(0, availableSlots);

    filesToProcess.forEach((file) => {
      // Check file size (e.g. limit to 25MB for client storage)
      if (file.size > 25 * 1024 * 1024) {
        setUploadError(`File "${file.name}" is larger than 25MB. For large media, please use the external URL link option.`);
        return;
      }

      const fileType = detectFileType(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const resultUrl = e.target?.result as string;
        const newFile: AttachedFile = {
          id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          type: fileType,
          size: formatFileSize(file.size),
          url: resultUrl,
          description: '',
          uploaded_at: new Date().toISOString(),
        };

        onChange([...(files || []), newFile]);
      };

      reader.onerror = () => {
        setUploadError(`Could not read file "${file.name}". Please try another file.`);
      };

      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFiles(e.dataTransfer.files);
    }
  };

  const handleAddExternalUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlForm.url.trim() || !urlForm.name.trim()) return;

    const newFile: AttachedFile = {
      id: `url-file-${Date.now()}`,
      name: urlForm.name.trim(),
      type: urlForm.type,
      size: 'External Link',
      url: urlForm.url.trim(),
      description: urlForm.description.trim() || undefined,
      uploaded_at: new Date().toISOString(),
    };

    onChange([...(files || []), newFile]);
    setUrlForm({
      name: '',
      url: '',
      type: 'pdf',
      description: '',
    });
    setIsUrlInputOpen(false);
  };

  const handleRemoveFile = (fileId?: string, index?: number) => {
    if (fileId) {
      onChange(files.filter((f) => f.id !== fileId));
    } else if (index !== undefined) {
      onChange(files.filter((_, i) => i !== index));
    }
    if (previewFile && ((previewFile.id && previewFile.id === fileId) || (previewFile.name === files[index ?? -1]?.name))) {
      setPreviewFile(null);
    }
  };

  const handleDownload = (file: AttachedFile) => {
    if (file.url.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = file.url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.open(file.url, '_blank', 'noopener,noreferrer');
    }
  };

  const getTypeBadgeStyle = (type: AttachedFile['type']) => {
    switch (type) {
      case 'image':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'video':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'pdf':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30';
      case 'doc':
      default:
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
    }
  };

  const getTypeIcon = (type: AttachedFile['type']) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-4 h-4 text-blue-500" />;
      case 'video':
        return <Video className="w-4 h-4 text-purple-500" />;
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'doc':
      default:
        return <FileCode className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#D9D9D5] dark:border-[#262624]">
        <div>
          <label className="text-xs font-mono uppercase font-bold tracking-wider text-[#111111] dark:text-[#EBEBE8] flex items-center gap-2">
            <span>{title}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#111111]/5 dark:bg-white/10 text-[#737373] dark:text-[#9E9E9A]">
              {files.length}/{maxFiles}
            </span>
          </label>
          <p className="text-[11px] font-mono text-[#737373] dark:text-[#9E9E9A] mt-0.5">
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsUrlInputOpen(!isUrlInputOpen)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border border-[#D9D9D5] dark:border-[#262624] text-[#111111] dark:text-[#EBEBE8] hover:border-[#111111] dark:hover:border-white hover:text-[#111111] dark:hover:text-white transition-colors self-start sm:self-auto rounded-lg"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>{isUrlInputOpen ? 'Cancel URL' : 'Link via URL'}</span>
        </button>
      </div>

      {/* External URL Form Dropdown */}
      {isUrlInputOpen && (
        <div className="p-4 bg-[#F5F5F3] dark:bg-[#1A1A18] border border-[#D9D9D5] dark:border-[#262624] space-y-3 rounded-lg">
          <div className="text-xs font-mono font-bold uppercase text-[#111111] dark:text-[#EBEBE8] flex items-center gap-2">
            <LinkIcon className="w-3.5 h-3.5 text-[#111111] dark:text-white" />
            <span>Add External File / Hosted Resource Link</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#737373] dark:text-[#9E9E9A] mb-1">
                File / Resource Title *
              </label>
              <input
                type="text"
                required
                value={urlForm.name}
                onChange={(e) => setUrlForm({ ...urlForm, name: e.target.value })}
                placeholder="e.g. Architecture_Overview.pdf or Demo Video"
                className="w-full px-2.5 py-1.5 bg-white dark:bg-[#111111] border border-[#D9D9D5] dark:border-[#262624] text-xs text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#737373] dark:text-[#9E9E9A] mb-1">
                File Type
              </label>
              <select
                value={urlForm.type}
                onChange={(e) => setUrlForm({ ...urlForm, type: e.target.value as any })}
                className="w-full px-2.5 py-1.5 bg-white dark:bg-[#111111] border border-[#D9D9D5] dark:border-[#262624] text-xs text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none"
              >
                <option value="pdf">PDF Document (.pdf)</option>
                <option value="image">Image (.png, .jpg, .webp)</option>
                <option value="video">Video Walkthrough (.mp4, YouTube, Vimeo)</option>
                <option value="doc">Document (.docx, .xlsx, .csv, Google Doc)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#737373] dark:text-[#9E9E9A] mb-1">
                URL / Web Address *
              </label>
              <input
                type="url"
                required
                value={urlForm.url}
                onChange={(e) => setUrlForm({ ...urlForm, url: e.target.value })}
                placeholder="https://drive.google.com/... or https://..."
                className="w-full px-2.5 py-1.5 bg-white dark:bg-[#111111] border border-[#D9D9D5] dark:border-[#262624] text-xs text-[#111111] dark:text-[#EBEBE8] focus:border-[#111111] dark:focus:border-white focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsUrlInputOpen(false)}
              className="px-3 py-1 text-xs font-mono border border-[#D9D9D5] dark:border-[#262624] rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddExternalUrl}
              className="px-3.5 py-1 text-xs font-mono font-bold uppercase bg-[#111111] dark:bg-[#EBEBE8] text-white dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-white transition-all rounded-lg"
            >
              Attach Link
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.png,.jpg,.jpeg,.webp,.svg,.gif,.mp4,.webm,.mov,.docx,.doc,.xlsx,.xls,.csv,.txt,.ppt,.pptx"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-6 border-2 border-dashed transition-all cursor-pointer rounded-xl text-center ${
          isDragging
            ? 'border-[#111111] dark:border-white bg-[#111111]/5 dark:bg-white/5 scale-[0.99]'
            : 'border-[#D9D9D5] dark:border-[#262624] hover:border-[#111111] dark:hover:border-white bg-[#F9F9F8] dark:bg-[#161616]'
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-sm">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div className="p-2.5 bg-purple-500/10 text-purple-500 rounded-sm">
            <Video className="w-4 h-4" />
          </div>
          <div className="p-2.5 bg-red-500/10 text-red-500 rounded-sm">
            <FileText className="w-4 h-4" />
          </div>
          <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-sm">
            <FileCode className="w-4 h-4" />
          </div>
        </div>

        <div className="text-xs font-mono font-bold uppercase text-[#111111] dark:text-[#EBEBE8] mb-1">
          Click to browse or drop important files here
        </div>
        <p className="text-[11px] font-mono text-[#737373] dark:text-[#9E9E9A]">
          Supports <strong>Images</strong> (PNG, JPG, WebP), <strong>Videos</strong> (MP4, WebM), <strong>Docs</strong> (DOCX, Excel, CSV), and <strong>PDFs</strong>
        </p>
      </div>

      {/* Error alert */}
      {uploadError && (
        <div className="p-2.5 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button onClick={() => setUploadError(null)} className="hover:text-red-700">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Uploaded Files Grid / List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase text-[#737373] dark:text-[#9E9E9A]">
            Attached Files for this {itemTypeLabel} ({files.length}):
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {files.map((file, idx) => {
              const fileKey = file.id || `file-${file.name || 'item'}-${idx}`;
              return (
                <div
                  key={fileKey}
                  className="p-3 bg-white dark:bg-[#141412] border border-[#D9D9D5] dark:border-[#262624] hover:border-[#111111] dark:hover:border-white transition-colors flex items-center justify-between gap-3 group"
                >
                  {/* File Thumbnail or Icon */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 shrink-0 bg-[#F5F5F3] dark:bg-[#1A1A18] border border-[#D9D9D5] dark:border-[#262624] flex items-center justify-center overflow-hidden rounded-xs">
                      {file.type === 'image' && file.url.startsWith('data:') ? (
                        <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                      ) : file.type === 'video' ? (
                        <Video className="w-5 h-5 text-purple-500" />
                      ) : file.type === 'pdf' ? (
                        <FileText className="w-5 h-5 text-red-500" />
                      ) : (
                        <FileCode className="w-5 h-5 text-emerald-500" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded-xs border font-bold ${getTypeBadgeStyle(
                            file.type
                          )}`}
                        >
                          {file.type}
                        </span>
                        <span className="text-[10px] font-mono text-[#737373] dark:text-[#9E9E9A]">
                          {file.size}
                        </span>
                      </div>
                      <div
                        title={file.name}
                        className="text-xs font-mono font-medium text-[#111111] dark:text-[#EBEBE8] truncate max-w-[180px] sm:max-w-[140px]"
                      >
                        {file.name}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Preview, Download, Delete */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setPreviewFile(file)}
                      title="Preview File"
                      className="p-1.5 text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-white transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(file)}
                      title="Download File"
                      className="p-1.5 text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-white transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.id, idx)}
                      title="Remove Attachment"
                      className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white dark:bg-[#141412] border border-[#D9D9D5] dark:border-[#262624] p-5 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9D9D5] dark:border-[#262624] mb-4">
              <div className="flex items-center gap-2">
                {getTypeIcon(previewFile.type)}
                <div>
                  <h4 className="text-sm font-bold font-mono text-[#111111] dark:text-[#EBEBE8] truncate max-w-md">
                    {previewFile.name}
                  </h4>
                  <div className="text-[10px] font-mono text-[#737373] dark:text-[#9E9E9A]">
                    {previewFile.type.toUpperCase()} · {previewFile.size}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownload(previewFile)}
                  className="px-2.5 py-1 text-xs font-mono border border-[#D9D9D5] dark:border-[#262624] hover:bg-[#F5F5F3] dark:hover:bg-[#1A1A18] flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewFile(null)}
                  className="p-1 text-[#737373] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 flex items-center justify-center bg-[#F9F9F8] dark:bg-[#0D0D0D] p-4 border border-[#D9D9D5] dark:border-[#262624]">
              {previewFile.type === 'image' && (
                <img
                  src={previewFile.url}
                  alt={previewFile.name}
                  className="max-h-[60vh] max-w-full object-contain"
                />
              )}

              {previewFile.type === 'video' && (
                <div className="w-full max-w-xl">
                  {previewFile.url.startsWith('data:') || previewFile.url.endsWith('.mp4') || previewFile.url.endsWith('.webm') ? (
                    <video controls className="w-full max-h-[60vh] bg-black">
                      <source src={previewFile.url} />
                      Your browser does not support video playback.
                    </video>
                  ) : (
                    <div className="text-center p-8 space-y-3">
                      <Video className="w-12 h-12 text-[#111111] dark:text-white mx-auto" />
                      <p className="text-xs font-mono text-[#737373] dark:text-[#9E9E9A]">
                        External Video Source:
                      </p>
                      <a
                        href={previewFile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-mono font-bold uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all rounded-none"
                      >
                        Open External Video Stream
                      </a>
                    </div>
                  )}
                </div>
              )}

              {previewFile.type === 'pdf' && (
                <div className="text-center p-8 space-y-4 max-w-md">
                  <div className="w-14 h-14 mx-auto rounded-full bg-neutral-100 dark:bg-neutral-800 border border-[#D9D9D5] dark:border-[#333] flex items-center justify-center text-[#111111] dark:text-white">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm font-mono text-[#111111] dark:text-[#EBEBE8] mb-1">
                      {previewFile.name}
                    </h5>
                    <p className="text-xs font-mono text-[#737373] dark:text-[#9E9E9A]">
                      PDF Document ({previewFile.size})
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleDownload(previewFile)}
                      className="px-4 py-2 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-mono font-bold uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all rounded-lg shadow-xs"
                    >
                      Download &amp; Open PDF
                    </button>
                  </div>
                </div>
              )}

              {previewFile.type === 'doc' && (
                <div className="text-center p-8 space-y-4 max-w-md">
                  <div className="w-14 h-14 mx-auto rounded-full bg-neutral-100 dark:bg-neutral-800 border border-[#D9D9D5] dark:border-[#333] flex items-center justify-center text-[#111111] dark:text-white">
                    <FileCode className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm font-mono text-[#111111] dark:text-[#EBEBE8] mb-1">
                      {previewFile.name}
                    </h5>
                    <p className="text-xs font-mono text-[#737373] dark:text-[#9E9E9A]">
                      Project Document / Specification Data ({previewFile.size})
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleDownload(previewFile)}
                      className="px-4 py-2 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-mono font-bold uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all rounded-lg shadow-xs"
                    >
                      Download Document
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
