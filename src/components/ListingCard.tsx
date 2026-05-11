import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, Heart, Star, Clock, ShieldCheck } from 'lucide-react';
import { Listing } from '../types';
import { cn } from '../lib/utils';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const isFreshProduce = listing.category === 'produce';
  const isCar = listing.category === 'cars';
  const isService = listing.category === 'services';

  return (
    <div className="group bg-white border border-gray-100 overflow-hidden hover:border-brand-primary transition-all duration-500 flex flex-col relative">
      {listing.isFeatured && (
        <div className="absolute top-0 right-0 z-10 bg-brand-primary text-black text-[8px] font-black tracking-[0.2em] px-3 py-1 uppercase">
          Featured Selection
        </div>
      )}
      
      {/* Image Section */}
      <Link to={`/listing/${listing.id}`} className="block relative aspect-[5/4] overflow-hidden bg-gray-50">
        <img 
          src={listing.images[0] || 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=400&h=300&fit=crop'} 
          alt={listing.title}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-black/60 backdrop-blur-md text-[8px] font-black px-3 py-1 text-white uppercase tracking-[0.2em] border border-white/10">
            {listing.category}
          </span>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex flex-col gap-1">
          <Link to={`/listing/${listing.id}`} className="block">
            <h3 className="font-display font-light text-xl text-gray-900 group-hover:text-brand-primary line-clamp-1 leading-tight transition-colors">
              {listing.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            <MapPin size={10} className="text-brand-primary" />
            <span>{listing.location.city} &bull; {listing.location.province}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex flex-col pt-4 border-t border-gray-100">
          <span className="text-2xl font-light text-brand-primary italic">
            USD {listing.priceUsd.toLocaleString()}
          </span>
          {listing.priceZig && (
            <span className="text-[9px] font-bold text-gray-500 tracking-wider">
              APPROX. ZiG {listing.priceZig.toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-3 mt-auto pt-2">
          <a 
            href={`https://wa.me/${listing.seller.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-black py-2.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all"
          >
            <MessageCircle size={12} />
            Inquire
          </a>
          <button className="p-2.5 border border-gray-100 text-gray-500 hover:text-brand-primary hover:border-brand-primary transition-all">
            <Heart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
