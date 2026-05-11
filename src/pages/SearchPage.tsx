import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Filter, X, LayoutGrid, List as ListIcon, ChevronRight } from 'lucide-react';
import { MOCK_LISTINGS } from '../data';
import { PROVINCES, CATEGORIES } from '../constants';
import ListingCard from '../components/ListingCard';
import { cn } from '../lib/utils';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const province = searchParams.get('p') || '';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);
  const [selectedProvince, setSelectedProvince] = useState(province);

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter(l => {
      const matchesQuery = !query || l.title.toLowerCase().includes(query.toLowerCase()) || l.description.toLowerCase().includes(query.toLowerCase());
      const matchesProvince = !selectedProvince || l.location.province === selectedProvince;
      return matchesQuery && matchesProvince;
    });
  }, [query, selectedProvince]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Header */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-brand-primary">Home</Link>
              <ChevronRight size={14} />
              <span className="text-gray-900">Search Results</span>
            </nav>
            
            <form className="flex flex-col md:flex-row gap-3 w-full max-w-4xl">
              <div className="flex-[2] relative">
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search anything..." 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-brand-primary font-bold shadow-sm"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none appearance-none font-bold cursor-pointer shadow-sm"
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                >
                  <option value="">All Provinces</option>
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <button 
                type="submit"
                onClick={(e) => { e.preventDefault(); /* Logic handled by URL params */ }}
                className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-green-900/10 active:scale-95 transition-all"
              >
                Search
              </button>
            </form>

            <div className="flex items-center gap-4">
              <h1 className="text-xl font-extrabold text-gray-900">
                {query ? `Results for "${query}"` : "All Listings"}
                {selectedProvince && <span className="text-brand-primary"> in {selectedProvince}</span>}
              </h1>
              <span className="bg-gray-100 text-gray-400 text-xs font-extrabold px-3 py-1 rounded-full">
                {filteredListings.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col gap-8 w-64 shrink-0">
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Categories</h3>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map(cat => (
                <Link 
                  key={cat.id} 
                  to={`/category/${cat.id}`}
                  className="flex items-center justify-between py-2.5 px-4 rounded-xl hover:bg-white hover:shadow-sm font-bold text-sm text-gray-600 transition-all"
                >
                  {cat.name}
                  <span className="text-[10px] opacity-40">{cat.listingCount}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <section className="flex-1 flex flex-col gap-6">
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
            <button 
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 font-bold text-sm text-gray-600"
            >
              <Filter size={18} /> Filters
            </button>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-gray-50 p-1 rounded-xl">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white shadow-sm text-brand-primary" : "text-gray-400")}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-white shadow-sm text-brand-primary" : "text-gray-400")}
                >
                  <ListIcon size={18} />
                </button>
              </div>
              <select className="bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm font-bold cursor-pointer">
                <option>Newest First</option>
                <option>Price: Low-High</option>
                <option>Price: High-Low</option>
              </select>
            </div>
          </div>

          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
          )}>
            {filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                <SearchIcon size={40} />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-black text-gray-900">No results found</h2>
                <p className="text-gray-500 font-medium">Try broadening your search criteria or checking other provinces.</p>
              </div>
              <Link to="/listings" className="text-brand-primary font-bold hover:underline">View all listings</Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
