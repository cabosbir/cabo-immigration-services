'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { X, Mail, User, Phone, Calendar, MessageSquare } from 'lucide-react';

interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message: string;
}

function ConsultationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredDate: '',
          message: '',
        });
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-background border-b p-6 flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">Schedule a Consultation</h3>
            <p className="text-sm text-muted-foreground mt-1">We'll get back to you within 24 hours</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name *
              </div>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address *
              </div>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number *
              </div>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+52 624 123 4567"
            />
          </div>

          {/* Preferred Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Preferred Consultation Date
              </div>
            </label>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Tell us about your immigration needs
              </div>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="What type of residency are you interested in? Any specific questions?"
            />
          </div>

          {/* Submit Status Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
              ✓ Consultation request sent! We'll contact you within 24 hours.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              ✗ Something went wrong. Please try again or call us at 624 125 9640.
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-medium transition disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Schedule Consultation'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 bg-muted hover:bg-muted/80 py-3 rounded-lg font-medium transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface FinalCtaSectionProps {
  onStartApplication: () => void;
}

export function FinalCTASection({ onStartApplication }: FinalCtaSectionProps) {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  return (
    <>
      <ConsultationModal 
        isOpen={consultationModalOpen} 
        onClose={() => setConsultationModalOpen(false)} 
      />

      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make Cabo Your Home?</h2>
          <p className="text-lg opacity-90 mb-8">
            Start your immigration journey today with our guided application system
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onStartApplication}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold"
            >
              Start Free Application
            </Button>
            <Button
              onClick={() => setConsultationModalOpen(true)}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-semibold"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}