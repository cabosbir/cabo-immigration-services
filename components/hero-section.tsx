'use client';

import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onStartApplication: () => void;
}

export function HeroSection({ onStartApplication }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <path d="M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z" fill="currentColor" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Navigate Mexican Immigration with Confidence
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Expert assistance for temporary residency, permanent residency, and work permits in Cabo San Lucas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={onStartApplication}
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              >
                Start Your Application
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Book Consultation
              </Button>
            </div>
          </div>
          
          <div className="relative h-96 lg:h-full rounded-lg overflow-hidden shadow-2xl">
            <img
              src="/beach-sunset-cabo-san-lucas.jpg"
              alt="Cabo San Lucas beach sunset"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
