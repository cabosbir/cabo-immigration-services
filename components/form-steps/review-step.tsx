'use client';

import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface ReviewStepProps {
  formData: any;
  uploadedFiles: any;
}

export function ReviewStep({ formData, uploadedFiles }: ReviewStepProps) {
  const serviceTypes: Record<string, string> = {
    'temporary': 'Temporary Residency (1-4 years)',
    'permanent': 'Permanent Residency',
    'work-permit': 'Work Permit',
    'renewal': 'Residency Renewal',
  };

  const getFileCount = () => {
    let count = 0;
    Object.values(uploadedFiles).forEach((file: any) => {
      if (Array.isArray(file)) {
        count += file.length;
      } else if (file) {
        count += 1;
      }
    });
    return count;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review Your Application</h2>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold">Ready to submit?</p>
            <p className="text-sm text-muted-foreground">
              Please review all information below before submitting. You'll receive a confirmation email.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-lg mb-4">Application Summary</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground">Service Type</p>
                <p className="font-semibold">{serviceTypes[formData.serviceType]}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documents Uploaded</p>
                <p className="font-semibold">{getFileCount()} file{getFileCount() !== 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-semibold">{formData.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold break-all">{formData.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground">Nationality</p>
                <p className="font-semibold">{formData.nationality}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Passport Number</p>
                <p className="font-semibold">{formData.passportNumber}</p>
              </div>
            </div>

            {formData.monthlyIncome && (
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Income</p>
                  <p className="font-semibold">${Number(formData.monthlyIncome).toLocaleString()} USD</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Income Source</p>
                  <p className="font-semibold">{formData.incomeSource}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Uploaded Documents</h3>
          <div className="space-y-2">
            {uploadedFiles.passportPhoto && (
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>{uploadedFiles.passportPhoto.name}</span>
              </div>
            )}
            {uploadedFiles.photo && (
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>{uploadedFiles.photo.name}</span>
              </div>
            )}
            {uploadedFiles.proofOfIncome.map((file: File) => (
              <div key={file.name} className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>{file.name}</span>
              </div>
            ))}
            {uploadedFiles.birthCertificate && (
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>{uploadedFiles.birthCertificate.name}</span>
              </div>
            )}
            {uploadedFiles.jobOfferLetter && (
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>{uploadedFiles.jobOfferLetter.name}</span>
              </div>
            )}
            {uploadedFiles.additionalDocuments.map((file: File) => (
              <div key={file.name} className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
        By clicking Submit, you agree that all information provided is accurate and you authorize ImmigrateCabo to submit your application to INM.
      </div>
    </div>
  );
}
