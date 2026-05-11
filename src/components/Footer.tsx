import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Send, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
          {/* Brand */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-brand-primary flex items-center justify-center text-brand-primary">
                <span className="font-display font-light text-2xl">Z</span>
              </div>
              <span className="font-display font-light text-2xl text-white tracking-[0.3em] uppercase">ZimMarket</span>
            </div>
            <p className="text-gray-600 leading-relaxed font-light">
              Defining the standard for ultra-luxury travel and local commerce. Every detail meticulously tailored to your itinerary, preference, and pulse.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-brand-primary transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-primary transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-primary transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Browse */}
          <div>
            <h4 className="font-display font-light text-xs mb-8 uppercase tracking-[0.4em] text-brand-primary">The Groups</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/category/classifieds" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700 hover:text-brand-primary transition-colors">Classifieds</Link></li>
              <li><Link to="/category/produce" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700 hover:text-brand-primary transition-colors">The Harvest</Link></li>
              <li><Link to="/category/cars" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700 hover:text-brand-primary transition-colors">The Fleet</Link></li>
              <li><Link to="/category/services" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700 hover:text-brand-primary transition-colors">Our Services</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-light text-xs mb-8 uppercase tracking-[0.4em] text-brand-primary">Concierge</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/how-it-works" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700 hover:text-brand-primary transition-colors">The Protocol</Link></li>
              <li><Link to="/safety" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700 hover:text-brand-primary transition-colors">Safety Code</Link></li>
              <li><Link to="/help" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700 hover:text-brand-primary transition-colors">Assistance</Link></li>
              <li><Link to="/contact" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700 hover:text-brand-primary transition-colors">Direct Contact</Link></li>
            </ul>
          </div>

          {/* WhatsApp Support (Sophisticated) */}
          <div className="border border-brand-primary p-10 flex flex-col gap-6">
            <h4 className="font-display font-light text-xl text-white italic">Direct Inquiries</h4>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 leading-relaxed">
              For immediate facilitation or assistance with your listings, our concierge team is available 24/7.
            </p>
            <a 
              href="https://wa.me/263770000000" 
              className="flex items-center justify-center gap-4 w-full bg-brand-primary text-black py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all"
            >
              <Send size={14} />
              Open Channel
            </a>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
          <p>© {currentYear} VANGUARD / ZimMarket. London — 22:14 GMT</p>
          <div className="flex items-center gap-12">
            <Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy Code</Link>
            <Link to="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
