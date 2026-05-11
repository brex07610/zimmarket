import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  TrendingUp, 
  Zap, 
  MapPin, 
  CheckCircle2, 
  Search,
  ShoppingBag,
  Sprout,
  Car,
  Hammer,
  Droplets,
  Tractor,
  Store
} from 'lucide-react';
import { CATEGORIES, PROVINCES } from '../constants';
import ListingCard from '../components/ListingCard';
import { Listing } from '../types';

const MOCK_FEATURED: Listing[] = [
  {
    id: '1',
    title: 'Brand New Toyota Hilux GD-6 2024 Black Edition',
    description: 'Fresh import, full leather interior, 0km, duty paid. Negotiable.',
    priceUsd: 58500,
    priceZig: 789750,
    category: 'cars',
    subCategory: 'SUVs & 4x4s',
    location: { province: 'Harare', city: 'Harare', suburb: 'Avondale' },
    seller: { id: 's1', name: 'Zim Motors', type: 'dealer', verified: true, whatsapp: '263770000000' },
    images: ['https://images.unsplash.com/photo-1594731802114-035392ec7092?q=80&w=600&fit=crop'],
    createdAt: new Date().toISOString(),
    isFeatured: true
  },
  {
    id: '2',
    title: 'Fresh Tomatoes - Bulk Supply Available',
    description: 'Grade A tomatoes harvested today. Delivery available in Harare.',
    priceUsd: 12,
    priceZig: 162,
    category: 'produce',
    subCategory: 'Vegetables',
    location: { province: 'Mashonaland East', city: 'Marondera' },
    seller: { id: 's2', name: 'Moyo Farms', type: 'farmer', verified: true, whatsapp: '263770000000' },
    images: ['https://images.unsplash.com/photo-1546473427-e1e6955773ad?q=80&w=600&fit=crop'],
    createdAt: new Date().toISOString(),
    isFeatured: true
  },
  {
    id: '3',
    title: 'Professional Home Plumbing Services',
    description: 'Expert plumbers for all your home needs. Borehole pump installation.',
    priceUsd: 45,
    category: 'services',
    subCategory: 'Plumbing',
    location: { province: 'Bulawayo', city: 'Bulawayo' },
    seller: { id: 's3', name: 'City Plumbers', type: 'business', verified: false, whatsapp: '263770000000' },
    images: ['https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=600&fit=crop'],
    createdAt: new Date().toISOString(),
    isFeatured: true
  },
  {
    id: '4',
    title: 'Samsung Galaxy S24 Ultra 512GB - Sealed',
    description: 'Original sealed Samsung S24 Ultra. Valid warranty.',
    priceUsd: 950,
    priceZig: 12825,
    category: 'classifieds',
    subCategory: 'Electronics',
    location: { province: 'Harare', city: 'Harare', suburb: 'Borrowdale' },
    seller: { id: 's4', name: 'Tendai M.', type: 'private', verified: true, whatsapp: '263770000000' },
    images: ['https://images.unsplash.com/photo-1610945415295-d9baf060e871?q=80&w=600&fit=crop'],
    createdAt: new Date().toISOString(),
    isFeatured: true
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-px bg-gray-100">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 zim-pattern opacity-100 -z-10" />
        <div className="container mx-auto px-4 flex flex-col items-center gap-12">
          <div className="flex flex-col gap-6 max-w-4xl text-center">
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.6em] animate-in fade-in slide-in-from-bottom-2 duration-700">The Premium Marketplace</span>
            <h1 className="text-5xl md:text-8xl font-display font-light text-white tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-1000">
              The Art of <br /><span className="text-brand-primary italic">Arrival</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Defining the standard for Zimbabwean commerce. Every listing meticulously verified to ensure precision, quality, and heritage.
            </p>
          </div>

          {/* Featured Search (Sophisticated) */}
          <div className="w-full max-w-5xl bg-white p-1 rounded-none border border-gray-100 shadow-2xl shadow-black/50 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <form className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="flex-[2] flex items-center px-8 py-6 gap-4 group">
                <Search className="text-gray-500 group-focus-within:text-brand-primary transition-all" size={24} />
                <input 
                  type="text" 
                  placeholder="WHAT ARE YOU SEEKING?" 
                  className="w-full bg-transparent outline-none font-light text-xl tracking-tight uppercase placeholder:text-[10px] placeholder:tracking-[0.3em] placeholder:text-gray-500"
                />
              </div>
              <div className="flex-1 flex items-center px-8 py-6 gap-4 group">
                <MapPin className="text-gray-500 group-focus-within:text-brand-primary" size={24} />
                <select className="flex-1 bg-transparent outline-none font-bold text-[10px] tracking-[0.3em] uppercase appearance-none cursor-pointer">
                  <option value="">REGION / ALL</option>
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <button className="bg-brand-primary hover:bg-brand-secondary text-black px-12 py-6 font-black text-xs tracking-[0.3em] uppercase transition-all active:scale-95">
                ENQUIRE
              </button>
            </form>
          </div>

          {/* Quick Trust Badges */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 mt-8 opacity-50">
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] font-black text-gray-900 tracking-[0.3em] uppercase">Verified Fleet</span>
              <div className="w-12 h-px bg-brand-primary" />
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] font-black text-gray-900 tracking-[0.3em] uppercase">Direct Enquiries</span>
              <div className="w-12 h-px bg-brand-primary" />
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] font-black text-gray-900 tracking-[0.3em] uppercase">Global Operations</span>
              <div className="w-12 h-px bg-brand-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4 mb-20 text-center">
              <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.4em]">Selections</span>
              <h2 className="text-4xl md:text-5xl font-display font-light text-white">The Collections</h2>
              <div className="w-20 h-px bg-brand-primary mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-gray-100 border border-gray-100">
            {CATEGORIES.map(cat => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.id}`}
                className="group flex flex-col items-center gap-6 p-10 bg-white hover:bg-gray-50 transition-all duration-700"
              >
                <div 
                  className="w-12 h-12 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform duration-700"
                >
                  <CategoryIcon iconName={cat.icon} />
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <span className="font-display font-light text-sm uppercase tracking-[0.2em] text-gray-900">{cat.name}</span>
                  <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest opacity-50 italic">View Network</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4 mb-16 text-center">
            <div className="flex items-center gap-3 text-brand-primary font-black text-[10px] uppercase tracking-[0.4em] mb-2">
              <TrendingUp size={16} />
              Editor's Choice
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-light text-white leading-tight">Featured Pursuits</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
            {MOCK_FEATURED.map(listing => (
              <div key={listing.id} className="bg-white">
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/search" className="inline-flex items-center gap-4 border border-brand-primary text-brand-primary px-12 py-5 font-black text-xs tracking-[0.3em] uppercase hover:bg-brand-primary hover:text-black transition-all">
              Discover Full Catalogue <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Farmer Spotlight */}
      <section className="bg-white py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
            <div className="relative aspect-square border-gold p-8">
              <div className="absolute inset-0 bg-charcoal m-8 border border-white/5 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&fit=crop" 
                  alt="Fresh Produce" 
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000 scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-brand-primary text-black p-10 hidden lg:block">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Heritage</div>
                <div className="font-display text-4xl font-light">100% Local</div>
              </div>
            </div>
            
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.5em]">Direct From Farm</span>
                <h2 className="text-5xl md:text-6xl font-display font-light leading-[1.1] text-white">
                  The Roots of <br /><span className="italic italic">Quality</span>
                </h2>
                <p className="text-xl text-gray-600 font-light leading-relaxed">
                  Every grain, every harvest, every season. We connect you with the stewards of our land, ensuring the finest Zimbabwean produce reaches your table without compromise.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link to="/category/produce" className="w-full sm:w-auto bg-brand-primary text-black px-12 py-5 font-black text-xs tracking-[0.3em] uppercase hover:bg-white transition-all text-center">
                  Browse Harvest
                </Link>
                <Link to="/sell-produce" className="w-full sm:w-auto border border-white/20 text-white px-12 py-5 font-black text-xs tracking-[0.3em] uppercase hover:border-brand-primary hover:text-brand-primary transition-all text-center">
                  Register Estate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seller CTA Band */}
      <section className="bg-charcoal py-24 border-t border-b border-gray-100">
        <div className="container mx-auto px-4 text-center flex flex-col items-center gap-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight">Expand Your Influence</h2>
            <p className="text-lg text-gray-600 font-light">
              Join the elite circle of Zimbabwean sellers. Precision tools, exquisite fleet collections, or masterful services — list your legacy today.
            </p>
          </div>
          <Link to="/post-ad" className="bg-brand-primary hover:bg-brand-secondary text-black px-16 py-6 font-black text-sm tracking-[0.4em] uppercase transition-all">
            Begin Your Listing
          </Link>
        </div>
      </section>
    </div>
  );
}

import * as LucideIcons from 'lucide-react';

function CategoryIcon({ iconName }: { iconName: string }) {
  const Icon = (LucideIcons as any)[iconName];
  return Icon ? <Icon size={32} /> : <ShoppingBag size={32} />;
}
