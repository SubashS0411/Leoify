'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Search, SlidersHorizontal, ShieldCheck, Footprints, Plus, Minus, Navigation, MapPin, Bell, X, Compass } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export default function MapPage() {
  const [selectedHaven, setSelectedHaven] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full w-full overflow-hidden relative">
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-200">
        <Image 
           src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
           alt="Map"
           fill
           className="object-cover opacity-80"
        />
        
        {/* SVG Overlay Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
          <path d="M 50 150 Q 200 100 350 200 T 250 400 T 50 350 Z" fill="rgba(239, 68, 68, 0.15)" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="2"></path>
          <path d="M 180 600 Q 220 500 250 450 T 350 350 T 500 200" fill="none" stroke="#3b82f6" strokeDasharray="8 6" strokeLinecap="round" strokeWidth="4"></path>
        </svg>

        {/* Interactive Map Markers */}
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
          {/* User Location */}
          <div className="absolute top-[75%] left-[45%] flex items-center justify-center pointer-events-auto -translate-x-1/2 -translate-y-1/2">
            <div className="absolute w-16 h-16 bg-blue-500/30 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            <div className="w-6 h-6 bg-blue-600 border-2 border-white rounded-full shadow-lg relative z-10"></div>
            <div className="absolute w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[30px] border-b-blue-500/40 -top-6 rotate-[15deg]"></div>
            <div className="absolute -bottom-8 bg-white dark:bg-slate-800 px-2 py-0.5 rounded shadow text-xs font-bold whitespace-nowrap">You</div>
          </div>

          {/* Risk Zone Label */}
          <div className="absolute top-[30%] left-[25%] pointer-events-auto">
            <p className="text-danger font-bold text-xs bg-white/90 dark:bg-black/80 px-2 py-1 rounded shadow-sm border border-danger/30 uppercase tracking-wide">High Risk Area</p>
          </div>

          {/* Safe Haven */}
          <div 
             className="absolute top-[45%] left-[45%] pointer-events-auto cursor-pointer group -translate-x-1/2 -translate-y-full transition-all"
             onClick={() => setSelectedHaven(true)}
          >
            <div className={`w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl border-2 border-white ${!selectedHaven ? 'animate-bounce' : 'scale-110'}`}>
              <ShieldCheck size={24} className="text-background-dark fill-background-dark/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Top UI Layer: Search & Status */}
      <div className="absolute top-0 left-0 w-full z-40 pt-12 px-4 flex flex-col gap-3 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center h-12 overflow-hidden border border-slate-100 dark:border-slate-700">
          <div className="w-12 h-full flex items-center justify-center text-slate-400">
            <Search size={20} />
          </div>
          <input className="flex-1 h-full border-none focus:ring-0 bg-transparent text-slate-800 dark:text-white placeholder-slate-400 text-sm" placeholder="Search destination..." type="text"/>
          <button className="w-12 h-full flex items-center justify-center text-slate-400 border-l border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
            <SlidersHorizontal size={20} />
          </button>
        </div>

        <div className="flex gap-2 pointer-events-auto overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-1.5 bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm cursor-pointer whitespace-nowrap">
            <ShieldCheck size={18} className="text-primary fill-primary/20" />
            <span className="text-slate-800 dark:text-white text-xs font-semibold">Zone: Safe</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-800/90 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm border border-slate-200 dark:border-slate-700 cursor-pointer whitespace-nowrap">
            <Footprints size={18} className="text-blue-500" />
            <span className="text-slate-600 dark:text-slate-300 text-xs font-medium">12 min to hotel</span>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 top-40 flex flex-col gap-2 z-30 pointer-events-auto">
        <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 active:scale-95 transition-transform">
          <Plus size={20} />
        </button>
        <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 active:scale-95 transition-transform">
          <Minus size={20} />
        </button>
        <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center text-blue-500 hover:bg-slate-50 active:scale-95 transition-transform mt-2">
          <Navigation size={20} className="fill-current" />
        </button>
      </div>

      <Link href="/sos" className="absolute bottom-24 right-5 z-40 group flex flex-col items-center">
        <button className="relative flex items-center justify-center w-16 h-16 rounded-full bg-danger shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:scale-105 active:scale-95 transition-all duration-200">
          <span className="absolute inset-0 rounded-full animate-ping bg-danger opacity-20 group-hover:opacity-40"></span>
          <div className="flex flex-col items-center leading-none">
            <span className="text-white text-[24px] font-bold tracking-widest mt-1">SOS</span>
            <span className="text-[9px] font-bold text-white uppercase tracking-wider mt-0.5">Help</span>
          </div>
        </button>
      </Link>

      <div className="absolute bottom-[72px] w-full h-16 bg-gradient-to-t from-background-light/90 dark:from-background-dark/90 to-transparent pointer-events-none z-30"></div>
      
      <AnimatePresence>
        {selectedHaven && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="absolute bottom-24 left-4 right-4 z-50 pointer-events-auto bg-white dark:bg-slate-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 dark:border-slate-700 overflow-hidden"
          >
            <div className="relative h-32 w-full">
              <Image 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"
                alt="Hospital"
                fill
                className="object-cover"
              />
              <button 
                onClick={() => setSelectedHaven(false)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-black/60 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div className="absolute top-3 left-3 bg-primary text-black px-2 py-1 rounded shadow text-xs font-bold flex items-center gap-1">
                <ShieldCheck size={14} /> Safe Haven
              </div>
            </div>
            
            <div className="p-4 flex flex-col gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">City General Hospital</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin size={14} /> 123 Health Ave, Medical District
                </p>
              </div>
              
              <div className="flex gap-4 mb-1">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Hours</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Open 24/7</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Phone</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">911 / (555) 123-4567</span>
                </div>
              </div>
              
              <div className="flex gap-3 mt-1">
                <button className="flex-1 bg-primary hover:bg-[#0fa64d] text-black font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <Compass size={18} />
                  Navigate
                </button>
                <button className="w-[48px] h-auto flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95 transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
