'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Home, Briefcase, RefreshCw } from 'lucide-react';

interface ServicesSectionProps {
  onStartApplication: () => void;
}

export function ServicesSection({ onStartApplication }: ServicesSectionProps) {
  const services = [
    {
      icon: Calendar,
      title: 'Temporary Residency',
      description: 'Valid for 1-4 years with optional work authorization. Perfect for retirees, remote workers, and those testing life in Mexico.',
      points: ['1-4 year validity', 'Renewable process', 'Work permit available'],
    },
    {
      icon: Home,
      title: 'Permanent Residency',
      description: 'Live in Mexico indefinitely with full work rights. No renewals needed after approval.',
      points: ['No expiration date', 'Automatic work authorization', 'Path to citizenship'],
    },
    {
      icon: Briefcase,
      title: 'Work Permits & Employment',
      description: 'Legal authorization for foreign workers. We handle employer registration and employee documentation.',
      points: ['Employer sponsorship support', 'Job offer documentation', 'INM registration'],
    },
    {
      icon: RefreshCw,
      title: 'Renewals & Updates',
      description: 'Keep your status current without penalties. We track deadlines and handle paperwork.',
      points: ['30-day reminder system', 'Address change notifications', 'Avoid fines & delays'],
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Immigration Services</h2>
          <p className="text-xl text-muted-foreground">
            Simplified processes for living and working in Mexico
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {service.points.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={onStartApplication}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Start Application
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
