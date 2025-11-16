'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [sectionOpen, setSectionOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How long does the residency process take?',
      answer: 'The complete process typically takes 6-8 weeks total. Consulate appointments can be scheduled 2-4 weeks out. Once approved, you have 6 months to enter Mexico, then 30 days to complete the CANJE process (exchanging your visa for a resident card) at the local INM office. The actual INM appointment can take 3-6 hours, with some offices issuing cards same-day.',
    },
    {
      question: 'What are the minimum income requirements for 2025?',
      answer: 'For temporary residency: $27,000 USD in bank balance (last 12 months) OR $1,620 USD monthly income (last 6 months). For permanent residency: approximately $54,000 USD savings OR $2,700 USD monthly income. Requirements vary slightly by consulate and are adjusted annually. Dependents typically require an additional $500-1,800 monthly income proof.',
    },
    {
      question: 'Do I need to speak Spanish?',
      answer: 'No, Spanish is not required to obtain residency. However, all INM procedures are conducted in Spanish. Immigration consultants like us prepare all forms in both languages and can accompany you to appointments to translate. For naturalization (after 5 years of residency), you will need to demonstrate Spanish language skills and pass a test on Mexican history and culture.',
    },
    {
      question: 'Can I work in Mexico with temporary residency?',
      answer: 'Yes, but you must apply for work authorization when requesting your temporary residency. Work permission is not automatic - you must specifically request it. The work authorization is tied to a specific employer, so changing jobs requires a new application. Permanent residents can work freely without additional permits. Digital nomads working for foreign companies technically need work authorization.',
    },
    {
      question: 'Can I leave Mexico while my residency is being processed?',
      answer: 'It depends on the stage. During the consulate application process abroad, you can travel freely. Once you enter Mexico with your visa and start the CANJE process, you should NOT leave until you receive your resident card. In exceptional circumstances, you can request a one-time exit/entry permit from INM, which takes about 7 days to issue.',
    },
    {
      question: 'Do I need to renew my temporary residency every year?',
      answer: 'Yes. Temporary residency cards are initially issued for 1 year and must be renewed annually. You can renew up to 30 days before expiration (or up to 55 days after expiration if you were outside Mexico, with a 5-day grace period upon return). After 4 consecutive years of temporary residency, you become eligible to apply for permanent residency, which never expires.',
    },
    {
      question: 'What happens if I overstay my tourist visa?',
      answer: 'Overstaying is a serious violation. Mexico is cracking down on "perpetual tourists" who leave every 180 days to reset their stay. You may face fines, deportation, or be barred from re-entry. If caught overstaying, you cannot convert to temporary residency from within Mexico - you must leave the country and apply at a Mexican consulate abroad. Fines can range from 1,000-10,000 pesos.',
    },
    {
      question: 'Can I apply for residency if I own property in Mexico?',
      answer: 'Yes! Owning Mexican real estate can qualify you for residency depending on the property value. Requirements vary by consulate, but generally properties valued at $200,000+ USD may qualify you for temporary residency, while higher values may qualify for permanent residency. You\'ll still need to show the property ownership documents and may need to prove additional financial solvency.',
    },
    {
      question: 'What if I\'m married to a Mexican citizen?',
      answer: 'Mexican spouses have a streamlined path. You can apply directly at an INM office in Mexico (no need to go to a consulate abroad first). You\'ll need your marriage certificate (apostilled if married outside Mexico), proof of your spouse\'s Mexican citizenship, and standard documents. After 2 years of temporary residency through marriage, you can apply for permanent residency. Mexican spouses can also sponsor their foreign partners.',
    },
    {
      question: 'Will I have to pay Mexican taxes as a resident?',
      answer: 'Tax residency is separate from immigration residency. You become a Mexican tax resident if you have a permanent home in Mexico OR if your center of vital interests is in Mexico. However, many foreign residents don\'t pay Mexican income tax because they work for foreign companies or have foreign-sourced retirement income. Consult a tax advisor, but immigration consultants are not required to report your tax status to Mexican authorities.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Master Toggle Button */}
        <button
          onClick={() => setSectionOpen(!sectionOpen)}
          className="w-full group"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <HelpCircle className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <h2 className="text-4xl font-bold group-hover:text-primary transition-colors">
              Frequently Asked Questions
            </h2>
            <span className="text-lg text-muted-foreground font-medium">({faqs.length})</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
            <span className="text-sm font-medium">
              {sectionOpen ? 'Hide questions' : 'Show all questions'}
            </span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                sectionOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {/* FAQ Accordion - Hidden until master toggle is clicked */}
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            sectionOpen 
              ? 'grid-rows-[1fr] opacity-100 mt-8' 
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border border-border rounded-lg overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'bg-muted/20' : 'bg-background hover:bg-muted/10'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left group"
                  >
                    <span className="font-semibold text-base pr-4 group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 text-primary transition-all duration-300 ${
                        openIndex === index ? 'rotate-180' : 'group-hover:translate-y-0.5'
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openIndex === index 
                        ? 'grid-rows-[1fr] opacity-100' 
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5 pt-1">
                        <div className="h-px bg-border mb-4" />
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}