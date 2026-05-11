import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, MapPin, ChevronRight, LayoutGrid, List as ListIcon, X, Search } from 'lucide-react';
import { CATEGORIES, PROVINCES } from '../constants';
import { MOCK_LISTINGS } from '../data';
import ListingCard from '../components/ListingCard';
import { cn } from '../lib/utils';

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState('');
  
  const category = useMemo(() => CATEGORIES.find(c => c.id === id), [id]);
  
  const listings = useMemo(() => {
    let filtered = MOCK_LISTINGS.filter(l => l.category === id);
    if (selectedProvince) {
      filtered = filtered.filter(l => l.location.province === selectedProvince);
    }
    return filtered;
  }, [id, selectedProvince]);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Category not found</h1>
        <Link to="/" className="text-brand-primary font-bold">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Category Header */}
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 max-w-4xl">
            <nav className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">
              <Link to="/" className="hover:text-brand-primary">Home</Link>
              <ChevronRight size={12} className="text-gray-400" />
              <span className="text-gray-900">{category.name}</span>
            </nav>
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.6em]">Premium Network</span>
            <h1 className="text-5xl md:text-7xl font-display font-light text-white leading-tight">
              {category.name} <span className="italic italic text-brand-primary">Zimbabwe</span>
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl leading-relaxed">
              {category.description}. Available now across our curated regional hubs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-px bg-gray-100 border border-gray-100">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:flex flex-col gap-px w-80 shrink-0 bg-gray-100">
          <div className="bg-white p-8 h-full flex flex-col gap-10">
            <h3 className="font-display font-light text-xs uppercase tracking-[0.4em] text-brand-primary">Refine</h3>
            
            <div className="flex flex-col gap-4">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">The Regions</label>
              <select 
                className="w-full bg-gray-50 border border-gray-100 rounded-none py-3 px-4 outline-none focus:border-brand-primary font-bold text-[10px] tracking-widest uppercase transition-all"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                <option value="">SHOW ALL</option>
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Valuation Range (USD)</label>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="MIN" className="w-full bg-gray-50 border border-gray-100 rounded-none py-3 px-4 outline-none focus:border-brand-primary text-[10px] font-bold tracking-widest uppercase" />
                <span className="text-gray-400">/</span>
                <input type="number" placeholder="MAX" className="w-full bg-gray-50 border border-gray-100 rounded-none py-3 px-4 outline-none focus:border-brand-primary text-[10px] font-bold tracking-widest uppercase" />
              </div>
            </div>

            <button className="bg-brand-primary text-black py-4 font-black text-[10px] tracking-[0.3em] uppercase transition-all hover:bg-brand-secondary">
              Filter Selection
            </button>

            <div className="mt-auto border border-brand-primary/20 p-8 flex flex-col gap-6">
              <h4 className="font-display text-2xl font-light text-white italic">List With Us</h4>
              <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em] leading-relaxed">
                Connect your heritage assets with our exclusive community of discerning buyers.
              </p>
              <Link to="/post-ad" className="border border-brand-primary text-brand-primary py-4 font-black text-[9px] tracking-[0.3em] uppercase text-center hover:bg-brand-primary hover:text-black transition-all">
                Submit Listing
              </Link>
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <section className="flex-1 flex flex-col gap-px bg-gray-100">
          {/* Controls Bar */}
          <div className="flex items-center justify-between bg-white p-4 border-b border-gray-100">
            <div className="flex items-center gap-4 px-2">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">
                Found / <span className="text-white">{listings.length}</span>
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <button 
                className="lg:hidden flex items-center gap-3 px-6 py-2 border border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500"
                onClick={() => setShowFilters(true)}
              >
                <Filter size={14} /> Refine
              </button>
              <div className="hidden sm:flex items-center gap-4">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn("p-2 transition-all hover:text-brand-primary", viewMode === 'grid' ? "text-brand-primary" : "text-gray-400")}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn("p-2 transition-all hover:text-brand-primary", viewMode === 'list' ? "text-brand-primary" : "text-gray-400")}
                >
                  <ListIcon size={18} />
                </button>
              </div>
              <select className="bg-transparent text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 outline-none cursor-pointer">
                <option>NEWEST</option>
                <option>PRICE: LOW</option>
                <option>PRICE: HIGH</option>
              </select>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="bg-gray-100">
            {listings.length > 0 ? (
              <div className={cn(
                "grid gap-px",
                viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}>
                {listings.map(listing => (
                  <div key={listing.id} className="bg-white">
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 flex flex-col items-center gap-8 text-center bg-white">
                <div className="w-20 h-20 border border-gray-100 flex items-center justify-center text-gray-200">
                  <Search size={32} />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-3xl font-display font-light text-white italic">Zero Results Found</h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Adjust your criteria or seek other regions</p>
                </div>
                <button 
                  onClick={() => setSelectedProvince('')}
                  className="text-brand-primary font-black text-[10px] tracking-[0.3em] uppercase underline"
                >
                  Reset Parameters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-50">
                <h3 className="text-xl font-extrabold text-gray-900">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-widest text-[10px] opacity-50">Province</label>
                  <div className="grid grid-cols-1 gap-2">
                    {PROVINCES.map(p => (
                      <button 
                        key={p}
                        onClick={() => setSelectedProvince(p === selectedProvince ? '' : p)}
                        className={cn(
                          "w-full text-left font-semibold py-3 px-4 rounded-xl border transition-all",
                          selectedProvince === p ? "bg-green-50 border-brand-primary text-brand-primary" : "bg-white border-gray-100 text-gray-600"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-widest text-[10px] opacity-50">Price Range</label>
                  <div className="flex items-center gap-3">
                    <input type="number" placeholder="Min USD" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 font-bold outline-none" />
                    <input type="number" placeholder="Max USD" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 font-bold outline-none" />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-50 flex gap-4">
                <button 
                  onClick={() => { setSelectedProvince(''); setShowFilters(false); }}
                  className="flex-1 bg-gray-100 text-gray-900 py-4 rounded-2xl font-bold"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="flex-1 bg-brand-primary text-white py-4 rounded-2xl font-bold shadow-lg"
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
