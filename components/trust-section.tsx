'use client';

import { Card } from '@/components/ui/card';
import { Star, Shield, Clock } from 'lucide-react';

export function TrustSection() {
  const reasons = [
    {
      icon: Star,
      title: '10+ Years Experience',
      description: 'Successfully helped over 500 families establish residency in Cabo San Lucas',
    },
    {
      icon: Shield,
      title: 'INM-Registered Consultants',
      description: 'Licensed immigration advisors familiar with Cabo\'s local INM office procedures',
    },
    {
      icon: Clock,
      title: 'Save 5+ Hours',
      description: 'Our smart forms eliminate repetitive data entry and reduce application errors by 80%',
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose ImmigrateCabo?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-3">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <p className="italic text-muted-foreground mb-4">
            "ImmigrateCabo made the entire process seamless. What I thought would take months was completed in weeks. Highly recommended!"
          </p>
          <p className="font-semibold">Maria Garcia | Temporary Resident since 2023</p>
        </div>
      </div>
    </section>
  );
}
