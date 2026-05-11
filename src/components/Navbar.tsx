import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  PlusCircle, 
  User, 
  MapPin,
  ChevronDown,
  Store,
  ShoppingBag
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PROVINCES, CATEGORIES } from '../constants';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery || selectedProvince) {
      navigate(`/search?q=${searchQuery}&p=${selectedProvince}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-none">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 shrink-0 group">
          <div className="w-8 h-8 md:w-10 md:h-10 border border-brand-primary flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-black transition-all">
            <Store size={20} className="md:w-6 md:h-6" />
          </div>
          <span className="font-display font-light text-xl md:text-2xl text-white tracking-[0.3em] uppercase">ZimMarket</span>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl bg-gray-50 border border-gray-100 overflow-hidden group focus-within:border-brand-primary transition-all">
          <div className="flex-1 flex items-center px-4 gap-2">
            <Search className="text-gray-500 group-focus-within:text-brand-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH CATALOGUE..." 
              className="w-full bg-transparent py-2.5 outline-none text-[10px] tracking-[0.2em] uppercase font-medium placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-px h-6 bg-gray-100 my-auto opacity-20" />
          <div className="px-4 flex items-center gap-2 min-w-[140px]">
            <MapPin className="text-gray-500" size={16} />
            <select 
              className="bg-transparent outline-none text-[10px] tracking-[0.1em] uppercase font-medium cursor-pointer max-w-[140px] truncate"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="">All Regions</option>
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <button type="submit" className="bg-brand-primary hover:bg-brand-secondary text-black px-8 py-2.5 font-bold text-[10px] tracking-[0.2em] uppercase transition-all">
            Search
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link 
            to="/post-ad" 
            className="hidden sm:flex items-center gap-2 border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-black px-4 md:px-6 py-2 md:py-2.5 font-bold transition-all text-[10px] tracking-[0.2em] uppercase"
          >
            <PlusCircle size={14} />
            <span>Post Listing</span>
          </Link>
          
          <button className="flex items-center gap-2 text-brand-primary hover:text-white transition-colors text-[10px] font-bold tracking-[0.2em] uppercase">
            <User size={18} />
            <span className="hidden lg:inline">Sign In</span>
          </button>

          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Categories Desktop Bar */}
      <div className="hidden md:block bg-charcoal border-t border-gray-100 overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 py-3 flex items-center gap-10 whitespace-nowrap">
          <Link to="/listings" className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-700 hover:text-brand-primary transition-colors">The Fleet / All</Link>
          {CATEGORIES.map(cat => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-700 hover:text-brand-primary transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-white pt-16 animate-in slide-in-from-right duration-300">
          <div className="h-full overflow-y-auto px-4 py-6 flex flex-col gap-8">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search anything..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-primary font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-10 outline-none appearance-none font-medium"
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                >
                  <option value="">All Provinces</option>
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
              <button className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform">
                Search
              </button>
            </form>

            {/* Categories Mobile */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-gray-900 px-2 uppercase tracking-wide text-xs opacity-50">Quick Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map(cat => (
                  <Link 
                    key={cat.id} 
                    to={`/category/${cat.id}`}
                    className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all border border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="p-3 rounded-xl text-white" style={{ backgroundColor: cat.color }}>
                      <CategoryIcon iconName={cat.icon} />
                    </div>
                    <span className="text-xs font-bold text-center">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              to="/post-ad" 
              className="mt-4 flex items-center justify-center gap-2 bg-brand-secondary text-white py-5 rounded-2xl font-bold text-xl shadow-lg active:scale-95 transition-transform"
              onClick={() => setIsMenuOpen(false)}
            >
              <PlusCircle size={24} />
              Post FREE Ad
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

// Sub-component for dynamic icons
import * as LucideIcons from 'lucide-react';

function CategoryIcon({ iconName }: { iconName: string }) {
  const Icon = (LucideIcons as any)[iconName];
  return Icon ? <Icon size={24} /> : <LucideIcons.ShoppingBag size={24} />;
}
