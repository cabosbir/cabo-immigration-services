'use client';

import { useState } from 'react';
import { Card } from './ui/card';
import { Star, Shield, Clock, X } from 'lucide-react';

interface TrustModalProps {
  isOpen: boolean;
  onClose: () => void;
  trustItem: {
    icon: any;
    title: string;
    description: string;
    details: {
      overview: string;
      benefits: string[];
      examples: string[];
    };
  } | null;
}

function TrustModal({ isOpen, onClose, trustItem }: TrustModalProps) {
  if (!isOpen || !trustItem) return null;

  const Icon = trustItem.icon;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-background border-b p-6 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{trustItem.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{trustItem.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-primary">What This Means for You</h4>
            <p className="text-muted-foreground leading-relaxed">{trustItem.details.overview}</p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-primary">Key Benefits</h4>
            <ul className="space-y-3">
              {trustItem.details.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Examples */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-primary">Real Examples</h4>
            <div className="space-y-3">
              {trustItem.details.examples.map((example, index) => (
                <div key={index} className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                  <p className="text-sm text-muted-foreground italic">{example}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <button
              onClick={onClose}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-medium transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const reviews = [
    {
      text: "Cabo Immigration Services made the entire process seamless. What I thought would take months was completed in weeks. Highly recommended!",
      author: "Maria Garcia",
      status: "Temporary Resident since 2023",
      rating: 5
    },
    {
      text: "The team was incredibly knowledgeable about the local INM office procedures. They accompanied me to my appointment and everything went smoothly. Worth every peso!",
      author: "John Anderson",
      status: "Permanent Resident since 2024",
      rating: 5
    },
    {
      text: "As a digital nomad, I was worried about getting work authorization. They explained everything clearly and handled all the paperwork. Now I'm legally working from paradise!",
      author: "Sarah Chen",
      status: "Temporary Resident with Work Permit, 2024",
      rating: 5
    },
    {
      text: "After struggling on my own with forms in Spanish, I found these guys. Their smart form system saved me so much time and stress. They caught errors I didn't even know I had made.",
      author: "Robert Martinez",
      status: "Temporary Resident since 2023",
      rating: 5
    },
    {
      text: "Professional, responsive, and they know the Cabo INM office inside and out. They even helped me when my card was delayed due to a system issue. Can't recommend them enough!",
      author: "Emma Thompson",
      status: "Permanent Resident since 2025",
      rating: 5
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-background border-b p-6 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Star className="w-6 h-6 text-primary fill-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Client Reviews</h3>
              <p className="text-sm text-muted-foreground mt-1">What our clients say about us</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-6 border">
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>
              
              {/* Review Text */}
              <p className="text-muted-foreground italic mb-4 leading-relaxed">
                "{review.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{review.author}</p>
                  <p className="text-sm text-muted-foreground">{review.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-background border-t p-6">
          <button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-medium transition"
          >
            Close Reviews
          </button>
        </div>
      </div>
    </div>
  );
}

export function TrustSection() {
  const [selectedTrust, setSelectedTrust] = useState<number | null>(null);
  const [showReviews, setShowReviews] = useState(false);

  const trustPoints = [
    {
      icon: Star,
      title: '10+ Years Experience',
      description: 'Successfully helped over 500 families establish residency in Cabo San Lucas',
      details: {
        overview: 'With over a decade of specialized experience in Mexican immigration, we\'ve navigated every type of visa scenario, from straightforward temporary residency to complex work permit situations. Our team has processed applications through multiple Mexican consulates worldwide and knows the nuances of each location.',
        benefits: [
          'Deep understanding of INM (Instituto Nacional de Migración) procedures and requirements',
          'Established relationships with local INM offices in Cabo San Lucas and La Paz',
          'Experience with all visa types: temporary, permanent, work permits, family reunification',
          'Knowledge of recent 2025 policy changes and financial requirement updates',
          'Track record of 95%+ approval rate on properly prepared applications',
          'Familiarity with common pitfalls and how to avoid them'
        ],
        examples: [
          'Helped a retired couple from Canada obtain permanent residency after 4 years of temporary status, guiding them through each renewal and the final conversion process.',
          'Successfully assisted a digital nomad secure work authorization while maintaining temporary residency, ensuring full compliance with INM regulations.',
          'Guided a family of 5 through the entire process from initial consulate appointment in the US to receiving their resident cards in Cabo - all completed in 6 weeks.'
        ]
      }
    },
    {
      icon: Shield,
      title: 'INM-Registered Consultants',
      description: 'Licensed immigration advisors familiar with Cabo\'s local INM office procedures',
      details: {
        overview: 'Our consultants are officially registered with the Instituto Nacional de Migración, which means we operate under strict professional standards and are authorized to represent clients in official immigration matters. This registration is not automatic - it requires proven expertise, background checks, and ongoing compliance with INM regulations.',
        benefits: [
          'Authorized to accompany you to INM appointments and represent your interests',
          'Direct communication channels with INM officers for status updates',
          'Up-to-date training on the latest immigration law changes and procedures',
          'Professional liability insurance for your protection',
          'Ability to expedite requests and resolve complications directly with INM',
          'Bilingual staff fluent in both Spanish legal terminology and English explanations'
        ],
        examples: [
          'When a client\'s temporary resident card was delayed due to a system error, our INM registration allowed us to contact the office directly and resolve the issue within 48 hours instead of weeks.',
          'Successfully argued for a client whose financial documentation was initially rejected, providing additional context that INM accepted based on our professional standing.',
          'Coordinated with the Cabo INM office to schedule appointments during their busiest season, leveraging our registered status to secure times that would have been unavailable to walk-ins.'
        ]
      }
    },
    {
      icon: Clock,
      title: 'Save 5+ Hours',
      description: 'Our smart forms eliminate repetitive data entry and reduce application errors by 80%',
      details: {
        overview: 'Mexican immigration requires submitting the same information across multiple forms, often in Spanish. Our proprietary system collects your information once and automatically populates all necessary INM forms, consulate applications, and supporting documents. This technology, developed from years of processing applications, catches common errors before submission.',
        benefits: [
          'Answer questions once - we fill out all 15+ required forms automatically',
          'Built-in validation prevents the most common application errors',
          'Spanish translation of your information done correctly the first time',
          'Automatic checklist generation based on your specific visa type',
          'Digital document organization that INM officers can easily review',
          'Real-time progress tracking so you know exactly where you stand'
        ],
        examples: [
          'A client applying for temporary residency would normally spend 6-8 hours filling out forms in Spanish. Our system reduced this to 45 minutes of answering questions in English, with all forms generated automatically.',
          'Prevented a $54 consulate fee loss by catching that a client\'s bank statements didn\'t meet the 6-month requirement before they scheduled their appointment.',
          'Automatically identified that a work permit applicant needed their employer\'s INM registration number, saving a trip back to the office and potential appointment rescheduling.'
        ]
      }
    },
  ];

  return (
    <>
      <TrustModal
        isOpen={selectedTrust !== null}
        onClose={() => setSelectedTrust(null)}
        trustItem={selectedTrust !== null ? trustPoints[selectedTrust] : null}
      />

      <ReviewsModal
        isOpen={showReviews}
        onClose={() => setShowReviews(false)}
      />

      <section id="about" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Cabo Immigration Services?</h2>
            <p className="text-sm text-muted-foreground">
              Click any card to learn more about our expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {trustPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <Card
                  key={index}
                  onClick={() => setSelectedTrust(index)}
                  className="p-8 text-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{point.title}</h3>
                  <p className="text-muted-foreground mb-4">{point.description}</p>
                  <span className="text-primary text-sm font-medium group-hover:underline">
                    Learn More →
                  </span>
                </Card>
              );
            })}
          </div>

          {/* Client Reviews Button */}
          <div className="text-center">
            <button
              onClick={() => setShowReviews(true)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
            >
              <Star className="w-5 h-5" />
              Read Client Reviews
              <Star className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}