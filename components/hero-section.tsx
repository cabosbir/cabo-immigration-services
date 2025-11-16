'use client';

import { Button } from './ui/button';

interface HeroSectionProps {
  onStartApplication: () => void;
}

export function HeroSection({ onStartApplication }: HeroSectionProps) {
  return (
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
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary"
                onClick={() => {
                  const element = document.getElementById('how-it-works');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
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
  );
}