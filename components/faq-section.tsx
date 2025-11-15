'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How long does the residency process take?',
      answer: 'Temporary residency applications typically take 2-4 weeks after submission to INM. Permanent residency can take 4-8 weeks. We handle all preparation, so you\'re ready to submit quickly.',
    },
    {
      question: 'What is the minimum income requirement?',
      answer: 'For temporary residency in 2024, minimum monthly income is approximately $2,700 USD. For permanent residency, it\'s around $4,500 USD. These amounts are adjusted annually.',
    },
    {
      question: 'Do I need to speak Spanish?',
      answer: 'We prepare all forms in both English and Spanish. While INM operates in Spanish, our team guides you through every step and can arrange consultations in English.',
    },
    {
      question: 'Can I work with temporary residency?',
      answer: 'Yes! Temporary residency includes optional work authorization. You need to apply for it during your residency application process. Most are approved.',
    },
    {
      question: 'What if my application is denied?',
      answer: 'We review all applications before submission to ensure approval. If denied, we help you understand why and can file an appeal or reapplication with strengthened documentation.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-muted/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-muted/20 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
