'use client';

import { Card } from '@/components/ui/card';
import { Calendar, Home, Briefcase, RefreshCw } from 'lucide-react';

interface ServiceSelectionStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function ServiceSelectionStep({ value, onChange }: ServiceSelectionStepProps) {
  const services = [
    { id: 'temporary', label: 'Temporary Residency (1-4 years)', icon: Calendar },
    { id: 'permanent', label: 'Permanent Residency', icon: Home },
    { id: 'work-permit', label: 'Work Permit', icon: Briefcase },
    { id: 'renewal', label: 'Renewal/Update', icon: RefreshCw },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">What service do you need?</h2>
      
      {services.map(service => {
        const Icon = service.icon;
        return (
          <button
            key={service.id}
            onClick={() => onChange(service.id)}
            className={`w-full p-4 rounded-lg border-2 flex items-center gap-4 transition ${
              value === service.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Icon className={`w-6 h-6 ${value === service.id ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`text-left font-semibold ${value === service.id ? 'text-primary' : ''}`}>
              {service.label}
            </span>
            {value === service.id && (
              <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <div className="w-2 h-2 bg-primary-foreground rounded-full" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
