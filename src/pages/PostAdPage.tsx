import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft, 
  Camera, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  ShoppingBag,
  Store,
  Upload,
  X,
  Smartphone
} from 'lucide-react';
import { CATEGORIES, PROVINCES } from '../constants';
import { CategoryType } from '../types';
import { cn } from '../lib/utils';
import * as LucideIcons from 'lucide-react';

type Step = 'tier' | 'category' | 'details' | 'photos' | 'success';

export default function PostAdPage() {
  const [step, setStep] = useState<Step>('tier');
  const [tier, setTier] = useState<'free' | 'featured'>('free');
  const [category, setCategory] = useState<CategoryType | ''>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceUsd: '',
    province: '',
    city: '',
    whatsapp: '',
    condition: 'used'
  });
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 'tier') setStep('category');
    else if (step === 'category') setStep('details');
    else if (step === 'details') setStep('photos');
    else if (step === 'photos') setStep('success');
  };

  const handleBack = () => {
    if (step === 'category') setStep('tier');
    else if (step === 'details') setStep('category');
    else if (step === 'photos') setStep('details');
  };

  const currentCategory = CATEGORIES.find(c => c.id === category);

  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {step !== 'success' && (
          <div className="mb-10 flex flex-col items-center gap-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight">
              {step === 'tier' ? "Choose your Listing Tier" : "Post your FREE Listing"}
            </h1>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-4 w-full max-w-md">
              {(['tier', 'category', 'details', 'photos'] as Step[]).map((s, idx) => (
                <React.Fragment key={s}>
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 transition-all duration-500",
                    step === s ? "bg-brand-primary border-brand-primary scale-125 shadow-lg shadow-green-900/20" : 
                    (['tier', 'category', 'details', 'photos'].indexOf(step) > idx ? "bg-brand-primary border-brand-primary" : "bg-white border-gray-200")
                  )} />
                  {idx < 3 && (
                    <div className={cn(
                      "flex-1 h-0.5 rounded-full",
                      (['tier', 'category', 'details', 'photos'].indexOf(step) > idx ? "bg-brand-primary" : "bg-gray-200")
                    )} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-200/50">
          
          {step === 'tier' && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Free Tier */}
                <button 
                  onClick={() => { setTier('free'); setStep('category'); }}
                  className="group relative flex flex-col gap-6 p-8 rounded-3xl border-2 border-gray-100 hover:border-gray-200 transition-all text-left"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-black text-gray-900">Standard Listing</h3>
                    <p className="text-sm font-medium text-gray-500">Perfect for casual selling</p>
                  </div>
                  <div className="text-4xl font-black text-gray-900">FREE</div>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-center gap-2 text-sm font-bold text-gray-600"><CheckCircle2 className="text-green-500" size={18} /> 3 Photos</li>
                    <li className="flex items-center gap-2 text-sm font-bold text-gray-600"><CheckCircle2 className="text-green-500" size={18} /> 30-day listing</li>
                    <li className="flex items-center gap-2 text-sm font-bold text-gray-600"><CheckCircle2 className="text-green-500" size={18} /> Standard position</li>
                  </ul>
                  <div className="mt-4 py-4 rounded-2xl border-2 border-gray-100 text-center font-bold group-hover:bg-gray-50 transition-colors">Choose Free</div>
                </button>

                {/* Featured Tier */}
                <button 
                  onClick={() => { setTier('featured'); setStep('category'); }}
                  className="group relative flex flex-col gap-6 p-8 rounded-3xl border-2 border-brand-secondary bg-orange-50/30 transition-all text-left overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-brand-secondary text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">Recommended</div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-black text-gray-900">Featured Booster</h3>
                    <p className="text-sm font-medium text-gray-500">Sell 5x faster</p>
                  </div>
                  <div className="text-4xl font-black text-brand-secondary">USD 2.00</div>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-center gap-2 text-sm font-bold text-gray-600"><CheckCircle2 className="text-brand-secondary" size={18} /> 10 Photos</li>
                    <li className="flex items-center gap-2 text-sm font-bold text-gray-600"><CheckCircle2 className="text-brand-secondary" size={18} /> 60-day listing</li>
                    <li className="flex items-center gap-2 text-sm font-bold text-brand-secondary"><Zap className="fill-current" size={18} /> TOP of search results</li>
                    <li className="flex items-center gap-2 text-sm font-bold text-brand-secondary"><Zap className="fill-current" size={18} /> Gold featured badge</li>
                  </ul>
                  <div className="mt-4 py-4 bg-brand-secondary text-white rounded-2xl text-center font-bold shadow-lg shadow-orange-900/20 active:scale-95 transition-all">Go Premium</div>
                </button>
              </div>
            </div>
          )}

          {step === 'category' && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-extrabold text-gray-900">What are you listing?</h2>
                <p className="text-gray-500 font-medium leading-relaxed">Choose the category that best fits your item or service.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id} 
                    onClick={() => { setCategory(cat.id); handleNext(); }}
                    className="flex flex-col items-center gap-3 p-6 rounded-3xl border-2 border-gray-50 hover:border-brand-primary hover:shadow-xl hover:shadow-green-900/5 transition-all"
                  >
                    <div className="p-4 rounded-2xl text-white shadow-lg" style={{ backgroundColor: cat.color }}>
                      <CategoryIcon iconName={cat.icon} />
                    </div>
                    <span className="font-bold text-sm text-gray-900">{cat.name}</span>
                  </button>
                ))}
              </div>
              <button 
                onClick={handleBack}
                className="self-center flex items-center gap-2 text-gray-400 font-bold hover:text-gray-900 transition-colors"
              >
                <ChevronLeft size={20} /> Back to Tiers
              </button>
            </div>
          )}

          {step === 'details' && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-extrabold text-gray-900">Listing Details</h2>
                <p className="text-gray-500 font-medium">Be as descriptive as possible to attract the right buyers.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Listing Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 2024 Toyota Hilux for sale" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary font-bold text-lg"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Description</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe the condition, features, why you're selling..." 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary font-semibold"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-gray-400">$</span>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-10 pr-6 outline-none focus:border-brand-primary font-black text-lg"
                      value={formData.priceUsd}
                      onChange={(e) => setFormData({...formData, priceUsd: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Province</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary font-bold appearance-none cursor-pointer"
                    value={formData.province}
                    onChange={(e) => setFormData({...formData, province: e.target.value})}
                  >
                    <option value="">Select Province</option>
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">City / Town</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Harare, Bulawayo" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-brand-primary font-bold"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">WhatsApp Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="tel" 
                      placeholder="263 770 000 000" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-brand-primary font-bold"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button 
                  onClick={handleBack}
                  className="flex-1 py-5 rounded-3xl font-bold bg-gray-100 text-gray-900 active:scale-95 transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  className="flex-[2] py-5 rounded-3xl font-black bg-brand-primary text-white shadow-xl shadow-green-900/20 active:scale-95 transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 'photos' && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-extrabold text-gray-900">Add Photos</h2>
                <p className="text-gray-500 font-medium">Listings with photos get 5x more enquiries.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-3xl overflow-hidden group border-2 border-brand-primary/20">
                    <img src={img} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {(tier === 'free' ? images.length < 3 : images.length < 10) && (
                  <button 
                    onClick={() => setImages([...images, 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&fit=crop'])}
                    className="aspect-square flex flex-col items-center justify-center gap-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 hover:border-brand-primary hover:text-brand-primary transition-all"
                  >
                    <Upload size={32} />
                    <span className="text-xs font-bold uppercase tracking-widest">Add Photo</span>
                  </button>
                )}
              </div>

              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                  <AlertCircle size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-display font-extrabold text-blue-900">Data Saver Mode</h4>
                  <p className="text-sm text-blue-700 font-medium leading-relaxed opacity-80">
                    Your photos are automatically compressed to ensure fast loading for users with limited data.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button 
                  onClick={handleBack}
                  className="flex-1 py-5 rounded-3xl font-bold bg-gray-100 text-gray-900 active:scale-95 transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  className="flex-[2] py-5 rounded-3xl font-black bg-brand-primary text-white shadow-xl shadow-green-900/20 active:scale-95 transition-all"
                >
                  Publish Listing
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center gap-8 py-10 animate-in zoom-in-95 duration-500 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-brand-primary shadow-2xl shadow-green-900/10">
                <CheckCircle2 size={48} className="animate-bounce" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black text-gray-900">Listing is Live! 🎉</h2>
                <p className="text-lg text-gray-500 font-medium">Your listing has been posted successfully and is now visible across Zimbabwe.</p>
              </div>
              
              <div className="flex flex-col w-full max-w-sm gap-4 mt-4">
                <button 
                  onClick={() => navigate('/')}
                  className="w-full py-5 bg-brand-primary text-white rounded-[2rem] font-black text-xl shadow-xl shadow-green-900/20 active:scale-95 transition-all"
                >
                  View My Listing
                </button>
                <Link to="/" className="text-brand-primary font-bold hover:underline">Return to Home</Link>
              </div>

              <div className="w-full pt-8 border-t border-gray-50 mt-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Share your listing</h4>
                <div className="flex justify-center gap-6">
                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all group-hover:-translate-y-1">
                      <Smartphone size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">WhatsApp</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 bg-[#1877F2] text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all group-hover:-translate-y-1">
                      <LucideIcons.Facebook size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">Facebook</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all group-hover:-translate-y-1">
                      <LucideIcons.Link size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">Copy Link</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryIcon({ iconName }: { iconName: string }) {
  const Icon = (LucideIcons as any)[iconName];
  return Icon ? <Icon size={32} /> : <ShoppingBag size={32} />;
}
