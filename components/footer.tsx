'use client';

import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-bold">
                IC
              </div>
              <span className="font-bold">ImmigrateCabo</span>
            </div>
            <p className="text-sm opacity-75">
              Expert immigration services for Cabo San Lucas, Mexico
            </p>
            <p className="text-sm opacity-75 mt-2">
              Plaza del Sol, Cabo San Lucas, BCS, Mexico
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li><a href="#services" className="hover:opacity-100 transition">Services</a></li>
              <li><a href="#how-it-works" className="hover:opacity-100 transition">How It Works</a></li>
              <li><a href="#faq" className="hover:opacity-100 transition">FAQ</a></li>
              <li><a href="#about" className="hover:opacity-100 transition">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-sm opacity-75">
              <p>Email: hello@immigratecabo.com</p>
              <p>WhatsApp: +52 624 123 4567</p>
              <p>Hours: Mon-Fri 9AM-6PM MST</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
          <p>© {currentYear} ImmigrateCabo. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100 transition">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
