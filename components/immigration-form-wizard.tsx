'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ServiceSelectionStep } from './form-steps/service-selection-step';
import { PersonalInfoStep } from './form-steps/personal-info-step';
import { ImmigrationDetailsStep } from './form-steps/immigration-details-step';
import { DocumentUploadStep } from './form-steps/document-upload-step';
import { ReviewStep } from './form-steps/review-step';
import { SuccessStep } from './form-steps/success-step';

interface ImmigrationFormWizardProps {
  onClose: () => void;
}

export function ImmigrationFormWizard({ onClose }: ImmigrationFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: '',
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    passportExpiration: '',
    currentAddress: '',
    intendedCaboAddress: '',
    livedInMexicoBefore: 'false',
    currentVisaStatus: '',
    incomeSource: '',
    monthlyIncome: '',
    hasMexicanFamily: 'false',
    employerName: '',
    jobTitle: '',
    employerRFC: '',
    jobStartDate: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    passportPhoto: null as File | null,
    proofOfIncome: [] as File[],
    photo: null as File | null,
    birthCertificate: null as File | null,
    jobOfferLetter: null as File | null,
    additionalDocuments: [] as File[],
  });
  const [error, setError] = useState<string | null>(null);

  const steps = [
    'Service Selection',
    'Personal Info',
    'Immigration Details',
    'Document Upload',
    'Review',
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateUploadedFiles = (field: string, value: any) => {
    setUploadedFiles(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      // Submit form
      setIsSubmitting(true);
      setError(null);

      try {
        const submitFormData = new FormData();
        
        // Add text fields
        Object.entries(formData).forEach(([key, value]) => {
          submitFormData.append(key, value);
        });

        // Add files
        if (uploadedFiles.passportPhoto) {
          submitFormData.append('passportPhoto', uploadedFiles.passportPhoto);
        }
        uploadedFiles.proofOfIncome.forEach(file => {
          submitFormData.append('proofOfIncome', file);
        });
        if (uploadedFiles.photo) {
          submitFormData.append('photo', uploadedFiles.photo);
        }
        if (uploadedFiles.birthCertificate) {
          submitFormData.append('birthCertificate', uploadedFiles.birthCertificate);
        }
        if (uploadedFiles.jobOfferLetter) {
          submitFormData.append('jobOfferLetter', uploadedFiles.jobOfferLetter);
        }
        uploadedFiles.additionalDocuments.forEach(file => {
          submitFormData.append('additionalDocuments', file);
        });

        const response = await fetch('/api/submit-immigration-form', {
          method: 'POST',
          body: submitFormData,
        });

        const result = await response.json();

        if (result.success) {
          setSubmissionComplete(true);
        } else {
          setError(result.error || 'Submission failed. Please try again.');
        }
      } catch (err) {
        console.error('Submission error:', err);
        setError('Network error. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  if (submissionComplete) {
    return <SuccessStep onClose={onClose} />;
  }

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Immigration Application</h1>
            <p className="text-muted-foreground mt-1">Step {currentStep + 1} of {steps.length}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            {steps.map((step, index) => (
              <span
                key={index}
                className={index <= currentStep ? 'text-primary font-semibold' : ''}
              >
                {step}
              </span>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <Card className="p-8 mb-8">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          {currentStep === 0 && (
            <ServiceSelectionStep
              value={formData.serviceType}
              onChange={(value) => updateFormData('serviceType', value)}
            />
          )}

          {currentStep === 1 && (
            <PersonalInfoStep
              data={formData}
              onChange={updateFormData}
            />
          )}

          {currentStep === 2 && (
            <ImmigrationDetailsStep
              data={formData}
              onChange={updateFormData}
              serviceType={formData.serviceType}
            />
          )}

          {currentStep === 3 && (
            <DocumentUploadStep
              files={uploadedFiles}
              onChange={updateUploadedFiles}
            />
          )}

          {currentStep === 4 && (
            <ReviewStep
              formData={formData}
              uploadedFiles={uploadedFiles}
            />
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <Button
            onClick={handleBack}
            disabled={currentStep === 0}
            variant="outline"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? 'Submitting...' : currentStep === steps.length - 1 ? 'Submit Application' : 'Next'}
            {!isSubmitting && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
