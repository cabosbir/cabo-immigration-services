'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onStartApplication: () => void;
}

export function Header({ onStartApplication }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img 
              src="https://res.cloudinary.com/dgixosra8/image/upload/v1763260298/Edg_3_fdbyxd.png" 
              alt="Cabo Immigration Services" 
              className="h-10 w-auto"
            />
            <span className="font-bold text-lg hidden sm:inline">Cabo Immigration Services</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-sm hover:text-primary transition">
              Services
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm hover:text-primary transition">
              How It Works
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm hover:text-primary transition">
              About
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-sm hover:text-primary transition">
              FAQ
            </button>
          </nav>

          <div className="hidden md:block">
            <Button onClick={onStartApplication} className="bg-primary hover:bg-primary/90">
              Start Application
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-sm hover:text-primary">
              Services
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2 text-sm hover:text-primary">
              How It Works
            </button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-sm hover:text-primary">
              About
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 text-sm hover:text-primary">
              FAQ
            </button>
            <Button onClick={onStartApplication} className="w-full bg-primary hover:bg-primary/90">
              Start Application
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}