'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { X, MapPin, Phone, Clock } from 'lucide-react';

interface HeroSectionProps {
  onStartApplication: () => void;
}

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-background border-b p-6 flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">Contact Us</h3>
            <p className="text-sm text-muted-foreground mt-1">Cabo Immigration Services Office</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Office Location</h4>
              <p className="text-muted-foreground">
                Blvd. Lázaro Cárdenas 1625<br />
                Ampliación Juárez<br />
                23469 Cabo San Lucas, B.C.S.<br />
                Mexico
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Phone</h4>
              <a href="tel:+526241259640" className="text-primary hover:underline">
                624 125 9640
              </a>
            </div>
          </div>

          {/* Office Hours */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-3">Office Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium text-destructive">Closed</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Monday</span>
                  <div className="text-right">
                    <span className="font-medium">8 AM – 3 PM</span>
                    <p className="text-xs text-muted-foreground">Revolution Day (Observed) - Hours might differ</p>
                  </div>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Tuesday</span>
                  <span className="font-medium">8 AM – 3 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Wednesday</span>
                  <span className="font-medium">8 AM – 3 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Thursday</span>
                  <div className="text-right">
                    <span className="font-medium">8 AM – 3 PM</span>
                    <p className="text-xs text-muted-foreground">Revolution Day - Hours might differ</p>
                  </div>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Friday</span>
                  <span className="font-medium">8 AM – 3 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium text-destructive">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Link */}
          <div className="pt-4">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Blvd.+Lázaro+Cárdenas+1625,+Ampliación+Juárez,+23469+Cabo+San+Lucas"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-medium text-center transition"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="sticky bottom-0 bg-background border-t p-6">
          <button
            onClick={onClose}
            className="w-full bg-muted hover:bg-muted/80 py-3 rounded-lg font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ onStartApplication }: HeroSectionProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      
      <section className="relative bg-primary py-20 lg:py-32 overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="text-white">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Navigate Mexican Immigration with Confidence
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Expert assistance for temporary residency, permanent residency, and work permits in Cabo San Lucas
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onStartApplication}
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold"
                >
                  Start Your Application
                </Button>
                <Button
                  size="lg"
                  onClick={() => setContactModalOpen(true)}
                  className="bg-accent hover:bg-accent/90 text-white font-semibold"
                >
                  Contact
                </Button>
              </div>
            </div>

            {/* Right column - Image */}
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dgixosra8/image/upload/v1763263448/Screenshot_2025-11-15_at_8.23.59_PM_qknvdk.png"
                  alt="Beautiful Cabo San Lucas beach at sunset"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}