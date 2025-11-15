'use client';

import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface DocumentUploadStepProps {
  files: any;
  onChange: (field: string, value: any) => void;
}

export function DocumentUploadStep({ files, onChange }: DocumentUploadStepProps) {
  const [dragOverField, setDragOverField] = useState<string | null>(null);

  const handleFileSelect = (field: string, fileList: FileList | null, multiple: boolean = false) => {
    if (!fileList) return;

    const maxSize = 2 * 1024 * 1024; // 2MB
    const newFiles = Array.from(fileList).filter(file => {
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 2MB.`);
        return false;
      }
      return true;
    });

    if (multiple) {
      onChange(field, [...(files[field] || []), ...newFiles]);
    } else if (newFiles.length > 0) {
      onChange(field, newFiles[0]);
    }
  };

  const removeFile = (field: string, index?: number) => {
    if (Array.isArray(files[field])) {
      onChange(field, files[field].filter((_: any, i: number) => i !== index));
    } else {
      onChange(field, null);
    }
  };

  const handleDrop = (e: React.DragEvent, field: string, multiple: boolean = false) => {
    e.preventDefault();
    setDragOverField(null);
    handleFileSelect(field, e.dataTransfer.files, multiple);
  };

  const FileInput = ({ label, field, multiple = false, accept = '.pdf,.jpg,.jpeg,.png' }: any) => {
    const fileValue = files[field];
    const fileArray = Array.isArray(fileValue) ? fileValue : (fileValue ? [fileValue] : []);

    return (
      <div className="space-y-3">
        <Label>{label}</Label>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOverField(field);
          }}
          onDragLeave={() => setDragOverField(null)}
          onDrop={(e) => handleDrop(e, field, multiple)}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
            dragOverField === field
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <input
            type="file"
            id={field}
            onChange={(e) => handleFileSelect(field, e.target.files, multiple)}
            accept={accept}
            multiple={multiple}
            className="hidden"
          />
          <label htmlFor={field} className="cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm font-medium">Click to upload or drag and drop</span>
              <span className="text-xs text-muted-foreground">PDF, JPG, PNG (Max 2MB)</span>
            </div>
          </label>
        </div>

        {fileArray.length > 0 && (
          <div className="space-y-2">
            {fileArray.map((file: File, idx: number) => (
              <div key={`${file.name}-${idx}`} className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                <span className="text-sm">{file.name}</span>
                <button
                  onClick={() => removeFile(field, idx)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Upload Documents</h2>
      <p className="text-muted-foreground">
        Upload high-quality scans or photos of your documents. Each file must be under 2MB.
      </p>

      <div className="space-y-6">
        <FileInput label="Passport Photo Page (PDF/JPG) *" field="passportPhoto" />
        <FileInput label="Proof of Income (last 6 months)" field="proofOfIncome" multiple />
        <FileInput label="Passport-Sized Photo (white background) *" field="photo" />
        <FileInput label="Birth Certificate (for permanent residency)" field="birthCertificate" />
        <FileInput label="Job Offer Letter (for work permits)" field="jobOfferLetter" />
        <FileInput label="Additional Documents" field="additionalDocuments" multiple />
      </div>

      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-sm">
        <p className="font-semibold text-accent mb-2">File Size Tips:</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>• Compress PDFs using SmallPDF.com or iLovePDF.com</li>
          <li>• Resize images to max 1920px width</li>
          <li>• Use JPG instead of PNG for photos (smaller size)</li>
        </ul>
      </div>
    </div>
  );
}
