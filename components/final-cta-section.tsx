'use client';

import { Button } from '@/components/ui/button';

interface FinalCtaSectionProps {
  onStartApplication: () => void;
}

export function FinalCTASection({ onStartApplication }: FinalCtaSectionProps) {
  return (
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
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
          >
            Start Free Application
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
