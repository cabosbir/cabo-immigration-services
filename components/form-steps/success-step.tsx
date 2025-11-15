'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, Mail, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SuccessStepProps {
  onClose: () => void;
}

export function SuccessStep({ onClose }: SuccessStepProps) {
  return (
    <div className="min-h-screen bg-muted/20 py-8 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Application Submitted!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your immigration packet is ready
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-600" />
              We've prepared the following documents for you:
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full" />
                Form FMM-1 (Migratory Form) - Pre-filled
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full" />
                Residency Application - Pre-filled
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full" />
                Document Checklist for INM Appointment
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full" />
                Preparation Guide
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-bold mb-4">What Happens Next?</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
                <span>Check your email for your immigration packet and forms</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
                <span>Our specialist will contact you within 24 hours to schedule a consultation</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
                <span>Review all forms for accuracy and sign where indicated</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
                <span>Book your INM appointment with our guidance</span>
              </li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Button className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2">
              <Download size={18} />
              Download Forms (ZIP)
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Mail size={18} />
              Email Me the Forms
            </Button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-left text-sm text-amber-900">
            <p className="font-semibold mb-2">Important:</p>
            <p>Check your spam folder if you don't see the email within a few minutes.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Return to Home
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90 flex items-center justify-center gap-2">
              <Calendar size={18} />
              Schedule Consultation
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
