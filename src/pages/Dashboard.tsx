import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  MessageCircle, 
  Plus, 
  Edit2, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  TrendingUp,
  User,
  Settings,
  Bell,
  MoreVertical
} from 'lucide-react';
import { MOCK_LISTINGS } from '../data';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'listings' | 'enquiries' | 'stats'>('listings');
  
  // Mock seller listings (first 3)
  const myListings = MOCK_LISTINGS.slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Dashboard Nav */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Seller <span className="text-brand-primary">Studio</span></h1>
          <div className="flex items-center gap-4">
             <button className="relative p-2 bg-gray-50 rounded-full text-gray-500 hover:text-brand-primary transition-all">
               <Bell size={20} />
               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <Link to="/post-ad" className="flex items-center gap-2 bg-brand-secondary text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-900/10 active:scale-95">
               <Plus size={18} />
               <span>New Ad</span>
             </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
             <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-xl font-black text-gray-400">T</div>
             <div className="flex flex-col">
               <span className="font-extrabold text-gray-900">Tendai M.</span>
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verified Seller</span>
             </div>
          </div>

          <nav className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab('stats')}
              className={cn("flex items-center gap-3 p-4 rounded-2xl font-bold transition-all", activeTab === 'stats' ? "bg-green-50 text-brand-primary" : "text-gray-500 hover:bg-gray-50")}
            >
              <TrendingUp size={20} /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('listings')}
              className={cn("flex items-center gap-3 p-4 rounded-2xl font-bold transition-all", activeTab === 'listings' ? "bg-green-50 text-brand-primary" : "text-gray-500 hover:bg-gray-50")}
            >
              <ShoppingBag size={20} /> My Listings
            </button>
            <button 
              onClick={() => setActiveTab('enquiries')}
              className={cn("flex items-center gap-3 p-4 rounded-2xl font-bold transition-all", activeTab === 'enquiries' ? "bg-green-50 text-brand-primary" : "text-gray-500 hover:bg-gray-50")}
            >
              <MessageCircle size={20} /> Enquiries
            </button>
            <div className="h-px bg-gray-50 my-2 mx-4" />
            <button className="flex items-center gap-3 p-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all">
              <Settings size={20} /> Settings
            </button>
          </nav>

          {/* Premium Nudge */}
          <div className="bg-brand-secondary p-8 rounded-[2.5rem] text-white flex flex-col gap-6 shadow-xl shadow-orange-900/20">
             <div className="bg-white/20 p-2 rounded-xl self-start">
               <TrendingUp size={24} />
             </div>
             <div className="flex flex-col gap-2">
               <h4 className="text-xl font-black leading-tight">Boost Your Sales</h4>
               <p className="text-sm font-medium opacity-90">Get up to 10x more enquiries by featuring your listings at the top.</p>
             </div>
             <button className="bg-white text-brand-secondary py-3 rounded-2xl font-black text-sm uppercase tracking-tight active:scale-95 transition-all">
               View Packages
             </button>
          </div>
        </aside>

        {/* Main Dashboard Area */}
        <div className="flex-1 flex flex-col gap-10">
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Active Ads', val: '12', icon: ShoppingBag, color: 'text-blue-500' },
              { label: 'Total Views', val: '4.2k', icon: Eye, color: 'text-purple-500' },
              { label: 'WhatsApp clicks', val: '156', icon: MessageCircle, color: 'text-brand-primary' },
              { label: 'Expiring Soon', val: '2', icon: Clock, color: 'text-amber-500' }
            ].map(stat => (
              <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-4">
                <div className={cn("p-2 rounded-xl self-start bg-gray-50", stat.color)}>
                  <stat.icon size={20} />
                </div>
                <div className="flex flex-col">
                   <span className="text-3xl font-black text-gray-900 tracking-tight">{stat.val}</span>
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Listings List */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-6 md:p-10 flex flex-col gap-8">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-black text-gray-900 tracking-tight">Active Listings</h3>
               <Link to="/post-ad" className="text-sm font-bold text-brand-primary hover:underline">Post another listing</Link>
            </div>

            <div className="flex flex-col gap-4">
              {myListings.map(l => (
                <div key={l.id} className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-3xl border border-gray-50 hover:bg-gray-50 transition-all group">
                   <div className="w-full md:w-32 aspect-square rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                      <img src={l.images[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                   </div>
                   <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                        <span className="px-2 py-0.5 bg-green-50 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full">{l.category}</span>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400"><Clock size={12} /> Live for 12 more days</span>
                      </div>
                      <h4 className="text-xl font-extrabold text-gray-900 group-hover:text-brand-primary transition-colors">{l.title}</h4>
                      <span className="text-lg font-black text-brand-primary">USD {l.priceUsd.toLocaleString()}</span>
                   </div>
                   <div className="flex items-center gap-2">
                       <div className="flex flex-col items-center gap-1 px-4 py-2 bg-white rounded-xl border border-gray-100">
                          <span className="text-lg font-black text-gray-900">124</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Views</span>
                       </div>
                       <button className="p-3 bg-white text-gray-400 hover:text-gray-900 hover:border-gray-200 border border-gray-100 rounded-2xl transition-all">
                          <Edit2 size={20} />
                       </button>
                       <button className="p-3 bg-white text-gray-400 hover:text-gray-900 hover:border-gray-200 border border-gray-100 rounded-2xl transition-all">
                          <MoreVertical size={20} />
                       </button>
                   </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 text-gray-400 font-bold text-sm hover:text-gray-900 transition-colors uppercase tracking-widest border-t border-gray-50 pt-8 mt-2">
              View all 12 listings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
