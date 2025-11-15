'use client';

import { Card } from '@/components/ui/card';
import { CheckCircle2, FormInput, FileCheck, Flag } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: CheckCircle2,
      title: 'Choose Your Service',
      description: 'Select temporary residency, permanent residency, or work permit',
    },
    {
      icon: FormInput,
      title: 'Complete Smart Form',
      description: 'Answer questions once - we auto-fill all Mexican immigration forms for you',
    },
    {
      icon: FileCheck,
      title: 'Review & Download',
      description: 'Review completed forms, upload supporting documents, get your personalized checklist',
    },
    {
      icon: Flag,
      title: 'Submit & Track',
      description: 'Submit to INM with our guidance or book a consultation for hands-on help',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple 4-Step Process</h2>
          <p className="text-xl text-muted-foreground">
            Our streamlined approach makes immigration easy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="p-6 h-full flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-primary/20 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Card>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="w-6 h-0.5 bg-border" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
