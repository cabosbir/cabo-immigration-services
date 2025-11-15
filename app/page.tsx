'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { ImmigrationFormWizard } from '@/components/immigration-form-wizard';
import { TrustSection } from '@/components/trust-section';
import { FAQSection } from '@/components/faq-section';
import { FinalCTASection } from '@/components/final-cta-section';
import { Footer } from '@/components/footer';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Header onStartApplication={() => setShowForm(true)} />
      
      {!showForm ? (
        <>
          <HeroSection onStartApplication={() => setShowForm(true)} />
          <ServicesSection onStartApplication={() => setShowForm(true)} />
          <HowItWorksSection />
          <TrustSection />
          <FAQSection />
          <FinalCTASection onStartApplication={() => setShowForm(true)} />
          <Footer />
        </>
      ) : (
        <div className="pt-20">
          <ImmigrationFormWizard onClose={() => setShowForm(false)} />
        </div>
      )}
    </main>
  );
}
