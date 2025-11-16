'use client';

import { MapPin, Phone, Clock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://res.cloudinary.com/dgixosra8/image/upload/v1763260298/Edg_3_fdbyxd.png" 
                alt="Cabo Immigration Services" 
                className="h-8 w-auto"
              />
              <span className="font-bold">Cabo Immigration Services</span>
            </div>
            <p className="text-sm opacity-75">
              Expert immigration services for Cabo San Lucas, Mexico
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
            <div className="space-y-3 text-sm opacity-75">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Blvd. Lázaro Cárdenas 1625</p>
                  <p>Ampliación Juárez</p>
                  <p>23469 Cabo San Lucas, B.C.S.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+526241259640" className="hover:opacity-100 transition">
                  624 125 9640
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>Mon-Fri: 8 AM - 3 PM MST</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
          <p>© {currentYear} Cabo Immigration Services. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100 transition">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}