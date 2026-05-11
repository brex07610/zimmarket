import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  MessageCircle, 
  Heart, 
  Share2, 
  Flag, 
  ShieldCheck, 
  Clock, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Tag,
  Star,
  Send
} from 'lucide-react';
import { MOCK_LISTINGS } from '../data';
import { CATEGORIES } from '../constants';
import ListingCard from '../components/ListingCard';
import { cn } from '../lib/utils';

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const listing = useMemo(() => MOCK_LISTINGS.find(l => l.id === id), [id]);
  const category = useMemo(() => listing ? CATEGORIES.find(c => c.id === listing.category) : null, [listing]);
  const similarListings = useMemo(() => 
    MOCK_LISTINGS.filter(l => l.category === listing?.category && l.id !== listing.id).slice(0, 4), 
  [listing]);

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Listing not found</h1>
        <Link to="/" className="text-brand-primary font-bold">Back to Home</Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(`Hi ${listing.seller.name}, I'm interested in your listing "${listing.title}" on ZimMarket for USD ${listing.priceUsd}. Is it still available?`);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] overflow-hidden whitespace-nowrap">
            <Link to="/" className="hover:text-brand-primary shrink-0">Home</Link>
            <ChevronRight size={10} className="shrink-0 text-gray-400" />
            <Link to={`/category/${listing.category}`} className="hover:text-brand-primary truncate">{category?.name}</Link>
            <ChevronRight size={10} className="shrink-0 text-gray-400" />
            <span className="text-gray-900 truncate">{listing.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-px bg-gray-100 border border-gray-100">
          
          {/* Main Content (Left) */}
          <div className="flex-1 flex flex-col gap-px bg-gray-100">
            {/* Gallery Section */}
            <div className="bg-white p-1">
              <div className="aspect-[16/9] md:aspect-[21/9] bg-gray-50 relative overflow-hidden">
                <img 
                  src={listing.images[0]} 
                  alt={listing.title} 
                  className="w-full h-full object-cover grayscale-[20%]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 right-8 flex gap-4">
                  <button className="p-4 bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-brand-primary hover:text-black transition-all">
                    <Heart size={20} />
                  </button>
                  <button className="p-4 bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-brand-primary hover:text-black transition-all">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-1 grid grid-cols-4 md:grid-cols-6 gap-1">
                {listing.images.map((img, idx) => (
                  <button key={idx} className={cn("aspect-square overflow-hidden border transition-all", idx === 0 ? "border-brand-primary shadow-2xl" : "border-transparent opacity-40 hover:opacity-100")}>
                    <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Header & Details */}
            <div className="bg-white p-8 md:p-12 flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-6">
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] italic">
                    {category?.name}
                  </span>
                  {listing.isFeatured && (
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] flex items-center gap-2">
                       FEATURED SELECTION
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-light text-white leading-tight">
                  {listing.title}
                </h1>
                <div className="flex items-center gap-3 text-gray-500 font-bold text-[10px] uppercase tracking-[0.25em]">
                  <MapPin size={14} className="text-brand-primary" />
                  <span>{listing.location.city} &bull; {listing.location.province}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-10 py-10 border-y border-gray-100">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.4em]">Valuation</span>
                  <div className="flex flex-col">
                    <span className="text-5xl font-display font-light text-brand-primary italic">USD {listing.priceUsd.toLocaleString()}</span>
                    {listing.priceZig && (
                      <span className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-[0.2em] opacity-50">Approx. ZiG {listing.priceZig.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <span className="px-6 py-2 border border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">EcoCash Accepted</span>
                  <span className="px-6 py-2 border border-brand-primary text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">Negotiable</span>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] flex items-center gap-3">
                  The Specification
                </h3>
                <div className="text-xl text-gray-600 font-light leading-loose whitespace-pre-wrap">
                  {listing.description}
                </div>
              </div>
            </div>

            {/* Safety Section */}
            <div className="bg-charcoal p-12 border-t border-gray-100 flex flex-col gap-6">
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em]">Protocol & Safety</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-2">
                  <h4 className="font-display text-2xl font-light text-white italic">The Standard</h4>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">Ensure all transactions follow the ZimMarket verification code for your security and peace of mind.</p>
                </div>
                <ul className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] flex flex-col gap-4 list-none">
                  <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-brand-primary rotate-45" /> Verification on inspection</li>
                  <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-brand-primary rotate-45" /> Secure terminal payments</li>
                  <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-brand-primary rotate-45" /> No advance deposits</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <aside className="w-full lg:w-[420px] bg-white p-8 md:p-12 flex flex-col gap-12 sticky top-28 h-fit">
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl font-light font-display text-gray-400">
                  {listing.seller.name.charAt(0)}
                </div>
                {listing.seller.verified && (
                  <div className="absolute -bottom-2 -right-2 p-2 bg-brand-primary text-black border border-white">
                    <ShieldCheck size={16} />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.4em]">Professional {listing.seller.type}</span>
                <h3 className="text-3xl font-display font-light text-white">{listing.seller.name}</h3>
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em] italic">Established Member / 2024</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a 
                href={`https://wa.me/${listing.seller.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 w-full bg-brand-primary text-black py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-white"
              >
                <MessageCircle size={16} />
                WhatsApp Channel
              </a>
              <button className="flex items-center justify-center gap-4 w-full border border-gray-100 text-gray-500 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:border-brand-primary hover:text-brand-primary">
                Call Concierge
              </button>
            </div>

            {/* Contact Form */}
            <div className="flex flex-col gap-6 pt-8 border-t border-gray-100">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.4em]">Direct Communication</span>
                <h4 className="font-display text-xl font-light text-white italic">Inquire via Portal</h4>
              </div>

              {isSent ? (
                <div className="bg-gray-50 p-6 border border-brand-primary/20 flex flex-col gap-3 animate-in fade-in duration-500">
                  <CheckCircle className="text-brand-primary" size={24} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Message Dispatched</span>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.1em]">The curator will receive your correspondence shortly.</p>
                  <button 
                    onClick={() => setIsSent(false)}
                    className="text-[9px] font-black text-brand-primary uppercase tracking-[0.3em] self-start mt-2 hover:underline"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form 
                  className="flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setTimeout(() => {
                      setIsSubmitting(false);
                      setIsSent(true);
                      setFormData({ name: '', email: '', message: '' });
                    }, 1500);
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="ENTER NAME"
                      className="w-full bg-gray-50 border border-gray-100 py-3 px-4 text-[10px] font-bold tracking-[0.1em] placeholder:text-gray-400 outline-none focus:border-brand-primary transition-all text-white"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="CONTACT@EXAMPLE.COM"
                      className="w-full bg-gray-50 border border-gray-100 py-3 px-4 text-[10px] font-bold tracking-[0.1em] placeholder:text-gray-400 outline-none focus:border-brand-primary transition-all text-white"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">Message</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="INSCRIBE YOUR MESSAGE..."
                      className="w-full bg-gray-50 border border-gray-100 py-3 px-4 text-[10px] font-bold tracking-[0.1em] placeholder:text-gray-400 outline-none focus:border-brand-primary transition-all text-white resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-3 w-full border border-brand-primary text-brand-primary py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-brand-primary hover:text-black disabled:opacity-50 disabled:grayscale mt-2"
                  >
                    {isSubmitting ? "PROCESSING..." : (
                      <>
                        <Send size={12} />
                        Dispatch Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="flex flex-col gap-8 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.4em]">Reputation</span>
                  <span className="text-xl font-display font-light text-white">Platinum Grade</span>
                </div>
                <div className="flex gap-1 text-brand-primary opacity-50">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
              </div>
              <Link to="/seller/profile" className="text-center text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] hover:text-brand-primary transition-colors">
                View Seller Portfolio
              </Link>
            </div>
            
            <button className="flex items-center justify-center gap-3 text-gray-600 text-[8px] font-black uppercase tracking-[0.4em] hover:text-red-500 transition-colors mt-4">
              <Flag size={12} /> Report Listing
            </button>
          </aside>
        </div>

        {/* Similar Listings */}
        {similarListings.length > 0 && (
          <div className="mt-32 flex flex-col gap-16">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.4em]">Recommendations</span>
              <h2 className="text-4xl font-display font-light text-white">Related Pursuits</h2>
              <div className="w-16 h-px bg-brand-primary mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
              {similarListings.map(l => (
                <div key={l.id} className="bg-white">
                  <ListingCard listing={l} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
